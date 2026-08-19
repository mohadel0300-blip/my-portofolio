from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'brand-audit-contact-sheet.pdf'

# Visual audit source: inspect brand/logo/content relationships, never group by colour alone.
files=[]
for pattern in ['s*.*','b*.*','Artboard*.png','*.jpg','*.JPG']:
    for p in sorted(ROOT.glob(pattern), key=lambda x:x.name.lower()):
        if p.suffix.lower() not in {'.png','.jpg','.jpeg','.webp'}: continue
        if p.name.startswith('MINED') or p.name.startswith('ai') or p.name.startswith('h') or p.name.startswith('g') or p.name.startswith('p') or p.name.startswith('c'): continue
        if p not in files: files.append(p)
for name in ['العرض.png','زيادة الأرباح.png','نسبة السلات.png','أرباح السلات.png','إطلالة الفلل.png','تفاصيل الفلل.png','عرض الفلل.png','أسعار Full Body.png','أسعار ليزر المناطق.png','أسعار الهيدرافيشيال.png','تصوير المناسبات - رأسي.png','تفاصيل اللقاء.png','01.png']:
    p=ROOT/name
    if p.exists() and p not in files: files.append(p)

W,H=1600,2200
cols,rows=3,4
margin=50
gap=28
cell_w=(W-margin*2-gap*(cols-1))//cols
cell_h=(H-margin*2-gap*(rows-1))//rows
label_h=52
font=ImageFont.load_default()
pages=[]

for start in range(0,len(files),cols*rows):
    page=Image.new('RGB',(W,H),'white')
    draw=ImageDraw.Draw(page)
    batch=files[start:start+cols*rows]
    for i,p in enumerate(batch):
        r=i//cols;c=i%cols
        x=margin+c*(cell_w+gap);y=margin+r*(cell_h+gap)
        box_h=cell_h-label_h
        try:
            im=Image.open(p).convert('RGB')
            im.thumbnail((cell_w-12,box_h-12),Image.Resampling.LANCZOS)
            frame=Image.new('RGB',(cell_w,box_h),(242,242,244))
            frame.paste(im,((cell_w-im.width)//2,(box_h-im.height)//2))
            page.paste(frame,(x,y))
        except Exception:
            draw.rectangle((x,y,x+cell_w,y+box_h),outline='red',width=3)
        label=p.name.encode('ascii','backslashreplace').decode('ascii')
        draw.text((x+4,y+box_h+12),f'{start+i+1:02d}  {label}',fill='black',font=font)
    pages.append(page)

if pages:
    pages[0].save(OUT,'PDF',resolution=110.0,save_all=True,append_images=pages[1:])
print(f'Wrote {OUT} with {len(files)} files across {len(pages)} pages')
