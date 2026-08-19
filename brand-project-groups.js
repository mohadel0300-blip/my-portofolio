// Recruiter-first project curation. The personal hero remains untouched.
(() => {
  // New and audited project groups. Grouping follows visible brand/content evidence rather than upload order.
  projects.push(
    {
      id:'briefagency',title:'Brief Agency',titleAr:'بريف إيجنسي',
      eyebrow:'Agency / Strategy / Social',eyebrowAr:'وكالة / استراتيجية / سوشيال',
      story:'A three-post series for Brief Agency around strategic planning, execution and growth paths.',
      storyAr:'سلسلة من ثلاثة بوستات لبريف إيجنسي حول المسار الاستراتيجي والتنفيذي ومسار النمو.',
      scope:'Visual direction · Social design · Campaign communication',
      scopeAr:'اتجاه بصري · تصميم سوشيال · تواصل الحملة',
      files:['brief-agency-signs.webp','brief-agency-strategy.webp','brief-agency-execution.webp'],
      cover:'brief-agency-signs.webp'
    },
    {
      id:'communitycampaign',title:'Community Awareness Campaign',titleAr:'حملة توعوية ومجتمعية',
      eyebrow:'Awareness / Social',eyebrowAr:'توعية / سوشيال',
      story:'A connected Arabic social series for community awareness and guidance.',
      storyAr:'سلسلة سوشيال عربية مترابطة للتوعية والإرشاد المجتمعي.',
      scope:'Social design · Arabic typography · Campaign adaptations',
      scopeAr:'تصميم سوشيال · تايبوجرافي عربي · تطبيقات الحملة',
      files:['Artboard 2.png','Artboard 3.png','Artboard 4.png','Artboard 5.png','Artboard 6.png']
    },
    {
      id:'alluriv',title:'Alluriv Perfume',titleAr:'Alluriv للعطور',
      eyebrow:'Product / Social',eyebrowAr:'منتج / سوشيال',
      story:'A product-led perfume series built around multiple fragrances in one visual system.',
      storyAr:'سلسلة عطور تجمع أكثر من منتج داخل نظام بصري واحد.',
      scope:'Product presentation · Social design · Campaign layouts',
      scopeAr:'عرض المنتج · تصميم سوشيال · تصميمات الحملة',
      files:['العرض.png','01.png']
    },
    {
      id:'lenstech',title:'Lens Tech',titleAr:'Lens Tech',
      eyebrow:'Technology / Social',eyebrowAr:'تقنية / سوشيال',
      story:'A technology-focused social design from the wider archive.',
      storyAr:'تصميم سوشيال تقني من أرشيف الأعمال الأوسع.',
      scope:'Social design · Product communication',scopeAr:'تصميم سوشيال · تواصل بصري للمنتج',
      files:['s1.png']
    },
    {
      id:'classtech',title:'Class Tech',titleAr:'Class Tech',
      eyebrow:'Technology / Campaign',eyebrowAr:'تقنية / حملة',
      story:'A technology campaign layout separated from unrelated banner work.',
      storyAr:'تصميم حملة تقنية تم فصله عن أعمال البنرات غير المرتبطة.',
      scope:'Campaign layout · Technology communication',scopeAr:'تصميم حملة · تواصل بصري تقني',
      files:['b4.png']
    }
  );

  const byId=id=>projects.find(p=>p.id===id);
  const socialLab=byId('sociallab'),briefStudio=byId('briefstudio'),healthcare=byId('healthcare');
  const editorial=byId('editorial'),orient=byId('orient'),socialArchive=byId('social');
  const bannerArchive=byId('campaignbanners'),socialArtboards=byId('socialartboards'),digitalArtboards=byId('digitalartboards'),covers=byId('covers');

  const socialLabFiles=['s16.png','s15.png','s3.png','s4.png','s5.png','Artboard 1.png','Artboard 2 2.png','social-lab.png'];
  const briefStudioFiles=['s6.png','s7.png','s8.png','b3.png'];
  const healthcareBeautyFiles=['s21.png','s20.png','s19.png','s17.png','s22.jpg','s14.png','أسعار Full Body.png','أسعار ليزر المناطق.png','أسعار الهيدرافيشيال.png','tab-beauty.png'];
  const communityFiles=['Artboard 2.png','Artboard 3.png','Artboard 4.png','Artboard 5.png','Artboard 6.png'];
  const perfumeFiles=['العرض.png','01.png'];
  const technologySingles=['s1.png','b4.png'];

  if(socialLab){
    socialLab.files=socialLabFiles;
    socialLab.eyebrow='Campaign / Social / Product';socialLab.eyebrowAr='حملة / سوشيال / منتج';
    socialLab.story='A connected Social Lab visual system across campaign, product and social executions.';
    socialLab.storyAr='نظام بصري مترابط لسوشيال لاب عبر تصميمات الحملة والمنتج والسوشيال.';
    socialLab.scope='Campaign art direction · Social design · Product communication';
    socialLab.scopeAr='إخراج الحملة · تصميم سوشيال · تواصل بصري للمنتج';
  }

  if(briefStudio){
    briefStudio.files=briefStudioFiles;
    briefStudio.cover='s7.png';
    briefStudio.eyebrow='Campaign / Social';briefStudio.eyebrowAr='حملات / سوشيال';
    briefStudio.story='Brief Studio social and campaign pieces grouped as one visual series.';
    briefStudio.storyAr='تصميمات بريف ستوديو للحملات والسوشيال مجمعة كسلسلة بصرية واحدة.';
    briefStudio.scope='Visual direction · Campaign design · Social content';
    briefStudio.scopeAr='اتجاه بصري · تصميم حملات · محتوى سوشيال';
  }

  if(healthcare){
    healthcare.title='Healthcare & Beauty';healthcare.titleAr='العيادات والتجميل';
    healthcare.eyebrow='Clinics / Beauty / Social';healthcare.eyebrowAr='عيادات / تجميل / سوشيال';
    healthcare.story='Selected clinic, medical and beauty social design grouped together as one category of work.';
    healthcare.storyAr='مجموعة مختارة من تصميمات العيادات والمجال الطبي والتجميل مجمعة معًا كفئة واحدة من الأعمال.';
    healthcare.scope='Healthcare social · Beauty content · Promotional design';
    healthcare.scopeAr='سوشيال للعيادات · محتوى تجميل · تصميمات ترويجية';
    healthcare.files=healthcareBeautyFiles;
  }

  if(editorial){
    editorial.title='News & Editorial Design';editorial.titleAr='تصميمات الأخبار والميديا';
    editorial.eyebrow='News / Editorial / Media';editorial.eyebrowAr='أخبار / تحريري / ميديا';
    editorial.story='News-led and editorial visual work from the earlier media part of my career.';
    editorial.storyAr='أعمال بصرية خبرية وتحريرية من الجزء المبكر من مساري في الميديا.';
    editorial.scope='Editorial layout · News graphics · Media design';
    editorial.scopeAr='إخراج تحريري · جرافيك أخبار · تصميم ميديا';
    editorial.cover='p2.png';
  }

  if(orient) orient.cover='g6.png';

  if(socialArchive){
    socialArchive.title='Additional Social Work';socialArchive.titleAr='أعمال سوشيال إضافية';
    socialArchive.story='Additional standalone social pieces that do not have enough verified brand context to combine into a named project.';
    socialArchive.storyAr='أعمال سوشيال إضافية مستقلة لا تتوفر عنها معلومات كافية لضمها إلى مشروع براند محدد.';
  }
  if(bannerArchive){
    bannerArchive.title='Additional Campaign Layouts';bannerArchive.titleAr='تصميمات حملات إضافية';
  }

  // Remove verified project files from generic buckets so each piece has one clear owner.
  const assigned=new Set([...socialLabFiles,...briefStudioFiles,...healthcareBeautyFiles,...communityFiles,...perfumeFiles,...technologySingles]);
  if(socialArchive) socialArchive.files=socialArchive.files.filter(f=>!assigned.has(f));
  if(bannerArchive) bannerArchive.files=bannerArchive.files.filter(f=>!assigned.has(f));
  if(socialArtboards) socialArtboards.files=[];
  if(digitalArtboards) digitalArtboards.files=[];
  if(covers) covers.files=covers.files.filter(f=>!assigned.has(f));

  const loadCss=(href,key)=>{
    if(document.querySelector(`link[data-${key}]`))return;
    const link=document.createElement('link');link.rel='stylesheet';link.href=href;link.setAttribute(`data-${key}`,'true');document.head.appendChild(link);
  };
  loadCss('recruiter-projects-v3.css?v=20260819-0445','recruiter-projects-v3');
  loadCss('recruiter-categories.css?v=20260819-0445','recruiter-categories');

  // New work leads, followed by the strongest recruiter-facing categories.
  const topIds=['briefagency','sociallab','editorial','briefstudio','realestate','orient'];
  const topProjects=topIds.map(byId).filter(Boolean);

  const categoryDefs=[
    {id:'technology',en:'Technology & Digital Solutions',ar:'التكنولوجيا والحلول الرقمية',ids:['lenstech','classtech','ecommerce']},
    {id:'campaigns',en:'Campaigns & Social',ar:'الحملات والسوشيال',ids:['communitycampaign','event','social','campaignbanners']},
    {id:'healthcare',en:'Healthcare & Beauty',ar:'العيادات والتجميل',ids:['healthcare']},
    {id:'image',en:'AI & Image-making',ar:'الذكاء الاصطناعي وصناعة الصورة',ids:['natural','aiarchive']},
    {id:'product',en:'Product & Brand',ar:'المنتجات والهوية',ids:['alluriv','huggies','brandapps','covers']}
  ];

  const C=()=>lang==='ar'?{
    browseTitle:'أعمال أخرى حسب المجال',browseText:'المشاريع الرئيسية بالأعلى، وباقي الأعمال هنا مجمعة حسب البراند أو المجال بدون خلط غير مؤكد.',view:'عرض المشروع ↗',note:'عن المشروع',projects:'مشاريع'
  }:{
    browseTitle:'More work by field',browseText:'The main projects are above. The rest is grouped by verified brand or field without forcing unrelated work together.',view:'View project ↗',note:'Project note',projects:'projects'
  };

  const isDirect=f=>/\.(svg|webp)$/i.test(f);
  const projectSrc=f=>isDirect(f)?f:fullSrc(f);
  const thumbSrc=f=>isDirect(f)?f:`web/thumb/${f}.webp`;
  const coverFile=p=>p.cover||p.files[0];
  const previewImage=(file,alt,hero=false)=>`<img src="${hero?projectSrc(file):thumbSrc(file)}" data-original="${file}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
  const projectImgMarkup=(file,alt,priority='lazy')=>`<img src="${projectSrc(file)}" data-original="${file}" alt="${alt}" loading="${priority}" decoding="async">`;

  const impactMarkup=(p,i)=>{
    const title=pText(p,'title'),type=pText(p,'eyebrow'),cover=coverFile(p);
    return `<article class="impact-project" data-id="${p.id}"><div class="impact-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(cover,`${title} — cover`,i===0)}</div><div class="impact-info"><span class="impact-no">${String(i+1).padStart(2,'0')}</span><div><h3>${title}</h3><p class="impact-type">${type}</p></div><span class="impact-count">${countLabel(p.files.length)}</span><button class="impact-open" type="button">${C().view}</button></div></article>`;
  };
  const categoryProjectMarkup=p=>{
    const title=pText(p,'title'),cover=coverFile(p);
    return `<article class="category-project" data-id="${p.id}"><div class="category-project-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(cover,`${title} — cover`)}</div><div class="category-project-copy"><div><h4>${title}</h4><p>${pText(p,'eyebrow')} · ${countLabel(p.files.length)}</p></div><button type="button" aria-label="${C().view.replace(' ↗','')}: ${title}">↗</button></div></article>`;
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
    const view=$('#projectView');view.dataset.project=p.id;
    $('#projectViewClose').setAttribute('aria-label',U().close);$('#projectViewBarTitle').textContent=title;$('#projectViewCount').textContent=countLabel(p.files.length);$('#projectViewKicker').textContent=pText(p,'eyebrow');$('#projectViewTitle').textContent=title;$('#projectViewStory').textContent='';$('#projectViewScopeLabel').textContent='';$('#projectViewScope').textContent='';
    $('#projectViewGallery').innerHTML=p.files.map((f,i)=>`<figure class="project-view-figure" data-file="${f}" data-title="${title}">${projectImgMarkup(f,`${title} — ${String(i+1).padStart(2,'0')}`)}</figure>`).join('');
    addFallbacks($('#projectViewGallery'));document.querySelectorAll('.project-view-figure').forEach(fig=>fig.addEventListener('click',()=>openLightbox(fig.dataset.file,fig.dataset.title)));
    const inner=document.querySelector('.project-view-inner');inner.querySelector('.project-view-note')?.remove();const note=document.createElement('div');note.className='project-view-note';note.innerHTML=`<span>${C().note}</span><p>${pText(p,'story')}</p>`;inner.appendChild(note);
  };

  // Direct WebP assets are already web-optimized and should not be routed through /web/full/ again.
  openLightbox=function(file,title){
    lightboxImage.onerror=()=>{lightboxImage.onerror=null;lightboxImage.src=file};
    lightboxImage.src=projectSrc(file);lightboxCaption.textContent=title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  };

  applyLang();
})();
