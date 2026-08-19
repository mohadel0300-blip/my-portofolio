from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import pytesseract, json, re

ROOT=Path(__file__).resolve().parents[1]
EXT={'.png','.jpg','.jpeg','.webp'}
files=[]
for p in sorted(ROOT.iterdir(),key=lambda x:x.name.lower()):
    if not p.is_file() or p.suffix.lower() not in EXT or p.name.startswith('MINED'):
        continue
    files.append(p)

patterns={
  'social_lab':[r'social\s*lab',r'getsociallab',r'get\s*social\s*lab'],
  'brief':[r'\bbrief\b',r'brief\s*studio',r'بريف'],
  'class_tech':[r'class\s*tech',r'كلاس\s*تقني'],
  'orient':[r'orient',r'mega\s*scan',r'detectors?',r'gold\s*detector'],
  'clinic_beauty':[r'medical\s*complex',r'clinic',r'dental',r'skin\s*care',r'عياد',r'مجمع',r'طبي',r'طبى',r'الدواء',r'اسنان',r'أسنان',r'ليزر',r'تجميل',r'بشرة',r'هيدرا',r'فيلر',r'بوتكس'],
  'real_estate':[r'real\s*estate',r'property',r'villa',r'فلل',r'فيلا',r'عقار'],
  'perfume':[r'perfume',r'parfum',r'alluriv',r'عطر',r'عطور'],
  'community':[r'dawah',r'community\s*guidance',r'dعوة',r'الدعوة',r'توعية'],
  'ecommerce':[r'e-?commerce',r'salla',r'زد',r'zid',r'سلة',r'متجر',r'مبيعات'],
}

rows=[]
for p in files:
    try:
        im=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
        im.thumbnail((1800,1800),Image.Resampling.LANCZOS)
        texts=[]
        for image in (im, ImageEnhance.Contrast(ImageOps.grayscale(im)).enhance(1.8).filter(ImageFilter.SHARPEN)):
            try:
                texts.append(pytesseract.image_to_string(image,config='--psm 11',lang='eng+ara'))
            except Exception:
                texts.append(pytesseract.image_to_string(image,config='--psm 11',lang='eng'))
        clean=' '.join((' '.join(texts)).split())
        low=clean.lower()
        flags=[name for name,ps in patterns.items() if any(re.search(pat,low,re.I) for pat in ps)]
        rows.append({'file':p.name,'text':clean[:1800],'flags':flags})
    except Exception as e:
        rows.append({'file':p.name,'error':str(e),'flags':[]})

out={'groups':{k:[r['file'] for r in rows if k in r.get('flags',[])] for k in patterns},'rows':rows}
(ROOT/'brand-text-audit.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(out['groups'],ensure_ascii=False,indent=2))
