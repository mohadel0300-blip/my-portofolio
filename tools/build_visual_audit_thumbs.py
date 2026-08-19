from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'brand-audit-thumbs'
OUT.mkdir(exist_ok=True)

files=[]
for pattern in ['s*.*','b*.*','Artboard*.png']:
    for p in sorted(ROOT.glob(pattern), key=lambda x:x.name.lower()):
        if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp'} and p not in files:
            files.append(p)
for name in ['العرض.png','زيادة الأرباح.png','نسبة السلات.png','أرباح السلات.png','إطلالة الفلل.png','تفاصيل الفلل.png','عرض الفلل.png','أسعار Full Body.png','أسعار ليزر المناطق.png','أسعار الهيدرافيشيال.png','تصوير المناسبات - رأسي.png','تفاصيل اللقاء.png','01.png']:
    p=ROOT/name
    if p.exists() and p not in files: files.append(p)

for p in files:
    try:
        im=Image.open(p).convert('RGB')
        im.thumbnail((120,120),Image.Resampling.LANCZOS)
        canvas=Image.new('RGB',(120,120),'white')
        canvas.paste(im,((120-im.width)//2,(120-im.height)//2))
        canvas.save(OUT/(p.name+'.jpg'),'JPEG',quality=28,optimize=True)
    except Exception as e:
        print('failed',p,e)
print('generated',len(files),'audit thumbs')
