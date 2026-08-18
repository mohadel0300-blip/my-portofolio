from pathlib import Path
from PIL import Image, ImageOps, ImageFilter
import pytesseract
import re

ROOT = Path('.')
OUT = ROOT / '.review' / 'brand-ocr.txt'
OUT.parent.mkdir(exist_ok=True)
EXTS = {'.png', '.jpg', '.jpeg', '.webp', '.JPG', '.JPEG'}
SKIP = {'MINED.png'}

def clean(text):
    lines = []
    seen = set()
    for raw in text.splitlines():
        s = re.sub(r'\s+', ' ', raw).strip(' |_-—–·•.:,;')
        if len(s) < 2:
            continue
        key = s.casefold()
        if key in seen:
            continue
        seen.add(key)
        lines.append(s)
    return lines

def prep(im):
    im = im.convert('L')
    im = ImageOps.autocontrast(im)
    # enlarge small logos/text without exploding huge images
    w, h = im.size
    scale = 2 if max(w, h) < 2500 else 1
    if scale > 1:
        im = im.resize((w*scale, h*scale), Image.Resampling.LANCZOS)
    im = im.filter(ImageFilter.SHARPEN)
    return im

def ocr(im):
    try:
        return clean(pytesseract.image_to_string(prep(im), lang='eng+ara', config='--psm 11'))
    except Exception as e:
        return [f'[OCR_ERROR {e}]']

files = sorted([p for p in ROOT.iterdir() if p.is_file() and p.suffix in EXTS and p.name not in SKIP], key=lambda p: p.name.casefold())

with OUT.open('w', encoding='utf-8') as f:
    f.write('BRAND LOGO OCR AUDIT\n')
    f.write('Generated from full image + four corner crops.\n\n')
    for path in files:
        try:
            with Image.open(path) as src:
                im = src.convert('RGB')
                w, h = im.size
                cw, ch = max(1, int(w*0.42)), max(1, int(h*0.34))
                regions = {
                    'FULL': im,
                    'TL': im.crop((0, 0, cw, ch)),
                    'TR': im.crop((w-cw, 0, w, ch)),
                    'BL': im.crop((0, h-ch, cw, h)),
                    'BR': im.crop((w-cw, h-ch, w, h)),
                }
                merged = []
                seen = set()
                region_hits = []
                for label, crop in regions.items():
                    hits = ocr(crop)
                    if hits:
                        region_hits.append((label, hits))
                    for s in hits:
                        k = s.casefold()
                        if k not in seen:
                            seen.add(k)
                            merged.append(s)
                f.write(f'=== {path.name} ===\n')
                if merged:
                    f.write('MERGED: ' + ' || '.join(merged[:30]) + '\n')
                    for label, hits in region_hits:
                        f.write(f'{label}: ' + ' || '.join(hits[:12]) + '\n')
                else:
                    f.write('MERGED: [NO_TEXT]\n')
                f.write('\n')
        except Exception as e:
            f.write(f'=== {path.name} ===\nERROR: {e}\n\n')

print(f'Wrote {OUT} for {len(files)} images')
