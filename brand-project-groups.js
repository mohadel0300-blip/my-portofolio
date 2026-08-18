// Recruiter-first project curation. The personal hero remains untouched.
(() => {
  const byId = id => projects.find(p => p.id === id);
  const socialLab = byId('sociallab');
  const briefStudio = byId('briefstudio');
  const socialArchive = byId('social');
  const bannerArchive = byId('campaignbanners');

  // Correct the project ownership before rendering.
  const socialLabFiles = ['s16.png','s20.png','s21.png','s3.png','s4.png','s5.png'];
  const briefStudioFiles = ['s6.png','s8.png','b3.png','b4.png'];

  if (socialLab) {
    socialLab.files = socialLabFiles;
    socialLab.eyebrow = 'Campaign / Social / Product';
    socialLab.eyebrowAr = 'حملة / سوشيال / منتج';
    socialLab.story = 'A connected visual series for Social Lab, built around a recognisable green system while each piece explains a different part of the product story.';
    socialLab.storyAr = 'سلسلة بصرية مترابطة لسوشيال لاب، مبنية على نظام أخضر واضح، مع اختلاف الفكرة والرسالة من تصميم لآخر حسب جزء المنتج الذي يتم شرحه.';
    socialLab.scope = 'Campaign art direction · Social design · Product communication · 3D-led visuals';
    socialLab.scopeAr = 'إخراج الحملة · تصميم سوشيال · تواصل بصري للمنتج · صور ثلاثية الأبعاد';
  }

  if (briefStudio) {
    briefStudio.files = briefStudioFiles;
    briefStudio.eyebrow = 'Campaign / Social';
    briefStudio.eyebrowAr = 'حملات / سوشيال';
    briefStudio.story = 'A set of Brief Studio pieces held together by a restrained red-and-black visual language across different formats.';
    briefStudio.storyAr = 'مجموعة تصميمات لبريف ستوديو تجمعها لغة بصرية حمراء وسوداء واضحة، مع تطبيقها على أكثر من مقاس ونوع محتوى.';
    briefStudio.scope = 'Visual direction · Campaign design · Social content · Adaptations';
    briefStudio.scopeAr = 'اتجاه بصري · تصميم حملات · محتوى سوشيال · تطبيقات متعددة';
  }

  const assigned = new Set([...socialLabFiles, ...briefStudioFiles]);
  if (socialArchive) socialArchive.files = socialArchive.files.filter(f => !assigned.has(f));
  if (bannerArchive) bannerArchive.files = bannerArchive.files.filter(f => !assigned.has(f));

  // Load the recruiter-first visual layer after the existing design system.
  if (!document.querySelector('link[data-recruiter-projects-v3]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'recruiter-projects-v3.css';
    link.dataset.recruiterProjectsV3 = 'true';
    document.head.appendChild(link);
  }

  const topIds = ['sociallab','briefstudio','realestate','orient'];
  const topProjects = topIds.map(byId).filter(Boolean);
  const moreSelected = selected.filter(p => !topIds.includes(p.id));
  const archiveProjects = additional;

  const copy = () => lang === 'ar' ? {
    moreTitle:'أعمال مختارة أخرى', moreText:'مشاريع إضافية توضح تنوع الشغل بدون إبطاء التصفح.',
    archiveTitle:'أرشيف الأعمال', archiveText:'باقي الأعمال المرفوعة لمن يريد التعمق أكثر.',
    view:'عرض المشروع ↗', note:'عن المشروع'
  } : {
    moreTitle:'More selected work', moreText:'Additional projects that show range without slowing down the first scan.',
    archiveTitle:'Work archive', archiveText:'The rest of the uploaded work for anyone who wants to look deeper.',
    view:'View project ↗', note:'Project note'
  };

  const thumbSrc = f => f.endsWith('.svg') ? f : `web/thumb/${f}.webp`;
  const previewImage = (file, alt, hero=false) => {
    const src = hero ? fullSrc(file) : thumbSrc(file);
    return `<img src="${src}" data-original="${file}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
  };

  const impactMarkup = (p,i) => {
    const title = pText(p,'title');
    const type = pText(p,'eyebrow');
    const file = p.files[0];
    return `<article class="impact-project" data-id="${p.id}">
      <div class="impact-visual" role="button" tabindex="0" aria-label="${copy().view.replace(' ↗','')}: ${title}">${previewImage(file,`${title} — 01`,i===0)}</div>
      <div class="impact-info">
        <span class="impact-no">${String(i+1).padStart(2,'0')}</span>
        <div><h3>${title}</h3><p class="impact-type">${type}</p></div>
        <span class="impact-count">${countLabel(p.files.length)}</span>
        <button class="impact-open" type="button">${copy().view}</button>
      </div>
    </article>`;
  };

  const moreMarkup = p => {
    const title = pText(p,'title');
    return `<article class="more-project" data-id="${p.id}">
      <div class="more-project-visual" role="button" tabindex="0" aria-label="${copy().view.replace(' ↗','')}: ${title}">${previewImage(p.files[0],`${title} — 01`)}</div>
      <div class="more-project-info"><div><h4>${title}</h4><p>${pText(p,'eyebrow')} · ${countLabel(p.files.length)}</p></div><button type="button">${copy().view}</button></div>
    </article>`;
  };

  const archiveMarkupV3 = (p,i) => {
    const title = pText(p,'title');
    return `<article class="recruiter-archive-row" data-id="${p.id}"><button type="button" aria-label="${copy().view.replace(' ↗','')}: ${title}"><span class="recruiter-archive-no">${String(i+1).padStart(2,'0')}</span><span class="recruiter-archive-title">${title}</span><span class="recruiter-archive-meta">${pText(p,'eyebrow')}<br>${countLabel(p.files.length)}</span><span class="recruiter-archive-arrow">↗</span></button></article>`;
  };

  const bindOpen = (scope, selector, buttonSelector) => {
    scope.querySelectorAll(selector).forEach(card => {
      const p = byId(card.dataset.id);
      const open = () => p && openProject(p);
      const visual = card.querySelector('[role="button"]');
      if (visual) {
        visual.addEventListener('click',open);
        visual.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
      }
      const btn = card.querySelector(buttonSelector);
      if (btn) btn.addEventListener('click',open);
    });
  };

  // Replace the horizontal deck with a natural vertical recruiter scan.
  renderProjects = function(){
    const selectedRoot = $('#selectedProjects');
    const moreRoot = document.querySelector('.more-work');
    selectedRoot.innerHTML = `<div class="recruiter-featured">${topProjects.map(impactMarkup).join('')}</div>`;
    moreRoot.innerHTML = `<div class="recruiter-more">
      <div class="recruiter-more-head"><h3>${copy().moreTitle}</h3><p>${copy().moreText}</p></div>
      <div class="more-selected-grid">${moreSelected.map(moreMarkup).join('')}</div>
    </div>
    <div class="recruiter-archive">
      <div class="recruiter-archive-head"><h3>${copy().archiveTitle}</h3><p>${copy().archiveText}</p></div>
      <div class="recruiter-archive-list">${archiveProjects.map(archiveMarkupV3).join('')}</div>
    </div>`;

    addFallbacks(selectedRoot); addFallbacks(moreRoot);
    bindOpen(selectedRoot,'.impact-project','.impact-open');
    bindOpen(moreRoot,'.more-project','.more-project-info button');
    moreRoot.querySelectorAll('.recruiter-archive-row button').forEach(btn=>btn.addEventListener('click',()=>openProject(byId(btn.closest('.recruiter-archive-row').dataset.id))));
  };

  // Inside a project, show the work first. The explanatory note is deliberately last.
  fillProjectView = function(p){
    ensureProjectView();
    const title = pText(p,'title');
    $('#projectViewClose').setAttribute('aria-label',U().close);
    $('#projectViewBarTitle').textContent = title;
    $('#projectViewCount').textContent = countLabel(p.files.length);
    $('#projectViewKicker').textContent = pText(p,'eyebrow');
    $('#projectViewTitle').textContent = title;
    $('#projectViewStory').textContent = '';
    $('#projectViewScopeLabel').textContent = '';
    $('#projectViewScope').textContent = '';
    $('#projectViewGallery').innerHTML = p.files.map((f,i)=>`<figure class="project-view-figure" data-file="${f}" data-title="${title}">${imgMarkup(f,`${title} — ${String(i+1).padStart(2,'0')}`)}</figure>`).join('');
    addFallbacks($('#projectViewGallery'));
    document.querySelectorAll('.project-view-figure').forEach(fig=>fig.addEventListener('click',()=>openLightbox(fig.dataset.file,fig.dataset.title)));

    const inner = document.querySelector('.project-view-inner');
    inner.querySelector('.project-view-note')?.remove();
    const note = document.createElement('div');
    note.className = 'project-view-note';
    note.innerHTML = `<span>${copy().note}</span><p>${pText(p,'story')}</p>`;
    inner.appendChild(note);
  };

  // applyLang updates all static Arabic/English content and now calls our new renderer.
  applyLang();
})();
