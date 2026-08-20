(() => {
  const motionSheet=[...document.querySelectorAll('link[rel="stylesheet"]')].find(link=>link.href.includes('portfolio-motion-v1.css'));
  if(motionSheet)document.head.appendChild(motionSheet);

  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const root=document.documentElement;
  if(reduceMotion.matches){
    root.classList.add('motion-reduced');
    return;
  }

  root.classList.add('motion-ready');

  const selector=[
    '.hero .eyebrow',
    '.hero h1 > span',
    '.hero-lead',
    '.hero-message > div:last-child',
    '.hero-photo',
    '.section-head > *',
    '.impact-project',
    '.work-category-head',
    '.category-project',
    '.archive-accordion-head',
    '.archive-accordion-item',
    '.compact-head > *',
    '.career-row',
    '.skill-label',
    '.skill-row',
    '.tools',
    '.about-grid > *',
    '.contact-grid > *',
    '.footer > *',
    '.project-view-head > *',
    '.project-view-figure'
  ].join(',');

  const prepared=new WeakSet();
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -7% 0px'}):null;

  const prepare=scope=>{
    const nodes=[];
    if(scope instanceof Element&&scope.matches(selector))nodes.push(scope);
    if(scope.querySelectorAll)nodes.push(...scope.querySelectorAll(selector));
    const orderByParent=new Map();

    nodes.forEach(node=>{
      if(prepared.has(node))return;
      prepared.add(node);
      const parent=node.parentElement;
      const order=orderByParent.get(parent)||0;
      orderByParent.set(parent,order+1);
      node.style.setProperty('--motion-order',String(Math.min(order,6)));
      node.classList.add('motion-reveal');
      if(node.matches('.hero-photo,.impact-project,.category-project,.project-view-figure'))node.classList.add('motion-soft');
      if(observer)observer.observe(node);
      else node.classList.add('is-visible');
    });
  };

  prepare(document);

  const mutations=new MutationObserver(records=>{
    records.forEach(record=>record.addedNodes.forEach(node=>{
      if(node.nodeType===Node.ELEMENT_NODE)prepare(node);
    }));
  });
  mutations.observe(document.body,{childList:true,subtree:true});

  window.addEventListener('pageshow',()=>prepare(document),{once:true});
})();
