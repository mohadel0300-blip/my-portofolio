(() => {
  const isDesktop=()=>window.matchMedia('(min-width:981px)').matches;
  const byId=id=>projects.find(p=>p.id===id);
  const t=(p,key)=>pText(p,key);
  const strings=()=>lang==='ar'?{
    title:'المزيد من الأرشيف',
    intro:'باقي الأعمال في مساحة واحدة مضغوطة. افتح المشروع الذي تريد رؤيته بدون تمرير طويل.',
    open:'عرض المشروع ↗'
  }:{
    title:'More from the archive',
    intro:'The rest of the work lives in one compact space. Open only the project you want to inspect.',
    open:'View project ↗'
  };
  const previewSrc=file=>/\.(svg|webp)$/i.test(file)?file:`web/full/${file}.webp`;

  const selectedIds=()=>new Set(
    [...document.querySelectorAll('.recruiter-featured > .impact-project')]
      .map(card=>card.dataset.id)
      .filter(Boolean)
  );

  const archiveProjects=()=>{
    const selected=selectedIds();
    const seen=new Set();
    return projects.filter(p=>{
      if(!p?.id||!p.files?.length||selected.has(p.id)||seen.has(p.id))return false;
      seen.add(p.id);
      return true;
    });
  };

  const hideFieldBrowse=()=>{
    const more=document.querySelector('.more-work');
    if(!more)return;
    const fields=more.querySelector('.browse-fields');
    if(fields)fields.classList.add('archive-replaced-fields');
    more.querySelectorAll('.work-category').forEach(section=>section.classList.add('archive-emptied'));
  };

  const restoreFieldBrowse=()=>{
    const more=document.querySelector('.more-work');
    if(!more)return;
    more.querySelector('.browse-fields')?.classList.remove('archive-replaced-fields');
    more.querySelectorAll('.work-category.archive-emptied').forEach(section=>section.classList.remove('archive-emptied'));
  };

  const renderPreview=(root,p)=>{
    if(!p||!p.files?.length)return;
    const file=p.cover||p.files[0],title=t(p,'title'),meta=t(p,'eyebrow');
    const stage=root.querySelector('.archive-preview-stage');
    const img=root.querySelector('.archive-preview-stage img');
    stage.style.setProperty('--archive-preview-bg',`url(${JSON.stringify(previewSrc(file))})`);
    img.onerror=()=>{img.onerror=null;img.src=file;stage.style.setProperty('--archive-preview-bg',`url(${JSON.stringify(file)})`)};
    img.src=previewSrc(file);img.alt=`${title} — preview`;
    root.querySelector('.archive-preview-meta h4').textContent=title;
    root.querySelector('.archive-preview-meta p').textContent=`${meta} · ${countLabel(p.files.length)}`;
    const open=()=>openProject(p);
    stage.onclick=open;
    stage.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}};
    stage.tabIndex=0;stage.setAttribute('role','button');stage.setAttribute('aria-label',`${strings().open.replace(' ↗','')}: ${title}`);
    const btn=root.querySelector('.archive-preview-open');
    btn.textContent=strings().open;btn.onclick=open;
  };

  const build=()=>{
    const more=document.querySelector('.more-work');
    if(!more)return;
    if(!isDesktop()){
      more.querySelector('.archive-accordion')?.remove();
      restoreFieldBrowse();
      return;
    }

    hideFieldBrowse();
    more.querySelector('.archive-accordion')?.remove();

    const list=archiveProjects();
    if(!list.length)return;
    const s=strings();
    const section=document.createElement('section');
    section.className='archive-accordion';
    section.innerHTML=`
      <header class="archive-accordion-head"><h3>${s.title}</h3><p>${s.intro}</p></header>
      <div class="archive-accordion-shell">
        <div class="archive-accordion-list">${list.map((p,i)=>`
          <div class="archive-accordion-item${i===0?' is-active':''}" data-id="${p.id}">
            <button class="archive-accordion-trigger" type="button" aria-expanded="${i===0?'true':'false'}">
              <strong>${t(p,'title')}</strong><span class="archive-accordion-count">${countLabel(p.files.length)}</span><span class="archive-accordion-icon">+</span>
            </button>
            <div class="archive-accordion-detail"><div class="archive-accordion-detail-inner"><p>${t(p,'story')||''}</p></div></div>
          </div>`).join('')}</div>
        <div class="archive-accordion-preview">
          <div class="archive-preview-stage"><img alt="" decoding="async" loading="lazy"></div>
          <div class="archive-preview-meta"><div><h4></h4><p></p></div><button class="archive-preview-open" type="button"></button></div>
        </div>
      </div>`;
    more.appendChild(section);

    const activate=p=>{
      section.querySelectorAll('.archive-accordion-item').forEach(item=>{
        const active=item.dataset.id===p.id;
        item.classList.toggle('is-active',active);
        item.querySelector('.archive-accordion-trigger').setAttribute('aria-expanded',String(active));
      });
      renderPreview(section,p);
    };
    section.querySelectorAll('.archive-accordion-item').forEach(item=>
      item.querySelector('.archive-accordion-trigger').addEventListener('click',()=>activate(byId(item.dataset.id)))
    );
    activate(list[0]);
  };

  const projectsRoot=document.querySelector('#projects');
  if(projectsRoot){
    let queued=false;
    const observer=new MutationObserver(()=>{
      if(queued)return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;build();});
    });
    observer.observe(projectsRoot,{childList:true,subtree:true});
  }
  window.addEventListener('resize',build,{passive:true});
  window.addEventListener('load',build,{once:true});
  build();
})();
