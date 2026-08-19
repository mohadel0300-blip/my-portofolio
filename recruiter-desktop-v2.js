(() => {
  const isDesktop=()=>window.matchMedia('(min-width:981px)').matches;
  const archiveIds=new Set(['social','campaignbanners','brandapps','covers']);
  const promotedIds=new Set(['healthcare','alluriv','communitycampaign']);
  const selectedOrder=['briefagency','sociallab','editorial','briefstudio','realestate','healthcare','alluriv','communitycampaign','orient'];
  let buildToken=0;

  const ensureCuration=()=>{
    const healthcare=projects.find(p=>p.id==='healthcare');
    const social=projects.find(p=>p.id==='social');
    if(healthcare&&!healthcare.files.includes('s2.png')) healthcare.files.push('s2.png');
    if(social) social.files=social.files.filter(f=>f!=='s2.png');
  };

  const directSrc=file=>/\.(svg|webp)$/i.test(file)?file:fullSrc(file);
  const makeImpactCard=(p,index)=>{
    const article=document.createElement('article');
    article.className='impact-project';article.dataset.id=p.id;
    const title=pText(p,'title'),type=pText(p,'eyebrow'),cover=p.cover||p.files[0],view=lang==='ar'?'عرض المشروع ↗':'View project ↗';
    article.innerHTML=`<div class="impact-visual" role="button" tabindex="0" aria-label="${view.replace(' ↗','')}: ${title}"><img src="${directSrc(cover)}" data-original="${cover}" alt="${title} — cover" loading="lazy" decoding="async"></div><div class="impact-info"><span class="impact-no">${String(index+1).padStart(2,'0')}</span><div><h3>${title}</h3><p class="impact-type">${type}</p></div><span class="impact-count">${countLabel(p.files.length)}</span><button class="impact-open" type="button">${view}</button></div>`;
    addFallbacks(article);
    const open=()=>openProject(p),visual=article.querySelector('.impact-visual'),button=article.querySelector('.impact-open');
    visual.addEventListener('click',open);
    visual.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    button.addEventListener('click',open);
    return article;
  };

  const syncPromotedProjects=()=>{
    const root=document.querySelector('.recruiter-featured');
    if(!root)return;
    const cards=new Map([...root.querySelectorAll(':scope > .impact-project')].map(card=>[card.dataset.id,card]));
    promotedIds.forEach(id=>{
      if(cards.has(id))return;
      const p=projects.find(project=>project.id===id);
      if(!p||!p.files?.length)return;
      const card=makeImpactCard(p,cards.size);cards.set(id,card);
    });
    selectedOrder.forEach(id=>{const card=cards.get(id);if(card)root.appendChild(card)});
    [...cards.entries()].filter(([id])=>!selectedOrder.includes(id)).forEach(([,card])=>root.appendChild(card));
    [...root.querySelectorAll(':scope > .impact-project')].forEach((card,i)=>{
      const no=card.querySelector('.impact-no');if(no)no.textContent=String(i+1).padStart(2,'0');
    });

    document.querySelectorAll('.work-category').forEach(section=>{
      const grid=section.querySelector(':scope > .work-category-grid');if(!grid)return;
      promotedIds.forEach(id=>grid.querySelector(`:scope > .category-project[data-id="${CSS.escape(id)}"]`)?.remove());
      const count=grid.querySelectorAll(':scope > .category-project').length;
      const counter=section.querySelector('.work-category-head>span');
      if(counter)counter.textContent=`${count} ${lang==='ar'?'مشاريع':'projects'}`;
      section.style.display=count?'':'none';
    });
  };

  const ensureArchiveAssets=()=>{
    if(!document.querySelector('link[data-archive-accordion]')){
      const link=document.createElement('link');link.rel='stylesheet';link.href='recruiter-archive-accordion.css?v=20260819-0532';link.dataset.archiveAccordion='true';document.head.appendChild(link);
    }
    if(!document.querySelector('script[data-archive-accordion]')){
      const script=document.createElement('script');script.src='recruiter-archive-accordion.js?v=20260819-0532';script.defer=true;script.dataset.archiveAccordion='true';document.body.appendChild(script);
    }
  };

  const imageRatio=img=>new Promise(resolve=>{
    if(!img){resolve(1);return;}
    const finish=el=>resolve((el.naturalWidth&&el.naturalHeight)?el.naturalWidth/el.naturalHeight:1);
    if(img.complete&&img.naturalWidth){finish(img);return;}
    const probe=new Image();probe.onload=()=>finish(probe);probe.onerror=()=>resolve(1);probe.src=img.currentSrc||img.src;
  });

  const shapeFor=ratio=>ratio<.7?'tall':ratio<.9?'portrait':ratio<=1.12?'square':'landscape';

  const originalFor=card=>{
    const id=card.dataset.id;if(!id)return null;
    if(card.classList.contains('impact-project'))return document.querySelector(`.recruiter-featured > .impact-project[data-id="${CSS.escape(id)}"]`);
    const section=card.closest('.work-category');
    return section?.querySelector(`:scope > .work-category-grid > .category-project[data-id="${CSS.escape(id)}"]`)||null;
  };

  const bindClone=card=>{
    const open=()=>{const original=originalFor(card),target=original?.querySelector('[role="button"]')||original?.querySelector('button');target?.click();};
    const visual=card.querySelector('[role="button"]'),button=card.querySelector('button');
    visual?.addEventListener('click',open);visual?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});button?.addEventListener('click',open);
  };

  const makeNav=(rail,wrap)=>{
    const nav=document.createElement('div');nav.className='shape-nav';nav.innerHTML='<button class="shape-prev" type="button" aria-label="Previous projects">‹</button><button class="shape-next" type="button" aria-label="Next projects">›</button>';
    const head=document.createElement('div');head.className='shape-rail-head';head.appendChild(nav);wrap.prepend(head);
    const prev=nav.querySelector('.shape-prev'),next=nav.querySelector('.shape-next');
    const step=()=>{const card=rail.firstElementChild;if(!card)return rail.clientWidth*.82;const gap=parseFloat(getComputedStyle(rail).gap)||0;return card.getBoundingClientRect().width+gap;};
    const update=()=>{const max=Math.max(0,rail.scrollWidth-rail.clientWidth-2),pos=Math.abs(rail.scrollLeft);prev.disabled=pos<=2;next.disabled=pos>=max;nav.hidden=max<=4;};
    const move=dir=>{const rtl=document.documentElement.dir==='rtl';rail.scrollBy({left:dir*step()*(rtl?-1:1),behavior:'smooth'});window.setTimeout(update,360);};
    prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));rail.addEventListener('scroll',update,{passive:true});requestAnimationFrame(update);
  };

  const groupCards=async cards=>{
    const groups=new Map(),order=[];
    for(const card of cards){const ratio=await imageRatio(card.querySelector('img')),shape=shapeFor(ratio);if(!groups.has(shape)){groups.set(shape,[]);order.push(shape);}groups.get(shape).push(card);}
    return {groups,order};
  };

  const buildSelected=async token=>{
    const root=document.querySelector('.recruiter-featured');if(!root||!isDesktop())return;
    root.querySelectorAll(':scope > .selected-shape-groups').forEach(el=>el.remove());
    const originals=[...root.querySelectorAll(':scope > .impact-project')];if(!originals.length)return;
    const {groups,order}=await groupCards(originals);if(token!==buildToken||!isDesktop())return;
    const host=document.createElement('div');host.className='selected-shape-groups';
    order.forEach(shape=>{const wrap=document.createElement('section');wrap.className='shape-rail-wrap';const rail=document.createElement('div');rail.className='shape-rail selected-shape-rail';rail.dataset.shape=shape;groups.get(shape).forEach(card=>{const clone=card.cloneNode(true);bindClone(clone);rail.appendChild(clone);});wrap.appendChild(rail);makeNav(rail,wrap);host.appendChild(wrap);});
    root.appendChild(host);
  };

  const buildCategory=async(section,token)=>{
    if(!section||!isDesktop()||section.style.display==='none')return;
    section.querySelector(':scope > .category-shape-groups')?.remove();
    const source=section.querySelector(':scope > .work-category-grid');if(!source)return;
    const originals=[...source.querySelectorAll(':scope > .category-project')].filter(card=>!archiveIds.has(card.dataset.id)&&!promotedIds.has(card.dataset.id));
    if(!originals.length){section.classList.add('archive-emptied');return;}section.classList.remove('archive-emptied');
    const {groups,order}=await groupCards(originals);if(token!==buildToken||!isDesktop())return;
    const host=document.createElement('div');host.className='category-shape-groups';
    order.forEach(shape=>{const wrap=document.createElement('section');wrap.className='shape-rail-wrap';const rail=document.createElement('div');rail.className='shape-rail category-shape-rail';rail.dataset.shape=shape;groups.get(shape).forEach(card=>{const clone=card.cloneNode(true);bindClone(clone);rail.appendChild(clone);});wrap.appendChild(rail);makeNav(rail,wrap);host.appendChild(wrap);});
    section.appendChild(host);
  };

  const build=async()=>{
    if(!isDesktop())return;ensureArchiveAssets();const token=++buildToken;await buildSelected(token);if(token!==buildToken)return;
    for(const section of document.querySelectorAll('.work-category')){await buildCategory(section,token);if(token!==buildToken)return;}
  };

  let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(build,40);};

  if(typeof window.renderProjects==='function'){
    const originalRender=window.renderProjects;
    window.renderProjects=function(){ensureCuration();const result=originalRender.apply(this,arguments);syncPromotedProjects();schedule();return result;};
    ensureCuration();window.renderProjects();
  }

  window.addEventListener('resize',schedule,{passive:true});window.addEventListener('load',schedule,{once:true});ensureArchiveAssets();schedule();
})();
