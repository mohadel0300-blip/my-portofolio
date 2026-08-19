(() => {
  const isDesktop=()=>window.matchMedia('(min-width:981px)').matches;
  let buildToken=0;

  const imageRatio=img=>new Promise(resolve=>{
    if(!img){resolve(1);return;}
    const finish=el=>resolve((el.naturalWidth&&el.naturalHeight)?el.naturalWidth/el.naturalHeight:1);
    if(img.complete&&img.naturalWidth){finish(img);return;}
    const probe=new Image();
    probe.onload=()=>finish(probe);
    probe.onerror=()=>resolve(1);
    probe.src=img.currentSrc||img.src;
  });

  const shapeFor=ratio=>{
    if(ratio<.7)return 'tall';
    if(ratio<.9)return 'portrait';
    if(ratio<=1.12)return 'square';
    return 'landscape';
  };

  const originalFor=card=>{
    const id=card.dataset.id;
    if(!id)return null;
    if(card.classList.contains('impact-project'))return document.querySelector(`.recruiter-featured > .impact-project[data-id="${CSS.escape(id)}"]`);
    const section=card.closest('.work-category');
    return section?.querySelector(`:scope > .work-category-grid > .category-project[data-id="${CSS.escape(id)}"]`)||null;
  };

  const bindClone=card=>{
    const open=()=>{
      const original=originalFor(card);
      const target=original?.querySelector('[role="button"]')||original?.querySelector('button');
      target?.click();
    };
    const visual=card.querySelector('[role="button"]');
    const button=card.querySelector('button');
    visual?.addEventListener('click',open);
    visual?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    button?.addEventListener('click',open);
  };

  const makeNav=(rail,wrap)=>{
    const nav=document.createElement('div');
    nav.className='shape-nav';
    nav.innerHTML='<button class="shape-prev" type="button" aria-label="Previous projects">‹</button><button class="shape-next" type="button" aria-label="Next projects">›</button>';
    const head=document.createElement('div');
    head.className='shape-rail-head';
    head.appendChild(nav);
    wrap.prepend(head);
    const prev=nav.querySelector('.shape-prev'),next=nav.querySelector('.shape-next');
    const step=()=>{
      const card=rail.firstElementChild;
      if(!card)return rail.clientWidth*.82;
      const gap=parseFloat(getComputedStyle(rail).gap)||0;
      return card.getBoundingClientRect().width+gap;
    };
    const logicalPos=()=>Math.abs(rail.scrollLeft);
    const update=()=>{
      const max=Math.max(0,rail.scrollWidth-rail.clientWidth-2),pos=logicalPos();
      prev.disabled=pos<=2;next.disabled=pos>=max;nav.hidden=max<=4;
    };
    const move=dir=>{
      const rtl=document.documentElement.dir==='rtl';
      rail.scrollBy({left:dir*step()*(rtl?-1:1),behavior:'smooth'});
      window.setTimeout(update,360);
    };
    prev.addEventListener('click',()=>move(-1));
    next.addEventListener('click',()=>move(1));
    rail.addEventListener('scroll',update,{passive:true});
    requestAnimationFrame(update);
  };

  const groupCards=async cards=>{
    const groups=new Map(),order=[];
    for(const card of cards){
      const ratio=await imageRatio(card.querySelector('img'));
      const shape=shapeFor(ratio);
      if(!groups.has(shape)){groups.set(shape,[]);order.push(shape);}
      groups.get(shape).push(card);
    }
    return {groups,order};
  };

  const buildSelected=async token=>{
    const root=document.querySelector('.recruiter-featured');
    if(!root||!isDesktop())return;
    root.querySelectorAll(':scope > .selected-shape-groups').forEach(el=>el.remove());
    const originals=[...root.querySelectorAll(':scope > .impact-project')];
    if(!originals.length)return;
    const {groups,order}=await groupCards(originals);
    if(token!==buildToken||!isDesktop())return;
    const host=document.createElement('div');host.className='selected-shape-groups';
    order.forEach(shape=>{
      const wrap=document.createElement('section');wrap.className='shape-rail-wrap';
      const rail=document.createElement('div');rail.className='shape-rail selected-shape-rail';rail.dataset.shape=shape;
      groups.get(shape).forEach(card=>{const clone=card.cloneNode(true);bindClone(clone);rail.appendChild(clone);});
      wrap.appendChild(rail);makeNav(rail,wrap);host.appendChild(wrap);
    });
    root.appendChild(host);
  };

  const buildCategory=async(section,token)=>{
    if(!section||!isDesktop())return;
    section.querySelector(':scope > .category-shape-groups')?.remove();
    const source=section.querySelector(':scope > .work-category-grid');
    if(!source)return;
    const originals=[...source.querySelectorAll(':scope > .category-project')];
    if(!originals.length)return;
    const {groups,order}=await groupCards(originals);
    if(token!==buildToken||!isDesktop())return;
    const host=document.createElement('div');host.className='category-shape-groups';
    order.forEach(shape=>{
      const wrap=document.createElement('section');wrap.className='shape-rail-wrap';
      const rail=document.createElement('div');rail.className='shape-rail category-shape-rail';rail.dataset.shape=shape;
      groups.get(shape).forEach(card=>{const clone=card.cloneNode(true);bindClone(clone);rail.appendChild(clone);});
      wrap.appendChild(rail);makeNav(rail,wrap);host.appendChild(wrap);
    });
    section.appendChild(host);
  };

  const build=async()=>{
    if(!isDesktop())return;
    const token=++buildToken;
    await buildSelected(token);
    if(token!==buildToken)return;
    for(const section of document.querySelectorAll('.work-category')){
      await buildCategory(section,token);
      if(token!==buildToken)return;
    }
  };

  let timer;
  const schedule=()=>{clearTimeout(timer);timer=setTimeout(build,40);};

  if(typeof window.renderProjects==='function'){
    const originalRender=window.renderProjects;
    window.renderProjects=function(){
      const result=originalRender.apply(this,arguments);
      schedule();
      return result;
    };
  }

  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('load',schedule,{once:true});
  schedule();
})();
