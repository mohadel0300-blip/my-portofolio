(() => {
  const isDesktop=()=>window.matchMedia('(min-width: 981px)').matches;
  const enhanceCategory=section=>{
    if(!section)return;
    const head=section.querySelector('.work-category-head');
    const rail=section.querySelector('.work-category-grid');
    if(!head||!rail)return;

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
      window.setTimeout(update,280);
    };

    if(!nav.dataset.bound){
      prev.addEventListener('click',()=>move(-1));
      next.addEventListener('click',()=>move(1));
      rail.addEventListener('scroll',update,{passive:true});
      nav.dataset.bound='true';
    }
    window.requestAnimationFrame(update);
  };

  const enhanceAll=()=>document.querySelectorAll('.work-category').forEach(enhanceCategory);
  const more=document.querySelector('.more-work');
  if(more){
    const observer=new MutationObserver(()=>enhanceAll());
    observer.observe(more,{childList:true,subtree:true});
  }
  window.addEventListener('resize',enhanceAll,{passive:true});
  window.addEventListener('load',enhanceAll,{once:true});
  enhanceAll();
})();
