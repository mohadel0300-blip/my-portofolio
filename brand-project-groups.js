// Recruiter-first project curation. The personal hero remains untouched.
(() => {
  // New and audited project groups. Grouping follows visible brand/content evidence rather than upload order.
  projects.push(
    {
      id:'briefagency',title:'Brief Agency',titleAr:'بريف إيجنسي',
      eyebrow:'Agency / Strategy / Social',eyebrowAr:'وكالة / استراتيجية / سوشيال',
      story:'The brief was not to make three unrelated posts. The goal was to explain strategy, execution and growth as one connected idea. I used the road signs as a simple device that could change from one message to the next without losing the series.',
      storyAr:'الفكرة لم تكن ثلاثة بوستات منفصلة، بل شرح الاستراتيجية والتنفيذ والنمو كمسار واحد مترابط. استخدمت لافتات الطريق كعنصر بسيط يتغيّر مع كل رسالة من غير ما تفقد السلسلة شكلها.',
      scope:'Visual direction · Social design · Campaign communication',
      scopeAr:'اتجاه بصري · تصميم سوشيال · تواصل الحملة',
      files:['brief-agency-signs.webp','brief-agency-strategy.webp','brief-agency-execution.webp'],
      cover:'brief-agency-signs.webp'
    },
    {
      id:'communitycampaign',title:'Community Awareness Campaign',titleAr:'حملة توعوية ومجتمعية',
      eyebrow:'Awareness / Social',eyebrowAr:'توعية / سوشيال',
      story:'This Arabic awareness series relies on one clear idea per post. I kept the headlines direct and built each composition around the action I wanted the viewer to remember.',
      storyAr:'تعتمد هذه السلسلة التوعوية العربية على فكرة واحدة واضحة في كل بوست. حافظت على عناوين مباشرة، وبنيت كل تكوين حول التصرف الذي أريد من المشاهد أن يتذكره.',
      scope:'Social design · Arabic typography · Campaign adaptations',
      scopeAr:'تصميم سوشيال · تايبوجرافي عربي · تطبيقات الحملة',
      files:['Artboard 2.png','Artboard 3.png','Artboard 4.png','Artboard 5.png','Artboard 6.png']
    },
    {
      id:'alluriv',title:'Alluriv Perfume',titleAr:'Alluriv للعطور',
      eyebrow:'Product / Social',eyebrowAr:'منتج / سوشيال',
      story:'The goal was to present several perfumes as one family without flattening the personality of each product. I used a shared product stage and visual rhythm, then let the color and ingredients distinguish each fragrance.',
      storyAr:'كان الهدف تقديم عدة عطور كعائلة واحدة من غير ما تضيع شخصية كل منتج. استخدمت مسرحًا بصريًا وإيقاعًا مشتركين، وتركت اللون والمكونات يميّزان كل عطر.',
      scope:'Product presentation · Social design · Campaign layouts',
      scopeAr:'عرض المنتج · تصميم سوشيال · تصميمات الحملة',
      files:['العرض.png','01.png']
    },
    {
      id:'lenstech',title:'Lens Tech',titleAr:'Lens Tech',
      eyebrow:'Technology / Social',eyebrowAr:'تقنية / سوشيال',
      story:'A focused technology post built around one clear product message and a clean, high-contrast layout.',
      storyAr:'بوست تقني يركّز على رسالة واحدة واضحة للمنتج، بتكوين نظيف وتباين قوي.',
      scope:'Social design · Product communication',scopeAr:'تصميم سوشيال · تواصل بصري للمنتج',
      files:['s1.png']
    },
    {
      id:'classtech',title:'Class Tech',titleAr:'Class Tech',
      eyebrow:'Technology / Campaign',eyebrowAr:'تقنية / حملة',
      story:'A Class Tech campaign layout organized around a direct message and a strong technology visual.',
      storyAr:'تصميم حملة لـClass Tech مبني حول رسالة مباشرة وصورة تقنية قوية.',
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
  const healthcareBeautyFiles=['s21.png','s20.png','s19.png','s17.png','s22.jpg','s14.png','s2.png','أسعار Full Body.png','أسعار ليزر المناطق.png','أسعار الهيدرافيشيال.png','tab-beauty.png'];
  const communityFiles=['Artboard 2.png','Artboard 3.png','Artboard 4.png','Artboard 5.png','Artboard 6.png'];
  const perfumeFiles=['العرض.png','01.png'];
  const technologySingles=['s1.png','b4.png'];

  if(socialLab){
    socialLab.files=socialLabFiles;
    socialLab.eyebrow='Campaign / Social / Product';socialLab.eyebrowAr='حملة / سوشيال / منتج';
    socialLab.story='Social Lab needed a system that could move between campaign messages, product moments and day-to-day content without feeling like a different brand each time. I kept the palette and graphic language consistent, then changed the composition to fit each message.';
    socialLab.storyAr='كان Social Lab يحتاج نظامًا ينتقل بين رسائل الحملات ولحظات المنتج والمحتوى اليومي من غير ما يبدو كأنه براند مختلف كل مرة. ثبّتُّ الألوان واللغة الجرافيكية، وغيّرت التكوين حسب الرسالة.';
    socialLab.scope='Campaign art direction · Social design · Product communication';
    socialLab.scopeAr='إخراج الحملة · تصميم سوشيال · تواصل بصري للمنتج';
  }

  if(briefStudio){
    briefStudio.files=briefStudioFiles;
    briefStudio.cover='s7.png';
    briefStudio.eyebrow='Campaign / Social';briefStudio.eyebrowAr='حملات / سوشيال';
    briefStudio.story='These pieces were created across different campaign and social needs for Brief Studio. The challenge was to keep a recognizable voice while letting each message use the visual idea it needed.';
    briefStudio.storyAr='هذه الأعمال صُممت لاحتياجات مختلفة من الحملات والسوشيال في Brief Studio. كان التحدي أن يظل الصوت البصري معروفًا، مع إعطاء كل رسالة الفكرة التي تناسبها.';
    briefStudio.scope='Visual direction · Campaign design · Social content';
    briefStudio.scopeAr='اتجاه بصري · تصميم حملات · محتوى سوشيال';
  }

  if(healthcare){
    healthcare.title='Healthcare & Beauty';healthcare.titleAr='العيادات والتجميل';
    healthcare.eyebrow='Clinics / Beauty / Social';healthcare.eyebrowAr='عيادات / تجميل / سوشيال';
    healthcare.story='This is a category of client work rather than one campaign. The shared challenge was making prices, services and offers easy to scan on a phone while keeping the result inviting and credible.';
    healthcare.storyAr='هذه فئة من أعمال عملاء مختلفين وليست حملة واحدة. التحدي المشترك كان أن تكون الأسعار والخدمات والعروض سهلة القراءة على الهاتف، مع الحفاظ على شكل مريح وموثوق.';
    healthcare.scope='Healthcare social · Beauty content · Promotional design';
    healthcare.scopeAr='سوشيال للعيادات · محتوى تجميل · تصميمات ترويجية';
    healthcare.files=healthcareBeautyFiles;
  }

  if(editorial){
    editorial.title='News & Editorial Design';editorial.titleAr='تصميمات الأخبار والميديا';
    editorial.eyebrow='News / Editorial / Media';editorial.eyebrowAr='أخبار / تحريري / ميديا';
    editorial.story='These pieces come from my earlier media work, where the design had to support the story quickly. I learned to build a clear headline hierarchy, choose the strongest image and keep the layout readable under a fast publishing rhythm.';
    editorial.storyAr='هذه الأعمال من بدايتي في الميديا، حيث كان التصميم لازم يخدم الخبر بسرعة. تعلّمت وقتها أن أبني ترتيبًا واضحًا للعناوين، وأختار أقوى صورة، وأحافظ على قراءة سهلة وسط إيقاع نشر سريع.';
    editorial.scope='Editorial layout · News graphics · Media design';
    editorial.scopeAr='إخراج تحريري · جرافيك أخبار · تصميم ميديا';
    editorial.cover='p2.png';
  }

  if(orient) orient.cover='g6.png';

  if(socialArchive){
    socialArchive.title='Additional Social Work';socialArchive.titleAr='أعمال سوشيال إضافية';
    socialArchive.story='These are standalone pieces from different briefs. I keep them in the archive rather than forcing them into one named case study.';
    socialArchive.storyAr='هذه قطع مستقلة من بريفات مختلفة. أحتفظ بها في الأرشيف بدل ما أفرض عليها اسم مشروع واحد لا يعكس حقيقتها.';
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
  loadCss('recruiter-projects-v3.css?v=20260819-0545','recruiter-projects-v3');
  loadCss('recruiter-categories.css?v=20260819-0545','recruiter-categories');

  // Selected projects are the recruiter-facing lead work. Everything else moves to the compact archive.
  const topIds=['briefagency','sociallab','editorial','briefstudio','realestate','healthcare','alluriv','communitycampaign','orient'];
  const topProjects=topIds.map(byId).filter(Boolean);

  const categoryDefs=[
    {id:'technology',en:'Technology & Digital Solutions',ar:'التكنولوجيا والحلول الرقمية',ids:['lenstech','classtech','ecommerce']},
    {id:'campaigns',en:'Campaigns & Social',ar:'الحملات والسوشيال',ids:['event','social','campaignbanners']},
    {id:'image',en:'AI & Image-making',ar:'الذكاء الاصطناعي وصناعة الصورة',ids:['natural','aiarchive']},
    {id:'product',en:'Product & Brand',ar:'المنتجات والهوية',ids:['huggies','brandapps','covers']}
  ];

  const C=()=>lang==='ar'?{
    browseTitle:'أعمال أخرى حسب المجال',browseText:'باقي الأعمال متاحة في الأرشيف المضغوط بالأسفل.',view:'عرض المشروع ↗',note:'عن المشروع',projects:'مشاريع'
  }:{
    browseTitle:'More work by field',browseText:'The remaining work is available in the compact archive below.',view:'View project ↗',note:'Project note',projects:'projects'
  };

  const isDirect=f=>/\.(svg|webp)$/i.test(f);
  const projectSrc=f=>isDirect(f)?f:fullSrc(f);
  const thumbSrc=f=>isDirect(f)?f:`web/thumb/${f}.webp`;
  const coverFile=p=>p.cover||p.files[0];
  const previewImage=(file,alt,hero=false)=>`<img src="${hero?projectSrc(file):thumbSrc(file)}" data-original="${file}" alt="${alt}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>`;
  const projectImgMarkup=(file,alt,priority='lazy')=>`<img src="${projectSrc(file)}" data-original="${file}" alt="${alt}" loading="${priority}" decoding="async">`;

  const impactMarkup=(p,i)=>{
    const title=pText(p,'title'),type=pText(p,'eyebrow'),cover=coverFile(p);
    return `<article class="impact-project" data-id="${p.id}"><div class="impact-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(cover,`${title} — cover`,i===0)}</div><div class="impact-info"><span class="impact-no">${String(i+1).padStart(2,'0')}</span><div><h3>${title}</h3><p class="impact-type">${type}</p></div><span class="impact-count">${countLabel(p.files.length)}</span><button class="impact-open" type="button" aria-label="${C().view.replace(' ↗','')}: ${title}">${C().view}</button></div></article>`;
  };
  const categoryProjectMarkup=p=>{
    const title=pText(p,'title'),cover=coverFile(p);
    return `<article class="category-project" data-id="${p.id}"><div class="category-project-visual" role="button" tabindex="0" aria-label="${C().view.replace(' ↗','')}: ${title}">${previewImage(cover,`${title} — cover`)}</div><div class="category-project-copy"><div><h4>${title}</h4><p>${pText(p,'eyebrow')} · ${countLabel(p.files.length)}</p></div><button type="button" aria-label="${C().view.replace(' ↗','')}: ${title}"><span aria-hidden="true">↗</span></button></div></article>`;
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
    $('#projectViewClose').setAttribute('aria-label',U().close);$('#projectViewBarTitle').textContent=title;$('#projectViewCount').textContent=countLabel(p.files.length);$('#projectViewKicker').textContent=pText(p,'eyebrow');$('#projectViewTitle').textContent=title;$('#projectViewStory').textContent=pText(p,'story');$('#projectViewScopeLabel').textContent=U().scope;$('#projectViewScope').textContent=pText(p,'scope');
    $('#projectViewGallery').innerHTML=p.files.map((f,i)=>`<figure class="project-view-figure" data-file="${f}" data-title="${title}" role="button" tabindex="0" aria-label="${U().openImage} ${i+1}: ${title}">${projectImgMarkup(f,`${title} — ${String(i+1).padStart(2,'0')}`)}</figure>`).join('');
    addFallbacks($('#projectViewGallery'));document.querySelectorAll('.project-view-figure').forEach(fig=>{
      const open=()=>openLightbox(fig.dataset.file,fig.dataset.title);
      fig.addEventListener('click',open);
      fig.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
    });
    document.querySelector('.project-view-inner')?.querySelector('.project-view-note')?.remove();
  };

  // Direct WebP assets are already web-optimized and should not be routed through /web/full/ again.
  openLightbox=function(file,title){
    lastLightboxFocused=document.activeElement instanceof HTMLElement?document.activeElement:null;
    lightboxImage.onerror=()=>{lightboxImage.onerror=null;lightboxImage.src=file};
    lightboxImage.src=projectSrc(file);lightboxCaption.textContent=title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
    requestAnimationFrame(()=>$('#lightboxClose')?.focus());
  };

  applyLang();
})();
