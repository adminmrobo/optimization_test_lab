# 픽셀 표지 cover_01을 코드로 그린다 (16비트 픽셀풍, 원래 격자 480×270 → NEAREST ×4 = 1920×1080 무손실 WebP)
# python3 build/make_cover.py <캐릭터 팩 경로>
import sys,os,math
from PIL import Image,ImageDraw
PACK=sys.argv[1] if len(sys.argv)>1 else '../fruitfly-lab-expressions'
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));OUT=os.path.join(R,'img');os.makedirs(OUT,exist_ok=True)
W,H=480,270
im=Image.new('RGB',(W,H),(246,248,250));d=ImageDraw.Draw(im)
# 벽 · 바닥 (디더링 줄무늬)
for y in range(205,H):
    for x in range(W):
        d.point((x,y),(214,220,228) if (x//8+y//8)%2 else (224,229,235))
d.rectangle([0,203,W,205],fill=(180,188,198))
# 창문(밤하늘)과 별
d.rectangle([14,18,96,92],fill=(120,130,145));d.rectangle([17,21,93,89],fill=(26,36,74))
for sx,sy in [(28,30),(52,26),(80,40),(40,60),(70,70),(86,28),(24,78),(60,48)]:d.point((sx,sy),(255,244,190));d.point((sx+1,sy),(255,244,190))
d.rectangle([17,54,93,55],fill=(120,130,145));d.rectangle([54,21,55,89],fill=(120,130,145))
# 천장 조명
for lx in (160,320):d.rectangle([lx-18,0,lx+18,5],fill=(200,206,214));d.rectangle([lx-14,6,lx+14,8],fill=(255,250,220))
# 화이트보드
bx0,by0,bx1,by1=118,22,362,150
d.rectangle([bx0-4,by0-4,bx1+4,by1+4],fill=(120,128,140));d.rectangle([bx0,by0,bx1,by1],fill=(255,255,255))
d.rectangle([bx0+10,by1+5,bx1-10,by1+8],fill=(150,158,170))
def P(x,y):return (bx0+12+(x+3)/6*(bx1-bx0-24), by1-10-(y+0.2)/3.2*(by1-by0-20))
# 골짜기 바닥 점선
pts=[P(-3+6*i/120,0.3*(-3+6*i/120)**2) for i in range(121)]
for i in range(0,120,4):d.line([pts[i],pts[i+2]],fill=(150,160,175),width=1)
sys.path.insert(0,os.path.join(R,'build'))
import subprocess,json
js="const O=require('%s');const R=O.all(O.TER.valley);console.log(JSON.stringify({x1:R.x1.path,x2:R.x2.path,x3:R.x3.path}))"%os.path.join(R,'build','optmath.js').replace('\\','/')
paths=json.loads(subprocess.run(['node','-e',js],capture_output=True,text=True).stdout)
COL={'x1':(194,61,114),'x2':(11,127,136),'x3':(196,140,0)}
for k,off in (('x1',2),('x2',0),('x3',-2)):
    pp=[P(x,y) for x,y in paths[k]];pp=[(a,b+off) for a,b in pp]
    d.line(pp,fill=COL[k],width=2)
gx,gy=P(2.5,1.875);d.ellipse([gx-6,gy-6,gx+6,gy+6],outline=(22,33,43),width=2)
sx,sy=P(-2.5,2.025);d.ellipse([sx-3,sy-3,sx+3,sy+3],fill=(138,147,156))
# 캐릭터: 바탕 지우기 → 상자 축소 → 색 줄이기 (픽셀풍)
def char(rel,h,flip=False):
    c=Image.open(os.path.join(PACK,'images',rel)).convert('RGBA')
    px=c.load();w0,h0=c.size;bg=px[3,3][:3]
    if px[3,3][3]==255:
        from collections import deque
        seen=set();q=deque([(0,0),(w0-1,0),(0,h0-1),(w0-1,h0-1)])
        while q:
            x,y=q.popleft()
            if (x,y) in seen or not(0<=x<w0 and 0<=y<h0):continue
            seen.add((x,y));r,g,b,a=px[x,y]
            if abs(r-bg[0])+abs(g-bg[1])+abs(b-bg[2])<40:
                px[x,y]=(r,g,b,0);q.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])
    bb=c.getbbox();c=c.crop(bb);s=h/c.size[1];c=c.resize((max(1,round(c.size[0]*s)),h),Image.BOX)
    a=c.getchannel('A').point(lambda v:255 if v>110 else 0);rgb=c.convert('RGB').quantize(48,method=Image.MEDIANCUT).convert('RGB');rgb.putalpha(a)
    return rgb.transpose(Image.FLIP_LEFT_RIGHT) if flip else rgb
def put(c,cx,base):im.paste(c,(int(cx-c.size[0]/2),int(base-c.size[1])),c)
# 그림자
for cx in (176,240,300):d.ellipse([cx-22,214,cx+22,222],fill=(196,202,210))
put(char('x1/E16_proud.png',72),176,220);put(char('x2/E09_thinking.png',72),240,220);put(char('x3/E01_joy.png',58),300,220)
# 문틈(오른쪽): 놀란 하루·시아·모아
d.rectangle([386,36,474,206],fill=(150,120,92));d.rectangle([392,42,468,206],fill=(70,58,50))
put(char('sia/E04_surprise.png',58),410,140);put(char('moa/E24_shock.png',58),450,150);put(char('haru/E04_surprise.png',60),430,206)
# 왼쪽 아래: 박사·주판봇·초파리 (격려)
put(char('doctor/E07_explaining.png',66),40,222);put(char('jupanbot/E01_joy.png',44),108,224);put(char('fruitfly/E12_cheering.png',44),74,266)
im.save(os.path.join(OUT,'cover_01_grid480.png'))
big=im.resize((W*4,H*4),Image.NEAREST);big.save(os.path.join(OUT,'cover_01.webp'),'WEBP',lossless=True)
im.resize((W*2,H*2),Image.NEAREST).save(os.path.join(OUT,'cover_01_960.webp'),'WEBP',lossless=True)
og=im.crop((0,(H-252)//2,480,(H-252)//2+252)).resize((960,504),Image.NEAREST)  # 1.91:1, 정수배 ×2
og.save(os.path.join(OUT,'og_cover.png'))
print('ok',[ (f,os.path.getsize(os.path.join(OUT,f))//1024) for f in os.listdir(OUT)])
