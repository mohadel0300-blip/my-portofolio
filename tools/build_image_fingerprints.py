from pathlib import Path
from PIL import Image, ImageOps
import json, math

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'image-fingerprints.json'
EXT={'.png','.jpg','.jpeg','.webp'}

def dhash(path, size=16):
    im=ImageOps.exif_transpose(Image.open(path)).convert('L').resize((size+1,size),Image.Resampling.LANCZOS)
    px=list(im.getdata()); bits=[]
    for y in range(size):
        row=y*(size+1)
        for x in range(size): bits.append(1 if px[row+x] > px[row+x+1] else 0)
    n=0
    for b in bits: n=(n<<1)|b
    return f'{n:0{size*size//4}x}'

def ahash(path,size=16):
    im=ImageOps.exif_transpose(Image.open(path)).convert('L').resize((size,size),Image.Resampling.LANCZOS)
    px=list(im.getdata()); avg=sum(px)/len(px); n=0
    for v in px: n=(n<<1)|(1 if v>=avg else 0)
    return f'{n:0{size*size//4}x}'

rows=[]
for p in sorted(ROOT.iterdir(),key=lambda x:x.name.lower()):
    if not p.is_file() or p.suffix.lower() not in EXT or p.name.startswith('MINED'): continue
    try:
        with Image.open(p) as im: w,h=im.size
        rows.append({'file':p.name,'w':w,'h':h,'dhash':dhash(p),'ahash':ahash(p)})
    except Exception as e: rows.append({'file':p.name,'error':str(e)})
OUT.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print('fingerprinted',len(rows),'root images')
