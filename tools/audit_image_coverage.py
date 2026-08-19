from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[1]
exts={'.png','.jpg','.jpeg','.webp','.svg'}
root_images=[p.name for p in ROOT.iterdir() if p.is_file() and p.suffix.lower() in exts and not p.name.startswith('MINED')]
text=''
for name in ['redesign-v2.js','brand-project-groups.js','index.html']:
    p=ROOT/name
    if p.exists(): text+='\n'+p.read_text(encoding='utf-8',errors='ignore')
refs=set(re.findall(r"[\"']([^\"']+\.(?:png|jpg|jpeg|webp|svg))[\"']",text,re.I))
# only root basenames, ignore generated web paths
refs={Path(r).name for r in refs if not r.startswith('web/')}
unmapped=sorted(set(root_images)-refs,key=str.lower)
mapped=sorted(set(root_images)&refs,key=str.lower)
report={'root_images':len(root_images),'mapped_count':len(mapped),'unmapped_count':len(unmapped),'unmapped':unmapped,'mapped':mapped}
(ROOT/'image-coverage-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
