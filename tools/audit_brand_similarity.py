from pathlib import Path
from PIL import Image
import cv2, json, numpy as np

ROOT=Path(__file__).resolve().parents[1]
SOCIAL=['s3.png','s4.png','s5.png','s16.png','s20.png','s21.png','s12.png','s15.png']
BRIEF=['s6.png','s8.png','s2.png','s7.png','s22.jpg','s23.jpg','s24.jpg','b3.png','b4.png']

def load(p):
    arr=np.array(Image.open(ROOT/p).convert('RGB'))
    return cv2.cvtColor(arr,cv2.COLOR_RGB2GRAY)

def regions(im):
    h,w=im.shape[:2]
    return [
      im[:max(80,int(h*.34)),:max(100,int(w*.5))],
      im[:max(80,int(h*.34)),int(w*.5):],
      im[:max(80,int(h*.22)),:],
      im,
    ]

def descs(im):
    orb=cv2.ORB_create(nfeatures=1200,scaleFactor=1.2,nlevels=8,edgeThreshold=12,fastThreshold=8)
    out=[]
    for reg in regions(im):
        reg=cv2.resize(reg,(600,max(160,int(600*reg.shape[0]/max(1,reg.shape[1])))))
        k,d=orb.detectAndCompute(reg,None)
        out.append((k,d))
    return out

cache={}
def similarity(a,b):
    for f in (a,b):
        if f not in cache: cache[f]=descs(load(f))
    matcher=cv2.BFMatcher(cv2.NORM_HAMMING)
    best=0
    for ka,da in cache[a]:
      if da is None or len(da)<8: continue
      for kb,db in cache[b]:
        if db is None or len(db)<8: continue
        pairs=matcher.knnMatch(da,db,k=2)
        good=[m for m,n in pairs if m.distance < .72*n.distance]
        score=len(good)/max(12,min(len(da),len(db)))
        best=max(best,score)
    return round(best,4)

def group_report(files):
    pairs=[]
    for i,a in enumerate(files):
      if not (ROOT/a).exists(): continue
      for b in files[i+1:]:
        if not (ROOT/b).exists(): continue
        pairs.append({'a':a,'b':b,'score':similarity(a,b)})
    pairs.sort(key=lambda x:x['score'],reverse=True)
    avg={f:[] for f in files}
    for p in pairs:
      avg[p['a']].append(p['score']);avg[p['b']].append(p['score'])
    cohesion=[{'file':f,'mean_pair_score':round(sum(v)/len(v),4) if v else 0,'max_pair_score':max(v) if v else 0} for f,v in avg.items()]
    cohesion.sort(key=lambda x:x['mean_pair_score'],reverse=True)
    return {'pairs':pairs,'cohesion':cohesion}

report={'social_green':group_report(SOCIAL),'brief_red_black':group_report(BRIEF)}
if (ROOT/'social-lab.png').exists():
    report['social_cover_matches']=sorted([{'file':f,'score':similarity('social-lab.png',f)} for f in SOCIAL if (ROOT/f).exists()],key=lambda x:x['score'],reverse=True)
(ROOT/'brand-similarity-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
