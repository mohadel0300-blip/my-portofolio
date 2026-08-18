// Recruiter-first project curation. The personal hero remains untouched.
(() => {
  const byId=id=>projects.find(p=>p.id===id);
  const socialLab=byId('sociallab'),briefStudio=byId('briefstudio'),healthcare=byId('healthcare');
  const socialArchive=byId('social'),bannerArchive=byId('campaignbanners'),digitalArtboards=byId('digitalartboards');

  // Brand ownership is based on visible brand identity, not colour alone.
  // s20 is a clinic offer and therefore does not belong to Social Lab.
  // The two Digital Campaign Artboards are Social Lab executions and belong inside that project.
  const socialLabFiles=['s16.png','s21.png','Artboard 1.png','Artboard 2 2.png'];
  const briefStudioFiles=['s6.png','s8.png','b3.png','b4.png'];
  const clinicExtraFiles=['s20.png'];

  if(socialLab){
    socialLab.files=socialLabFiles;
    socialLab.eyebrow='Campaign / Social / Product';socialLab.eyebrowAr='حملة / سوشيال / منتج';
    socialLab.story='A connected visual series for Social Lab, built around a recognisable green system while each piece explains a different part of the product story.';
    socialLab.storyAr='سلسلة بصرية مترابطة لسوشيال لاب، مبنية على نظام بصري أخضر واضح، مع اختلاف الفكرة والرسالة من تصميم لآخر حسب جزء المنتج الذي يتم شرحه.';
    socialLab.scope='Campaign art direction · Social design · Product communication · 3D-led visuals';
    socialLab.scopeAr='إخراج الحملة · تصميم سوشيال · تواصل بصري للمنتج · صور ثلاثية الأبعاد';
  }
  if(briefStudio){
    briefStudio.files=briefStudioFiles;
    briefStudio.eyebrow='Campaign / Social';briefStudio.eyebrowAr='حملات / سوشيال';
    briefStudio.story='A set of Brief Studio pieces held together by a restrained red-and-black visual language across different formats.';
    briefStudio.storyAr='مجموعة تصميمات لبريف ستوديو تجمعها لغة بصرية حمراء وسوداء واضحة، مع تطبيقها على أكثر من مقاس ونوع محتوى.';
    briefStudio.scope='Visual direction · Campaign design · Social content · Adaptations';
    briefStudio.scopeAr='اتجاه بصري · تصميم حملات · محتوى سوشيال · تطبيقات متعددة';
  }
  if(healthcare){
    healthcare.files=[...clinicExtraFiles,...healthcare.files.filter(f=>!clinicExtraFiles.includes(f))];
  }

  // Remove files that now have a verified project owner from generic archive buckets.
  const assigned=new Set([...socialLabFiles,...briefStudioFiles,...clinicExtraFiles]);
  if(socialArchive) socialArchive.files=socialArchive.files.filter(f=>!assigned.has(f));
  if(bannerArchive) bannerArchive.files=bannerArchive.files.filter(f=>!assigned.has(f));
  if(digitalArtboards) digitalArtboards.files=[];

  const loadCss=(href,key)=>{
    if(document.querySelector(`link[data-${key}]`))return;
    const link=document.createElement('link');link.rel='stylesheet';link.href=href;link.setAttribute(`data-${key}`,'true');document.head.appendChild(link);
  };
  loadCss('recruiter-projects-v3.css','recruiter-projects-v3');
  loadCss('recruiter-categories.css','recruiter-categories');

  // These four stay as the visual recruiter hits and are not repeated below.
  const topIds=['sociallab','briefstudio','realestate','orient'];
  const topProjects=topIds.map(byId).filter(Boolean);

  // The grouped index contains only additional work, so the recruiter never sees the same project twice.
  const categoryDefs=[
    {id:'technology',en:'Technology & Digital Solutions',ar:'التكنولوجيا والحلول الرقمية',ids:['ecommerce']},
    {id:'campaigns',en:'Campaigns & Social',ar:'الحملات والسوشيال',ids:['event','socialartboards','social','campaignbanners']},
    {id:'healthcare',en:'Healthcare & Clinics',ar:'العيادات والرعاية الصحية',ids:['healthcare']},
    {id:'image',en:'AI & Image-making',ar:'الذكاء الاصطناعي وصناعة الصورة',ids:['natural','aiarchive']},
    {id:'product',en:'Product & Brand',ar:'المنتجات والهوية',ids:['huggies','brandapps','covers']},
    {id:'editorial',en:'Editorial & Media',ar:'التصميم التحريري والميديا',ids:['editorial']}
  ];

  const C=()=>lang==='ar'?{
    browseTitle:'أعمال أخرى حسب المجال',browseText:'أقوى أربعة مشاريع بالأعلى، وباقي الشغل هنا مرتب حسب المجال بدون تكرار.',view:'عرض المشروع ↗',note:'عن المشروع',projects:'مشاريع'
  }:{
    browseTitle:'More work by field',browseText:'The four strongest projects are above. The rest is grouped here by field without repetition.',view:'View project ↗',note:'Project note',projects:'projects'
  };
  const thumbSrc=f=>f.endsWith('.svg')?f:`web/thumb/${f}.webp`;
  const previewImage=(file,alt,hero=false)=>`<img src="${hero?fullSrc(file):thumbSrc(file)}" data-original="${file}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;

  const impactMarkup=(p,i)=>{
    const title=pText(p,'title'),type=pText(p,'eyebrow');
    return `<article class="impact-project" data-id="${p.id}"><div class="impact-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(p.files[0],`${title} — 01`,i===0)}</div><div class="impact-info"><span class="impact-no">${String(i+1).padStart(2,'0')}</span><div><h3>${title}</h3><p class="impact-type">${type}</p></div><span class="impact-count">${countLabel(p.files.length)}</span><button class="impact-open" type="button">${C().view}</button></div></article>`;
  };
  const categoryProjectMarkup=p=>{
    const title=pText(p,'title');
    return `<article class="category-project" data-id="${p.id}"><div class="category-project-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(p.files[0],`${title} — 01`)}</div><div class="category-project-copy"><div><h4>${title}</h4><p>${pText(p,'eyebrow')} · ${countLabel(p.files.length)}</p></div><button type="button" aria-label="${C().view.replace(' ↗','')}: ${title}">↗</button></div></article>`;
  };
  const categoryMarkup=def=>{
    const list=def.ids.map(byId).filter(p=>p&&p.files&&p.files.length),title=lang==='ar'?def.ar:def.en;
    if(!list.length)return '';
    return `<section class="work-category" data-category="${def.id}"><header class="work-category-head"><h4>${title}</h4><span>${list.length} ${C().projects}</span></header><div class="work-category-grid">${list.map(categoryProjectMarkup).join('')}</div></section>`;
  };
  const bindOpen=(scope,selector,buttonSelector)=>scope.querySelectorAll(selector).forEach(card=>{
    const p=byId(card.dataset.id),open=()=>p&&openProject(p),visual=card.querySelector('[role="button"]'),btn=card.querySelector(buttonSelector);
    if(visual){visual.addEventListener('click',open);visual.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});}
    if(btn)btn.addEventListener('click',open);
  });

  renderProjects=function(){
    const selectedRoot=$('#selectedProjects'),moreRoot=document.querySelector('.more-work');
    selectedRoot.innerHTML=`<div class="recruiter-featured">${topProjects.map(impactMarkup).join('')}</div>`;
    moreRoot.innerHTML=`<div class="recruiter-browse"><div class="recruiter-browse-head"><h3>${C().browseTitle}</h3><p>${C().browseText}</p></div><div class="work-categories">${categoryDefs.map(categoryMarkup).join('')}</div></div>`;
    addFallbacks(selectedRoot);addFallbacks(moreRoot);
    bindOpen(selectedRoot,'.impact-project','.impact-open');
    bindOpen(moreRoot,'.category-project','.category-project-copy button');
  };

  fillProjectView=function(p){
    ensureProjectView();const title=pText(p,'title');
    $('#projectViewClose').setAttribute('aria-label',U().close);$('#projectViewBarTitle').textContent=title;$('#projectViewCount').textContent=countLabel(p.files.length);$('#projectViewKicker').textContent=pText(p,'eyebrow');$('#projectViewTitle').textContent=title;$('#projectViewStory').textContent='';$('#projectViewScopeLabel').textContent='';$('#projectViewScope').textContent='';
    $('#projectViewGallery').innerHTML=p.files.map((f,i)=>`<figure class="project-view-figure" data-file="${f}" data-title="${title}">${imgMarkup(f,`${title} — ${String(i+1).padStart(2,'0')}`)}</figure>`).join('');
    addFallbacks($('#projectViewGallery'));document.querySelectorAll('.project-view-figure').forEach(fig=>fig.addEventListener('click',()=>openLightbox(fig.dataset.file,fig.dataset.title)));
    const inner=document.querySelector('.project-view-inner');inner.querySelector('.project-view-note')?.remove();const note=document.createElement('div');note.className='project-view-note';note.innerHTML=`<span>${C().note}</span><p>${pText(p,'story')}</p>`;inner.appendChild(note);
  };

  applyLang();
})();
