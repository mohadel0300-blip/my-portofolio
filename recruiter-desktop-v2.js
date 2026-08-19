(() => {
  const isDesktop=()=>window.matchMedia('(min-width:981px)').matches;

  const setStageImage=visual=>{
    if(!visual)return;
    const img=visual.querySelector('img');
    if(!img)return;
    const apply=()=>{
      const src=img.currentSrc||img.src;
      if(src)visual.style.setProperty('--cover-image',`url(${JSON.stringify(src)})`);
    };
    if(img.complete)apply();
    else img.addEventListener('load',apply,{once:true});
  };

  const enhanceCategory=section=>{
    if(!section)return;
    const head=section.querySelector('.work-category-head');
    const rail=section.querySelector('.work-category-grid');
    if(!head||!rail)return;

    section.querySelectorAll('.category-project-visual').forEach(setStageImage);
    const cards=rail.querySelectorAll('.category-project');
    section.classList.toggle('is-single',cards.length===1);

    let nav=head.querySelector('.category-nav');
    if(!nav){
      nav=document.createElement('div');
      nav.className='category-nav';
      nav.innerHTML='<button class="category-prev" type="button" aria-label="Previous projects">‹</button><button class="category-next" type="button" aria-label="Next projects">›</button>';
      head.appendChild(nav);
    }

    const prev=nav.querySelector('.category-prev');
    const next=nav.querySelector('.category-next');
    const step=()=>{
      const card=rail.querySelector('.category-project');
      if(!card)return rail.clientWidth*.82;
      const gap=parseFloat(getComputedStyle(rail).gap)||0;
      return card.getBoundingClientRect().width+gap;
    };
    const update=()=>{
      if(!isDesktop())return;
      const max=Math.max(0,rail.scrollWidth-rail.clientWidth-2);
      const pos=Math.abs(rail.scrollLeft);
      prev.disabled=pos<=2;
      next.disabled=pos>=max;
      nav.hidden=max<=4;
    };
    const move=dir=>{
      const rtl=document.documentElement.dir==='rtl';
      const sign=rtl?-1:1;
      rail.scrollBy({left:dir*step()*sign,behavior:'smooth'});
      window.setTimeout(update,320);
    };

    if(!nav.dataset.bound){
      prev.addEventListener('click',()=>move(-1));
      next.addEventListener('click',()=>move(1));
      rail.addEventListener('scroll',update,{passive:true});
      nav.dataset.bound='true';
    }

    if(isDesktop()&&!rail.dataset.desktopStart){
      rail.scrollLeft=0;
      rail.dataset.desktopStart='true';
    }
    window.requestAnimationFrame(update);
  };

  const enhanceSelected=()=>{
    document.querySelectorAll('.impact-visual').forEach(setStageImage);
  };
  const enhanceAll=()=>{
    enhanceSelected();
    document.querySelectorAll('.work-category').forEach(enhanceCategory);
  };

  const projects=document.querySelector('#projects');
  if(projects){
    const observer=new MutationObserver(()=>enhanceAll());
    observer.observe(projects,{childList:true,subtree:true});
  }
  window.addEventListener('resize',enhanceAll,{passive:true});
  window.addEventListener('load',enhanceAll,{once:true});
  enhanceAll();
})();
