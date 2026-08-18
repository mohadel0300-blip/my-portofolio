const projects=[
{id:"sociallab",title:"Social Lab",eyebrow:"SaaS Product Story / 2026",story:"A persuasive product narrative that explains an AI sales platform with direct language, clear proof and a confident visual system.",scope:"Web experience · Content hierarchy · Presentation design",files:["social-lab.png"],featured:true},
{id:"briefstudio",title:"Brief Studio",eyebrow:"Company Profile / Presentation",story:"BRIEF — Company Profile.",scope:"Company profile · Editorial layout · Presentation design",files:["brief-project-cover.svg"],featured:true},
{id:"realestate",title:"Real Estate Social Campaign",eyebrow:"Real Estate / Social",story:"A campaign that moves from introducing the property to details and then the offer. The message changes from post to post, while the visual language keeps the series connected.",scope:"Visual direction · Social layouts · Campaign adaptations",files:["إطلالة الفلل.png","تفاصيل الفلل.png","عرض الفلل.png"],featured:true},
{id:"orient",title:"Orient Detectors",eyebrow:"Technology / 2022—2025",story:"I worked with Orient Detectors for nearly three years across campaigns, product visuals, social media, catalogs and brochures. Technical products often carry too much information for one layout, so a recurring part of the job was deciding what needed to be understood first.",scope:"Campaigns · Product communication · Social · Catalogs · Brochures",files:["g1.png","g2.png","g3.png","g4.png","g5.png","g6.png","g7.png","g8.png","g9.png"],featured:true},
{id:"natural",title:"Natural Product Visual Studies",eyebrow:"Product / Image-making",story:"A set of product-led visual studies built around ingredients, texture and atmosphere, with a consistent focus on product staging and composition.",scope:"Image direction · Product staging · Compositing",files:["01_brand_nature_rituals.png","07_natural_origins.png","٠٢.jpg","٠٣.png","٠٤.png"],featured:true},
{id:"ecommerce",title:"E-commerce Performance Content",eyebrow:"E-commerce / Arabic Content",story:"A content series around store performance and sales. The system stays familiar while headlines, numbers and supporting details change from one post to the next.",scope:"Social series · Arabic typography · Information hierarchy",files:["زيادة الأرباح.png","نسبة السلات.png","أرباح السلات.png"],featured:true},
{id:"healthcare",title:"Healthcare Pricing Series",eyebrow:"Healthcare / Social",story:"A repeatable pricing format for different services, designed to stay easy to scan on a phone while the service names, prices and supporting content change.",scope:"Social design · Arabic layout · Pricing hierarchy",files:["أسعار Full Body.png","أسعار ليزر المناطق.png","أسعار الهيدرافيشيال.png"],featured:true},
{id:"event",title:"Event Campaign",eyebrow:"Event / Social",story:"Two connected pieces from the same event communication set: one introduces the event, while the second carries the practical details.",scope:"Campaign layout · Event communication · Arabic typography",files:["تصوير المناسبات - رأسي.png","تفاصيل اللقاء.png"],featured:true},
{id:"huggies",title:"Huggies — Product Campaign Study",eyebrow:"Product / Portfolio Study",story:"A three-piece product campaign study built around one Huggies product.",scope:"Art direction · Composition · Product presentation",files:["h1.JPG","h2.JPG","h3.JPG"]},
{id:"aiarchive",title:"AI-assisted Commercial Archive",eyebrow:"Image-making / Archive",story:"A wider archive of AI-assisted commercial image work.",scope:"AI image generation · Photoshop · Compositing · Retouching",files:["ai1.jpg","ai2.jpg","ai3.jpg","ai4.jpg","ai5.jpg","ai6.jpg","ai7.jpg","ai8.jpg","ai9.jpg"]},
{id:"social",title:"Social Media Archive",eyebrow:"Social / Archive",story:"A broader set of social design work from the original portfolio archive.",scope:"Social design · Campaign adaptations · Daily content",files:["s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png","s9.png","s10.png","s11.png","s12.png","s13.png","s14.png","s15.png","s16.png","s17.png","s18.png","s19.png","s20.png","s21.png","s22.jpg","s23.jpg","s24.jpg"]},
{id:"editorial",title:"Editorial & Media Archive",eyebrow:"Editorial / Archive",story:"Poster and editorial work from the earlier part of my portfolio.",scope:"Editorial layout · Poster design · Media graphics",files:["p1.png","p2.png","p3.png","p4.png","p5.png","p6.png"]},
{id:"campaignbanners",title:"Campaign & Banner Archive",eyebrow:"Campaign / Archive",story:"Campaign and banner layouts from the original portfolio archive.",scope:"Campaign layout · Digital banners · Print adaptations",files:["b1.png","b2.png","b3.png","b4.png"]},
{id:"brandapps",title:"Brand Applications Archive",eyebrow:"Brand / Print Archive",story:"Brand applications and print-oriented pieces from the older portfolio.",scope:"Brand applications · Layout · Print",files:["c1.png","c2.png","c3.png","c4.png","c6.png","c7.png","c8.png"]},
{id:"socialartboards",title:"Social Campaign Artboards",eyebrow:"Social / Archive Set",story:"A separate run of social campaign artboards from the uploaded archive.",scope:"Social layouts · Promotional content · Arabic design",files:["العرض.png","Artboard 2.png","Artboard 3.png","Artboard 4.png","Artboard 5.png","Artboard 6.png","01.png"]},
{id:"digitalartboards",title:"Digital Campaign Artboards",eyebrow:"Digital / Archive Set",story:"Two large-format digital campaign pieces from the same exported set.",scope:"Digital campaign · Banner layout",files:["Artboard 1.png","Artboard 2 2.png"]},
{id:"covers",title:"Project Covers & Experiments",eyebrow:"Archive / Covers",story:"Standalone covers and visual experiments uploaded with the portfolio.",scope:"Cover design · Visual experiments · Project thumbnails",files:["khairzad.png","seredo.png","tab-beauty.png"]}
];

const $=s=>document.querySelector(s);
const fullSrc=f=>f.endsWith('.svg')?f:`web/full/${f}.webp`;
const selected=projects.filter(p=>p.featured);
const additional=projects.filter(p=>!p.featured);

function imgMarkup(file,alt,priority='lazy'){
  const src=fullSrc(file);
  return `<img src="${src}" data-original="${file}" alt="${alt}" loading="${priority}" decoding="async">`;
}
function addFallbacks(root=document){
  root.querySelectorAll('img[data-original]').forEach(img=>{
    img.onerror=()=>{img.onerror=null;img.src=img.dataset.original};
  });
}

function cardMarkup(p,i){
  return `<article class="project-card" data-id="${p.id}">
    <div class="project-card-visual" role="button" tabindex="0" aria-label="Open ${p.title}">${imgMarkup(p.files[0],`${p.title} cover`,i===0?'eager':'lazy')}</div>
    <div class="project-card-copy">
      <div class="project-card-top"><span class="project-card-no">${String(i+1).padStart(2,'0')}</span><span class="project-card-meta">${p.eyebrow}</span></div>
      <h3>${p.title}</h3>
      <p class="project-card-story">${p.story}</p>
      <div class="project-card-scope"><span>Scope</span><p>${p.scope}</p></div>
      <div class="project-card-footer"><span>${p.files.length} ${p.files.length===1?'piece':'pieces'}</span><button class="view-project" type="button">View project ↗</button></div>
    </div>
  </article>`;
}
function archiveMarkup(p,i){
  return `<article class="archive-row" data-id="${p.id}"><button class="archive-row-button" type="button"><span class="archive-no">${String(i+1+selected.length).padStart(2,'0')}</span><span class="archive-title">${p.title}</span><span class="archive-meta">${p.eyebrow}<br>${p.files.length} ${p.files.length===1?'piece':'pieces'}</span><span class="archive-arrow">↗</span></button></article>`;
}

function renderProjects(){
  $('#selectedProjects').innerHTML=`<div class="deck-shell"><div class="deck-tools"><div class="deck-progress"><span id="deckCurrent">01</span><i></i><span>${String(selected.length).padStart(2,'0')}</span></div><div class="deck-buttons"><button type="button" id="deckPrev" aria-label="Previous project">←</button><button type="button" id="deckNext" aria-label="Next project">→</button></div></div><div class="project-deck" id="projectDeck">${selected.map(cardMarkup).join('')}</div></div>`;
  $('#additionalProjects').innerHTML=additional.map(archiveMarkup).join('');
  addFallbacks($('#selectedProjects'));

  document.querySelectorAll('.project-card').forEach(card=>{
    const open=()=>openProject(projects.find(p=>p.id===card.dataset.id));
    card.querySelector('.view-project').addEventListener('click',open);
    const visual=card.querySelector('.project-card-visual');
    visual.addEventListener('click',open);
    visual.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
  document.querySelectorAll('.archive-row-button').forEach(btn=>btn.addEventListener('click',()=>openProject(projects.find(p=>p.id===btn.closest('.archive-row').dataset.id))));

  const deck=$('#projectDeck');
  const cards=[...deck.children];
  const updateProgress=()=>{
    let best=0,bestDist=Infinity;
    cards.forEach((card,i)=>{const d=Math.abs(card.offsetLeft-deck.scrollLeft);if(d<bestDist){best=i;bestDist=d}});
    $('#deckCurrent').textContent=String(best+1).padStart(2,'0');
  };
  const step=dir=>deck.scrollBy({left:dir*Math.min(deck.clientWidth*.9,1100),behavior:'smooth'});
  $('#deckPrev').addEventListener('click',()=>step(-1));
  $('#deckNext').addEventListener('click',()=>step(1));
  deck.addEventListener('scroll',()=>requestAnimationFrame(updateProgress),{passive:true});
  updateProgress();
}

function ensureProjectView(){
  if($('#projectView'))return;
  const view=document.createElement('section');
  view.id='projectView';view.className='project-view';view.setAttribute('aria-hidden','true');
  view.innerHTML=`<div class="project-view-bar"><button class="project-view-close" id="projectViewClose" type="button" aria-label="Close project">×</button><span id="projectViewBarTitle"></span><span id="projectViewCount"></span></div><div class="project-view-inner"><header class="project-view-head"><div><div class="project-view-kicker" id="projectViewKicker"></div><h2 id="projectViewTitle"></h2></div><div class="project-view-copy"><p id="projectViewStory"></p><div class="project-view-scope"><span>Scope</span><p id="projectViewScope"></p></div></div></header><div class="project-view-gallery" id="projectViewGallery"></div></div>`;
  document.body.appendChild(view);
  $('#projectViewClose').addEventListener('click',closeProject);
}
function openProject(p){
  ensureProjectView();
  $('#projectViewBarTitle').textContent=p.title;
  $('#projectViewCount').textContent=`${p.files.length} ${p.files.length===1?'piece':'pieces'}`;
  $('#projectViewKicker').textContent=p.eyebrow;
  $('#projectViewTitle').textContent=p.title;
  $('#projectViewStory').textContent=p.story;
  $('#projectViewScope').textContent=p.scope;
  $('#projectViewGallery').innerHTML=p.files.map((f,i)=>`<figure class="project-view-figure" data-file="${f}" data-title="${p.title}">${imgMarkup(f,`${p.title} — work ${i+1}`)}</figure>`).join('');
  addFallbacks($('#projectViewGallery'));
  document.querySelectorAll('.project-view-figure').forEach(fig=>fig.addEventListener('click',()=>openLightbox(fig.dataset.file,fig.dataset.title)));
  const view=$('#projectView');
  view.classList.add('open');view.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  view.scrollTop=0;
}
function closeProject(){
  const view=$('#projectView');if(!view)return;
  view.classList.remove('open');view.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');
}

const lightbox=$('#lightbox'),lightboxImage=$('#lightboxImage'),lightboxCaption=$('#lightboxCaption');
function openLightbox(file,title){lightboxImage.onerror=()=>{lightboxImage.onerror=null;lightboxImage.src=file};lightboxImage.src=fullSrc(file);lightboxCaption.textContent=title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImage.src='';if(!$('#projectView')?.classList.contains('open'))document.body.classList.remove('modal-open')}
$('#lightboxClose').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(lightbox.classList.contains('open'))closeLightbox();else if($('#projectView')?.classList.contains('open'))closeProject()}});

const root=document.documentElement,langToggle=$('#langToggle');let lang=localStorage.getItem('portfolioLang')||'en';
function applyLang(){const ar=lang==='ar';root.lang=lang;root.dir=ar?'rtl':'ltr';langToggle.textContent=ar?'EN':'AR';document.querySelectorAll('[data-en][data-ar]').forEach(el=>{const v=el.getAttribute(ar?'data-ar':'data-en');if(v.includes('<'))el.innerHTML=v;else el.textContent=v});localStorage.setItem('portfolioLang',lang)}
langToggle.addEventListener('click',()=>{lang=lang==='en'?'ar':'en';applyLang()});
renderProjects();applyLang();