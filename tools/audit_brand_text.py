from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance
import pytesseract, json, re

ROOT=Path(__file__).resolve().parents[1]
files=[]
for p in ROOT.iterdir():
    if p.suffix.lower() not in {'.png','.jpg','.jpeg','.webp'}: continue
    n=p.name
    if re.fullmatch(r's\d+\.(png|jpg|jpeg)',n,re.I) or re.fullmatch(r'b\d+\.png',n,re.I) or n.startswith('Artboard') or n in {'العرض.png','01.png','social-lab.png'}:
        files.append(p)

rows=[]
for p in sorted(files,key=lambda x:x.name):
    try:
        im=Image.open(p).convert('RGB')
        im.thumbnail((1400,1400))
        # Whole-frame English OCR. Most brand marks here use Latin names even when the ad copy is Arabic.
        gray=ImageOps.grayscale(im)
        gray=ImageEnhance.Contrast(gray).enhance(1.8)
        text=pytesseract.image_to_string(gray,config='--psm 11',lang='eng')
        clean=' '.join(text.split())
        low=clean.lower()
        rows.append({
            'file':p.name,
            'text':clean[:1200],
            'social_lab': any(k in low for k in ['social lab','sociallab','getsociallab','get social lab']),
            'brief': 'brief' in low,
            'orient': any(k in low for k in ['orient','mega scan','meg a scan','m.e.g.a']),
        })
    except Exception as e:
        rows.append({'file':p.name,'error':str(e)})

out={
  'social_lab':[r['file'] for r in rows if r.get('social_lab')],
  'brief':[r['file'] for r in rows if r.get('brief')],
  'orient':[r['file'] for r in rows if r.get('orient')],
  'rows':rows
}
(ROOT/'brand-text-audit.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:out[k] for k in ['social_lab','brief','orient']},ensure_ascii=False,indent=2))
