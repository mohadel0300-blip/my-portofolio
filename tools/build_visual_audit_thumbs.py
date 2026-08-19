from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'brand-audit-thumbs'
OUT.mkdir(exist_ok=True)
PDF=ROOT/'brand-audit-contact-sheet.pdf'

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
    except Exception as e: print('failed',p,e)

W,H=1600,2200; cols,rows=3,4; margin=44; gap=24; label_h=46
cw=(W-margin*2-gap*(cols-1))//cols; ch=(H-margin*2-gap*(rows-1))//rows
font=ImageFont.load_default(); pages=[]
for start in range(0,len(files),cols*rows):
    page=Image.new('RGB',(W,H),'white'); d=ImageDraw.Draw(page)
    for i,p in enumerate(files[start:start+cols*rows]):
        r,c=divmod(i,cols); x=margin+c*(cw+gap); y=margin+r*(ch+gap); ih=ch-label_h
        try:
            im=Image.open(p).convert('RGB'); im.thumbnail((cw-12,ih-12),Image.Resampling.LANCZOS)
            frame=Image.new('RGB',(cw,ih),(244,244,246)); frame.paste(im,((cw-im.width)//2,(ih-im.height)//2)); page.paste(frame,(x,y))
        except Exception: d.rectangle((x,y,x+cw,y+ih),outline='red',width=3)
        label=p.name.encode('ascii','backslashreplace').decode('ascii')
        d.text((x+4,y+ih+12),label,fill='black',font=font)
    pages.append(page)
if pages: pages[0].save(PDF,'PDF',resolution=110,save_all=True,append_images=pages[1:])
print('generated',len(files),'audit thumbs and',len(pages),'PDF pages')
