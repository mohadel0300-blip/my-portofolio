from pathlib import Path
from PIL import Image
import colorsys, json

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = []
for p in ROOT.glob('s*.*'):
    if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp'} and p.stem[1:].isdigit():
        CANDIDATES.append(p)
for prefix in ('b','c','p','g'):
    for p in ROOT.glob(f'{prefix}*.*'):
        if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp'} and p.stem[1:].isdigit():
            CANDIDATES.append(p)
for p in ROOT.glob('Artboard*.png'):
    CANDIDATES.append(p)
for name in ['العرض.png','زيادة الأرباح.png','نسبة السلات.png','أرباح السلات.png','إطلالة الفلل.png','تفاصيل الفلل.png','عرض الفلل.png','تصوير المناسبات - رأسي.png','تفاصيل اللقاء.png']:
    p=ROOT/name
    if p.exists(): CANDIDATES.append(p)

seen=set(); ordered=[]
for p in CANDIDATES:
    if p.name not in seen:
        seen.add(p.name); ordered.append(p)

rows=[]
for p in ordered:
    try:
        im=Image.open(p).convert('RGB')
        im.thumbnail((240,240))
        px=list(im.getdata())
        n=max(1,len(px))
        green=red=dark=white=sat=0
        rs=gs=bs=0
        for r,g,b in px:
            rs+=r; gs+=g; bs+=b
            h,s,v=colorsys.rgb_to_hsv(r/255,g/255,b/255)
            deg=h*360
            sat+=s
            if 65 <= deg <= 175 and s >= .28 and v >= .18: green+=1
            if (deg <= 24 or deg >= 338) and s >= .32 and v >= .18: red+=1
            if v <= .24: dark+=1
            if v >= .86 and s <= .16: white+=1
        row={
          'file':p.name,'width':Image.open(p).size[0],'height':Image.open(p).size[1],
          'mean_rgb':[round(rs/n),round(gs/n),round(bs/n)],
          'green_ratio':round(green/n,4),'red_ratio':round(red/n,4),
          'dark_ratio':round(dark/n,4),'white_ratio':round(white/n,4),
          'mean_saturation':round(sat/n,4)
        }
        row['social_lab_score']=round(row['green_ratio']*(0.75+row['mean_saturation']),4)
        row['brief_red_black_score']=round(row['red_ratio']*1.6 + min(row['dark_ratio'],.65)*.55 - row['green_ratio']*.35,4)
        rows.append(row)
    except Exception as e:
        rows.append({'file':p.name,'error':str(e)})

valid=[r for r in rows if 'error' not in r]
report={
 'social_lab_candidates':[r['file'] for r in sorted(valid,key=lambda x:x['social_lab_score'],reverse=True)[:15]],
 'brief_red_black_candidates':[r['file'] for r in sorted(valid,key=lambda x:x['brief_red_black_score'],reverse=True)[:15]],
 'rows':rows
}
(ROOT/'brand-color-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report['social_lab_candidates'],ensure_ascii=False))
print(json.dumps(report['brief_red_black_candidates'],ensure_ascii=False))
