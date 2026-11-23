# 캐릭터 팩(fruitfly-lab-expressions)에서 쓸 표정만 골라 96px WebP로 줄여 build/sprites96.js를 만든다.
# python3 build/make_sprites.py <캐릭터 팩 경로>
import sys,base64,io,json,subprocess,os
from PIL import Image
PACK=sys.argv[1] if len(sys.argv)>1 else '../fruitfly-lab-expressions'
DIR={'doc':'doctor','asst':'haru','fly':'fruitfly','robo':'jupanbot','sia':'sia','moa':'moa','x1':'x1','x2':'x2','x3':'x3'}
PICK={'doc':['E07','E12','E16','E09','E01','E19','E14','E10'],
      'asst':['E04','E24','E19','E09','E01','E13','E16'],
      'fly':['E09','E07','E10','E12','E13','E04'],
      'robo':['E01','E16','E24','E15','E14','E07','E04'],
      'sia':['E04','E24','E19','E01','E09','E13'],
      'moa':['E04','E24','E19','E01','E09','E13'],
      'x1':['E13','E16','E09','E01','E04','E15'],'x2':['E13','E16','E09','E01','E04','E15'],'x3':['E13','E16','E09','E01','E04','E15']}
S={};
for who,ids in PICK.items():
  d=os.path.join(PACK,'images',DIR[who])
  for i in ids:
    fn=sorted([f for f in os.listdir(d) if f.startswith(i+'_') and f.endswith('.png')],key=len)[0]
    im=Image.open(os.path.join(d,fn)).convert('RGBA').resize((96,96),Image.LANCZOS)
    b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6)
    S[who+'_'+i.lower()]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
rev=subprocess.run(['git','-C',PACK,'rev-parse','--short','HEAD'],capture_output=True,text=True).stdout.strip()
js='/* 캐릭터 팩 https://github.com/adminmrobo/fruitfly-lab-expressions @ %s, 96px, %d장 */\nvar SPRITE=%s;\n'%(rev,len(S),json.dumps(S))
open(os.path.join(os.path.dirname(__file__),'sprites96.js'),'w').write(js)
print(len(S),'sprites',round(len(js)/1024),'KB')
