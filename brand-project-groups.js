// Verified visual grouping pass: Social Lab = green system, Brief Studio = red/black system.
(() => {
  const byId = id => projects.find(p => p.id === id);
  const socialLab = byId('sociallab');
  const briefStudio = byId('briefstudio');
  const socialArchive = byId('social');
  const bannerArchive = byId('campaignbanners');

  const socialLabFiles = ['s3.png','s4.png','s5.png','s16.png','s20.png','s21.png'];
  const briefStudioFiles = ['b3.png','b4.png','s6.png','s8.png'];

  if (socialLab) {
    socialLab.files = socialLabFiles;
    socialLab.eyebrow = 'AI Product / Social Campaign';
    socialLab.eyebrowAr = 'منتج تقني / حملة سوشيال';
    socialLab.story = 'A connected visual series for Social Lab, built around a recognisable green system while each piece explains a different part of the product story.';
    socialLab.storyAr = 'سلسلة بصرية مترابطة لسوشيال لاب، مبنية على نظام أخضر واضح، مع اختلاف الفكرة والرسالة من تصميم لآخر حسب جزء المنتج الذي يتم شرحه.';
    socialLab.scope = 'Campaign art direction · Social design · Product communication · 3D-led visuals';
    socialLab.scopeAr = 'إخراج الحملة · تصميم سوشيال · تواصل بصري للمنتج · صور ثلاثية الأبعاد';
  }

  if (briefStudio) {
    briefStudio.files = briefStudioFiles;
    briefStudio.eyebrow = 'Studio / Campaign & Social';
    briefStudio.eyebrowAr = 'استوديو / حملات وسوشيال';
    briefStudio.story = 'A set of Brief Studio pieces held together by a restrained red-and-black visual language across different formats.';
    briefStudio.storyAr = 'مجموعة تصميمات لبريف ستوديو تجمعها لغة بصرية حمراء وسوداء واضحة، مع تطبيقها على أكثر من مقاس ونوع محتوى.';
    briefStudio.scope = 'Visual direction · Campaign design · Social content · Adaptations';
    briefStudio.scopeAr = 'اتجاه بصري · تصميم حملات · محتوى سوشيال · تطبيقات متعددة';
  }

  const assigned = new Set([...socialLabFiles, ...briefStudioFiles]);
  if (socialArchive) socialArchive.files = socialArchive.files.filter(f => !assigned.has(f));
  if (bannerArchive) bannerArchive.files = bannerArchive.files.filter(f => !assigned.has(f));

  // Re-render after correcting the project ownership. selected/additional contain
  // references to the same project objects, so the existing interaction layer stays intact.
  renderProjects();
  applyLang();
})();
