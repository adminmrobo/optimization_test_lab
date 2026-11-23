(function(){
'use strict';
var $=U.$,$$=U.$$,fmt=U.fmt,cssv=U.cssv;
function V(cv,draw,anim){var o={dirty:true};U.reg(cv,function(dt){if(anim&&dt>0)anim(dt);if(o.dirty||dt===0){draw();o.dirty=false;}});return o;}
function rng(id,vid,fv,cb){var r=$('#'+id);r.oninput=function(){$('#'+vid).textContent=fv(+r.value);cb(+r.value);};return +r.value;}
function lin(x0,x1,f,n){var o=[];n=n||160;for(var i=0;i<=n;i++){var x=x0+(x1-x0)*i/n;o.push([x,f(x)]);}return o;}
var f=OM.C.f,d=OM.C.d,RC={x1:'--r1',x2:'--r2',x3:'--r3'},RN={x1:'X1 · 바닐라',x2:'X2 · 모멘텀',x3:'X3 · Adam'},RM={x1:'바닐라 SGD',x2:'모멘텀',x3:'Adam'};
function rc(k){return cssv(RC[k]);}

/* ── 대사 ── */
var DLG={
 pro:[["asst","asst_e09","밤 11시인데 연구실 불이 켜져 있어요. 누가 남아 있나 봐요."],
   ["sia","sia_e04","화이트보드 앞에 셋이나 있어요! 실루엣만 보이는데… 굽은 골짜기를 그려 놓고 공을 굴리고 있어요."],
   ["x1","x1_e13","쉿. 아직 정식 공개 전이라서요. 미분의 네 가지 뜻부터 하나씩 연습하는 중이에요."],
   ["moa","moa_e24","잠깐만요, 저 셋… 우리보다 잘하는 거 아니에요? 저 식을 손으로 풀고 있어요."],
   ["x2","x2_e09","숨어서 보지 말고 같이 해요. 처음부터 천천히 보여 줄게요."]],
 map:[["doc","doc_e07","공장에서 기계 설정값을 고칠 때, 지금 값에서 어느 쪽으로 얼마나 돌릴지 어떻게 정할까요? X1·X2·X3의 연습은 그 질문의 답을 네 조각으로 나눈 거예요."],
   ["fly","fly_e07","네 조각을 다 모으면 한 걸음 규칙이 되고, 그 규칙을 조금씩 바꾼 게 경주의 세 걸음법이야."]],
 p1a:[["doc","doc_e07","산에 안개가 끼면 지도가 소용없어요. 그때 무엇을 믿고 내려갈까요?"],
   ["x1","x1_e16","발밑이요. 곡선의 한 점에 자를 살짝 대면 그게 접선이고, 접선이 기운 반대쪽이 내리막이에요."],
   ["sia","sia_e04","자를 대는 것만으로요? X1, 그거 언제 배웠어요?"]],
 p1t:[["doc","doc_e09","x를 2.0에서 −2까지 옮겨 보세요. 기울기의 부호가 바뀌는 곳이 있나요?"],
   ["robo","robo_e01","기울기가 클수록 바닥에서 멀다는 뜻이지! 기울기만 보면 거리도 알 수 있어."],
   ["fly","fly_e09","정말? 슬라이더를 0.0에 둬 봐. 기울기는 −3인데, 바닥(x = 1)까지 거리는 1이야."],
   ["asst","asst_e19","x = 2는 기울기 9, x = 0은 −3인데 둘 다 바닥에서 1만큼 떨어져 있어요. 기울기는 거리를 못 알려 주네요."]],
 p1z:[["doc","doc_e16","업무 말로 바꾸면 \"설정값을 조금 올리면 불량률이 오르는 중이니 내려야 한다\"입니다. 기울기는 방향을 정하는 근거예요. 여기서 한 번 멈춰도 괜찮아요. 이 9가 어디서 왔는지는 연습 2에서 봅니다."]],
 p2a:[["doc","doc_e07","자동차 계기판의 \"지금 속도\"는 어떻게 잴까요? 한 시간을 기다릴 수는 없잖아요."],
   ["x2","x2_e09","간격을 줄이면 돼요. 1초, 0.1초, 0.01초… 두 점 사이 평균 기울기가 어디로 다가가는지 보면 그게 그 순간의 변화율이에요."],
   ["moa","moa_e04","16, 12.25, 9.61… 정말 9로 모여요! 이건 어디에 써요?"],
   ["x2","x2_e16","기울기를 잘못 계산하는 실수를 잡을 때요. 공식으로 구한 값과 이 방법으로 잰 값이 다르면 어딘가 틀린 거예요."]],
 p2t:[["doc","doc_e09","Δx를 1에서 0.01까지 차례로 눌러 보세요. 평균 변화율과 9의 차이가 어떻게 줄어드나요?"],
   ["robo","robo_e16","Δx = 1이면 16이니까, x = 2의 기울기는 16이야. 한 번 재면 끝!"],
   ["fly","fly_e09","간격이 넓으면 굽이를 뭉개. 0.1과 0.01도 눌러서 값이 어디로 가는지 봐야 해."],
   ["asst","asst_e01","차이가 7 → 3.25 → 1.24 → 0.61 → 0.06이에요. 간격을 10분의 1로 줄이면 차이도 거의 10분의 1이 돼요."]],
 p2z:[["doc","doc_e16","업무 말로는 \"이 숫자가 지금 얼마나 빨리 변하고 있나\"입니다. 평균이 아니라 지금 이 순간이라는 점이 중요해요. 처음엔 다들 극한에서 오래 머뭅니다. 괜찮아요."]],
 p3a:[["doc","doc_e07","매출 곡선에서 증가가 멈춘 달을 찾았다면, 그 달은 최고점일까요, 최저점일까요?"],
   ["x3","x3_e09","둘 다일 수 있어요! 기울기 0인 곳을 찾고 양옆 기울기의 부호를 봐요. +에서 −면 꼭대기, −에서 +면 바닥."],
   ["asst","asst_e24","X3가 증가·감소 표를 머릿속으로 그렸어요… 저보다 빨라요!"]],
 p3t:[["doc","doc_e09","슬라이더로 기울기가 0이 되는 자리를 두 군데 찾아보세요. 두 곳의 높이를 비교해 볼까요?"],
   ["robo","robo_e16","x = −1에서 기울기 0 발견! 여기가 최저점이야. 보고서 끝."],
   ["fly","fly_e09","높이가 5야. x = 1의 높이 1보다 높은데 최저점이라고? 양옆을 디뎌 봐."]],
 p3z:[["doc","doc_e16","업무 말로 바꾸면 \"증가가 멈췄다\"는 신호는 정점일 수도, 바닥일 수도 있다는 뜻입니다. 기울기 0은 멈출 후보이지 결론이 아니에요."]],
 p4a:[["doc","doc_e07","처음 가는 동네에서 길을 물었더니 \"저쪽\"이라고만 합니다. 얼마나 걸어가야 할까요?"],
   ["x1","x1_e16","조금만요! 조금 움직이면 높이 변화가 \"기울기 × 움직인 양\"과 거의 같거든요."],
   ["x3","x3_e01","그 근사가 맞는 동안만 믿고 한 걸음 가고, 다시 기울기를 재요. 그게 경사하강이에요! x ← x − η × 기울기."],
   ["sia","sia_e24","셋이서 식을 이어 말했어요… 연습을 얼마나 한 거예요?"]],
 p4t:[["doc","doc_e09","(나)에서 보폭 η를 0.1부터 0.4까지 차례로 눌러 보세요. 걸음이 어떻게 달라지나요?"],
   ["robo","robo_e01","보폭이 클수록 빨리 도착하지! 0.4가 최고야."],
   ["fly","fly_e09","그럴까? 0.4를 눌러서 x가 어디로 가는지 표를 봐."],
   ["asst","asst_e04","0.1은 차근차근, 0.2는 세 걸음 만에 바닥 근처, 0.3은 바닥을 사이에 두고 왔다 갔다… 0.4는 반대편 절벽으로 떨어졌어요!"]],
 p4z:[["doc","doc_e16","업무 말로는 \"학습률은 빠르기와 안전 사이의 거래\"입니다. 실무에서 학습이 갑자기 망가지면 가장 먼저 보폭을 의심하세요."]],
 p5a:[["doc","doc_e07","좁고 굽은 협곡의 출구까지 셋이 동시에 출발합니다. 누가 먼저 도착할까요?"],
   ["x1","x1_e09","저는 기본기만 써요. 기울기 반대로 η만큼."],
   ["x2","x2_e16","저는 굴러가는 공처럼 앞 걸음 속도를 이어 받아요."],
   ["x3","x3_e01","저는 방향마다 보폭을 바꿔요. 가파른 벽 쪽은 작게, 완만한 바닥길은 크게!"]],
 p5t:[["doc","doc_e09","경주를 시작하기 전에 순위를 맞혀 보세요. 그리고 X1의 첫 몇 걸음이 어느 쪽으로 움직이는지 보세요."],
   ["robo","robo_e16","Adam이 1등이면 Adam이 제일 좋은 걸음법이야. 이걸로 결론 끝!"],
   ["fly","fly_e09","이 골짜기 하나로? 연습 6에서 지형과 보폭을 바꿔 보고 말하자."]],
 p5z:[["moa","moa_e24","X3가 60걸음, X2가 118걸음… X1은 430걸음이에요. 셋 다 같은 기울기를 보는데 이렇게 달라요?"],
   ["fly","fly_e12","셋 다 잘했어. 바닐라도 튕기지 않고 끝까지 갔잖아. 느린 이유는 실력이 아니라, 이 지형에서는 작은 보폭밖에 못 쓰기 때문이야."],
   ["doc","doc_e16","해석 문장으로 바꾸면 \"방향마다 가파름이 크게 다른 문제에서는 보폭을 방향마다 맞추는 걸음법이 유리하다\"입니다. 이 지형에서는 그렇다는 뜻이에요."]],
 p6a:[["doc","doc_e07","이제 여러분 차례예요. 지형은 데이터가 정하고, 보폭은 여러분이 정합니다. 미션 세 개를 풀어 보세요."],
   ["x2","x2_e01","힌트를 하나 줄게요. 순위는 생각보다 쉽게 뒤집혀요."]],
 duel0:[["robo","robo_e16","연습 5 봤지? Adam 60걸음, 바닐라 430걸음. Adam이 언제나 1등이야."],
   ["fly","fly_e09","\"언제나\"는 큰 말이야. 설정은 그대로 두고 지형만 세 가지로 바꿔서 돌려 보자."]],
 outro:[["sia","sia_e19","X1, X2, X3… 대체 언제부터 이렇게 연습한 거예요?"],
   ["x3","x3_e16","매일 밤 한 걸음씩요. 보폭은 눈치껏!"],
   ["robo","robo_e14","걸음 수 세는 건 내가 도와줬지. X1의 430걸음을 세다가 주판알이 다 닳았어."],
   ["fly","fly_e12","셋 다 훌륭해. 무엇보다 순위가 뒤집히는 조건까지 찾아낸 게 진짜 실력이야."],
   ["doc","doc_e01","오늘의 세 줄입니다.<br>① 기울기는 방향, 변화율은 가파름, 기울기 0은 멈출 후보, 작은 증분은 보폭을 작게 잡는 이유.<br>② 걸음법의 순위는 지형과 보폭이 함께 정한다.<br>③ 결과가 좋아 보여도 걸음의 크기와 조건을 확인한다."],
   ["doc","doc_e14","그리고 X1·X2·X3. 이 정도면 대학원 입학 면접 질문 하나는 이미 통과예요. 원서는… 이름 공란부터 채워 오면 받아 줄게요."],
   ["asst","asst_e01","그럼 저는 연습 6 미션부터 다시 해 볼래요. 순위 뒤집기, 이번엔 제가 먼저 찾을 거예요!"]]
};
U.dialogues(DLG);
var CAST=[["doc","doc_e07","박사","연구실의 선생님. 세 사람의 연습을 격려하고 큰 그림과 해석을 맡아요."],
 ["asst","asst_e09","조수 하루","수식이 나오면 대신 물어보는 사람. \"식으로는요?\" 담당."],
 ["sia","sia_e13","인턴 시아","\"왜요?\"를 묻는 인턴. 몰래 연습을 처음 발견했어요."],
 ["moa","moa_e13","인턴 모아","\"어디에 써요?\"를 묻는 인턴. 실력에 가장 크게 놀라요."],
 ["robo","robo_e01","주판봇","걸음 수를 세는 계산 로봇. 결론을 너무 빨리 내곤 해요."],
 ["fly","fly_e09","초파리 연구원","비유와 의심 담당. \"정말 그럴까?\"를 묻는 연구원."],
 ["x1","x1_e13","미공개 X1 · 리본","정체를 숨긴 신입. 경주에서는 기본기에 충실한 바닐라 SGD."],
 ["x2","x2_e13","미공개 X2 · 모자","안경 쓴 신입. 경주에서는 관성을 싣는 모멘텀."],
 ["x3","x3_e13","미공개 X3 · 꼬마","가장 작은 신입. 경주에서는 보폭 눈치가 빠른 Adam."]];
$('#castgrid').innerHTML=CAST.map(function(c){var cc=c[0].charAt(0)==='x'?'var(--c-x)':'var(--c-'+c[0]+')';return '<div class="castc" style="--cc:'+cc+'"><img src="'+U.spr(c[1])+'" alt="" aria-hidden="true"><div><b>'+c[2]+'</b><p>'+c[3]+'</p></div></div>';}).join('');
U.fillImgs();

/* ── 경주 결과 (기본 설정) ── */
var RV=OM.all(OM.TER.valley);
$('#k3').textContent=RV.x3.steps+'걸음';$('#k2').textContent=RV.x2.steps+'걸음';$('#k1').textContent=RV.x1.steps+'걸음';

/* ── 지형 그리기 (2차원 지도: 색이 진할수록 낮음) ── */
var DX=[-3,3],DY=[-0.6,3.2],HC={};
function geo(w,h,m){m=m==null?6:m;return {X:function(x){return m+(x-DX[0])/(DX[1]-DX[0])*(w-2*m);},Y:function(y){return h-m-(y-DY[0])/(DY[1]-DY[0])*(h-2*m);},m:m};}
function heat(key,w,h){var id=key+'|'+w+'|'+h;if(HC[id])return HC[id];var T=OM.TER[key],c=document.createElement('canvas'),dpr=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);var g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
  var G=geo(w,h),cs=5,FM=0,vals=[],x,y,i,j;
  for(j=0;j*cs<h;j++){vals.push([]);for(i=0;i*cs<w;i++){x=DX[0]+(i*cs+cs/2-G.m)/(w-2*G.m)*(DX[1]-DX[0]);y=DY[0]+(h-G.m-(j*cs+cs/2))/(h-2*G.m)*(DY[1]-DY[0]);var v=T.f(x,y);vals[j].push(v);if(v>FM)FM=v;}}
  var LF=Math.log(1+FM);for(j=0;j<vals.length;j++)for(i=0;i<vals[j].length;i++){g.fillStyle=U.cmap(Math.log(1+vals[j][i])/LF,0.34);g.fillRect(i*cs,j*cs,cs,cs);}
  g.setLineDash([6,5]);g.lineWidth=1.6;g.strokeStyle='rgba(255,255,255,.95)';g.beginPath();
  if(key==='valley'){for(i=0;i<=120;i++){x=DX[0]+(DX[1]-DX[0])*i/120;var yy=T.floor(x);i?g.lineTo(G.X(x),G.Y(yy)):g.moveTo(G.X(x),G.Y(yy));}}
  else if(key==='ravine'){g.moveTo(G.X(DX[0]),G.Y(T.m[1]));g.lineTo(G.X(DX[1]),G.Y(T.m[1]));}
  g.stroke();g.setLineDash([]);HC[id]=c;return c;}
function terrain(cv,key,runs,upto,opt){opt=opt||{};var R=U.setup(cv),g=R.g,w=R.w,h=R.h,T=OM.TER[key],G=geo(w,h);g.drawImage(heat(key,w,h),0,0,w,h);
  var s=T.s,mm=T.m;g.beginPath();g.arc(G.X(s[0]),G.Y(s[1]),5,0,7);g.fillStyle='#8a939c';g.fill();
  var rr=Math.max(6,OM.TOL/(DX[1]-DX[0])*(w-12));g.beginPath();g.arc(G.X(mm[0]),G.Y(mm[1]),rr,0,7);g.lineWidth=2.4;g.strokeStyle='#ffffff';g.stroke();g.lineWidth=1;g.strokeStyle='#16212b';g.stroke();
  Object.keys(runs).forEach(function(k){var r=runs[k],P=r.path,n=upto==null?P.length-1:Math.min(upto,P.length-1),col=rc(k);g.strokeStyle=col;g.lineWidth=opt.lw||2.2;g.beginPath();
    for(var i=0;i<=n;i++){var px=Math.max(-50,Math.min(w+50,G.X(P[i][0]))),py=Math.max(-50,Math.min(h+50,G.Y(P[i][1])));i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();
    var q=P[n],qx=G.X(q[0]),qy=G.Y(q[1]);
    if(r.out&&n===P.length-1){qx=Math.max(10,Math.min(w-10,qx));qy=Math.max(10,Math.min(h-10,qy));g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(qx-6,qy-6);g.lineTo(qx+6,qy+6);g.moveTo(qx+6,qy-6);g.lineTo(qx-6,qy+6);g.stroke();}
    else{g.beginPath();g.arc(qx,qy,opt.dot||5,0,7);g.fillStyle=col;g.fill();g.lineWidth=1.6;g.strokeStyle='#fff';g.stroke();}});
  if(opt.stamp!==false)U.stamp(g,w,'설명용 예시');}

/* 표지 그림판 */
V($('#coverCv'),function(){terrain($('#coverCv'),'valley',RV,null,{lw:3,dot:7,stamp:false});});

/* ── 연습 1: 접선 ── */
var x1v=2;
var v1=V($('#cv1'),function(){var x0=x1v,s=d(x0),y0=f(x0),tg=lin(x0-1.1,x0+1.1,function(x){return y0+s*(x-x0);},40).map(function(p){return [p[0],(p[1]<-2||p[1]>14)?NaN:p[1]];});
  var P=U.plot($('#cv1'),{xr:[-2.2,2.6],yr:[-2,14],xt:[-2,-1,0,1,2],yt:[0,4,8,12],xl:'x (서 있는 자리)',yl:'높이 f(x)',
    series:[{pts:lin(-2.2,2.6,f),color:cssv('--terrain'),width:2.6},{pts:tg,color:cssv('--amber'),width:2.2,dash:[6,4]}],stamp:'설명용 예시'});
  var px=P.X(x0),py=P.Y(y0);P.g.beginPath();P.g.arc(px,py,6,0,7);P.g.fillStyle=cssv('--eye');P.g.fill();
  if(Math.abs(s)>1e-9){var dir=s>0?-1:1;U.arrow2(P.g,px,py+18,px+dir*46,py+18,cssv('--gfp'),2.6);U.label(P.g,px+dir*50,py+18,'내리막',cssv('--gfp'),dir<0?'right':'left');}
  U.label(P.g,x0>1.2?px-12:px+12,py-22,'접선 기울기 '+fmt(s,2),cssv('--amber'),x0>1.2?'right':'left');});
function up1(){var s=d(x1v),y0=f(x1v),b=y0-s*x1v;$('#m1a').textContent=fmt(y0,3);$('#m1b').textContent=fmt(s,2);$('#m1c').textContent=Math.abs(s)<1e-9?'평지(멈춤)':s>0?'← 왼쪽':'오른쪽 →';
  $('#m1d').textContent='y = '+fmt(s,2)+'x '+(b<0?'− '+fmt(-b,2):'+ '+fmt(b,2));
  var it=[];if(Math.abs(x1v-2)<1e-9)it.push(['m','x = 2: 높이 5, 기울기 9. 오른쪽으로 가면 가파르게 오르니 내리막은 왼쪽입니다.']);
  else if(Math.abs(s)<1e-9)it.push(['g','기울기 0 — 발밑이 평평합니다. 여기가 꼭대기인지 바닥인지는 연습 3에서 가립니다.']);
  else it.push([s>0?'a':'g','x = '+fmt(x1v,1)+': 기울기 '+fmt(s,2)+'. '+(s>0?'양수라 오른쪽이 오르막, 왼쪽이 내리막':'음수라 오른쪽이 내리막')+'입니다.']);
  it.push(['m','기울기의 크기는 "얼마나 가파른가"이지 "바닥까지 얼마나 먼가"가 아닙니다.']);U.ins($('#i1'),it);v1.dirty=true;}
rng('r1','v1',function(v){return v.toFixed(1);},function(v){x1v=Math.round(v*10)/10;up1();});up1();

/* ── 연습 2: 변화율 ── */
var H2=[1,0.5,0.2,0.1,0.01],h2=1;
var v2=V($('#cv2'),function(){var a=[2,f(2)],b=[2+h2,f(2+h2)],m=(b[1]-a[1])/h2,sec=lin(1.2,3.15,function(x){return a[1]+m*(x-2);},20).map(function(p){return [p[0],(p[1]<-2||p[1]>24)?NaN:p[1]];});
  var P=U.plot($('#cv2'),{xr:[0.5,3.2],yr:[-2,24],xt:[1,1.5,2,2.5,3],yt:[0,5,10,15,20],xl:'x',yl:'높이',
    series:[{pts:lin(0.5,3.2,f),color:cssv('--terrain'),width:2.6},{pts:lin(1.2,3.15,function(x){return 5+9*(x-2);},10).map(function(p){return [p[0],p[1]<-2||p[1]>24?NaN:p[1]];}),color:'rgba(22,33,43,.4)',width:1.6,dash:[4,4]},{pts:sec,color:cssv('--stain'),width:2.4}],stamp:'설명용 예시'});
  var g=P.g;g.strokeStyle=cssv('--amber');g.lineWidth=2;g.setLineDash([]);g.beginPath();g.moveTo(P.X(2),P.Y(a[1]));g.lineTo(P.X(2+h2),P.Y(a[1]));g.lineTo(P.X(2+h2),P.Y(b[1]));g.stroke();
  [a,b].forEach(function(p,i){g.beginPath();g.arc(P.X(p[0]),P.Y(p[1]),5.5,0,7);g.fillStyle=i?cssv('--stain'):cssv('--eye');g.fill();});
  if(h2>=0.2){U.label(g,P.X(2+h2/2),P.Y(a[1])+14,'Δx = '+h2,cssv('--amber'),'center');U.label(g,P.X(2+h2)+6,P.Y((a[1]+b[1])/2),'Δy = '+fmt(b[1]-a[1],3),cssv('--amber'));}
  U.label(g,P.X(0.6),P.Y(21),'보라 실선: 두 점을 잇는 직선 · 회색 점선: x = 2의 접선(기울기 9)',cssv('--muted'));});
function up2(){var dy=f(2+h2)-f(2),r=dy/h2;$('#m2a').textContent=h2;$('#m2b').textContent=fmt(dy,h2<0.1?6:4);$('#m2c').textContent=+r.toFixed(4);
  U.ins($('#i2'),[['m','Δx = '+h2+': 평균 변화율 '+(+r.toFixed(4))+', 9와의 차이 '+(+(r-9).toFixed(4))+'.'],['g',h2<=0.01?'간격이 0.01이면 9.0601 — 사실상 접선의 기울기 9와 같습니다. 이 다가가는 값이 미분입니다.':'간격을 더 줄여 보세요. 보라 실선이 회색 접선에 붙어 갑니다.']]);v2.dirty=true;}
U.btns($('#b2'),H2.map(function(h){return [h,String(h)];}),h2,function(v){h2=v;up2();});up2();

/* ── 연습 3: 기울기 0 ── */
var x3v=0,seen3={};
var v3=V($('#cv3'),function(){var P=U.plot($('#cv3'),{xr:[-2.2,2.6],yr:[-4,15],xt:[-2,-1,0,1,2],yt:[-4,0,4,8,12],xl:'x',yl:'높이 · 기울기',
    series:[{pts:lin(-2.2,2.6,f),color:cssv('--terrain'),width:2.6,name:'높이 f(x)'},{pts:lin(-2.2,2.6,function(x){var v=d(x);return v>15?NaN:v;}),color:cssv('--amber'),width:2,dash:[6,4],name:'기울기 f′(x)',ndy:14}],
    hlines:[{y:0,color:'rgba(22,33,43,.45)',label:'기울기 0',left:true,dash:[2,3]}],
    vlines:Object.keys(seen3).map(function(k){return {x:+k,color:cssv(+k<0?'--eye':'--gfp'),label:+k<0?'꼭대기':'바닥',dy:+k<0?0:20};}),stamp:'설명용 예시'});
  var g=P.g;g.beginPath();g.arc(P.X(x3v),P.Y(f(x3v)),6,0,7);g.fillStyle=cssv('--eye');g.fill();g.beginPath();g.arc(P.X(x3v),P.Y(d(x3v)),5,0,7);g.fillStyle=cssv('--amber');g.fill();});
function up3(){var s=d(x3v),l=d(x3v-0.1),r=d(x3v+0.1),z=Math.abs(s)<1e-6;$('#m3a').textContent=fmt(f(x3v),3);$('#m3b').textContent=fmt(z?0:s,2);$('#m3c').textContent=fmt(l,2)+' · '+fmt(r,2);
  var j=z?(l>0&&r<0?'꼭대기 (극대)':'바닥 (극소)'):(s>0?'오르막':'내리막');$('#m3d').textContent=j;
  var it=[];if(z){seen3[x3v]=1;it.push([x3v<0?'r':'g','기울기 0을 찾았습니다! 왼쪽 '+fmt(l,2)+', 오른쪽 '+fmt(r,2)+' → '+j+'. 높이 '+fmt(f(x3v),0)+'.']);}
  else it.push(['m','기울기 '+fmt(s,2)+'. 주황 점선(기울기)이 가로 0선과 만나는 자리를 찾아 슬라이더를 옮겨 보세요.']);
  if(Object.keys(seen3).length===2)it.push(['a','두 자리를 모두 찾았습니다. 기울기 0은 두 곳, 바닥은 x = 1 하나뿐입니다.']);U.ins($('#i3'),it);v3.dirty=true;}
rng('r3','v3',function(v){return v.toFixed(1);},function(v){x3v=Math.round(v*10)/10;up3();});up3();

/* ── 연습 4 (가) 작은 증분 근사 ── */
var H4=[0.5,0.2,0.1,0.05],h4=0.1;
var v4a=V($('#cv4a'),function(){var P=U.plot($('#cv4a'),{xr:[1.8,2.65],yr:[3,13],xt:[1.8,2,2.2,2.4,2.6],yt:[4,6,8,10,12],xl:'x',yl:'높이',
    series:[{pts:lin(1.8,2.65,f),color:cssv('--terrain'),width:2.6,name:'곡선 (실제)',ndy:-14},{pts:lin(1.8,2.65,function(x){return 5+9*(x-2);}),color:cssv('--amber'),width:2,dash:[6,4],name:'접선 (근사)',ndy:16}],stamp:'설명용 예시'});
  var g=P.g,xa=2+h4,ya=f(xa),yt=5+9*h4;g.lineWidth=3;g.strokeStyle=cssv('--eye');g.beginPath();g.moveTo(P.X(xa)+6,P.Y(yt));g.lineTo(P.X(xa)+6,P.Y(ya));g.stroke();
  g.beginPath();g.arc(P.X(2),P.Y(5),6,0,7);g.fillStyle=cssv('--stain');g.fill();g.beginPath();g.arc(P.X(xa),P.Y(ya),5,0,7);g.fillStyle=cssv('--terrain');g.fill();g.beginPath();g.arc(P.X(xa),P.Y(yt),5,0,7);g.fillStyle=cssv('--amber');g.fill();
  U.label(g,P.X(xa)+12,P.Y((ya+yt)/2),'틀린 양 '+fmt(ya-yt,4),cssv('--eye'));});
function up4a(){var a=9*h4,t=f(2+h4)-5,e=t-a;$('#m4a').textContent=+a.toFixed(4);$('#m4b').textContent=+t.toFixed(6);$('#m4c').textContent=+e.toFixed(6);$('#m4d').textContent=(e/t*100).toFixed(1)+'%';
  U.ins($('#i4a'),[['m','Δx = '+h4+': 근사 '+(+a.toFixed(4))+', 실제 '+(+t.toFixed(6))+'. 틀린 비율 '+(e/t*100).toFixed(1)+'%.'],['a','Δx를 절반으로 줄이면 틀린 양은 약 4분의 1로 줄어듭니다(틀린 양 = 6Δx² + Δx³). 근사는 "조금" 움직일 때만 믿을 만합니다.']]);v4a.dirty=true;}
U.btns($('#b4a'),H4.map(function(h){return [h,String(h)];}),h4,function(v){h4=v;up4a();});up4a();

/* ── 연습 4 (나) 경사하강 ── */
var E4=[0.1,0.2,0.3,0.4],e4=0.1;
var v4b=V($('#cv4b'),function(){var path=OM.gd1(2,e4,8),P=U.plot($('#cv4b'),{xr:[-3.8,2.6],yr:[-32,16],xt:[-3,-2,-1,0,1,2],yt:[-30,-20,-10,0,10],xl:'x',yl:'높이 f(x)',
    series:[{pts:lin(-3.8,2.6,f),color:cssv('--terrain'),width:2.4}],vlines:[{x:1,color:cssv('--gfp'),label:'바닥 x = 1',dy:0},{x:-1,color:cssv('--eye'),label:'꼭대기 x = −1',dy:20}],stamp:'설명용 예시'});
  var g=P.g,inb=function(p){return p[0]>=-3.8&&p[0]<=2.6&&p[1]>=-32;};
  for(var i=0;i<path.length;i++){var p=path[i];if(i>0){var q=path[i-1];if(inb(p)&&inb(q))U.arrow2(g,P.X(q[0]),P.Y(q[1]),P.X(p[0]),P.Y(p[1]),cssv('--stain'),1.8);
      else if(inb(q)){U.arrow2(g,P.X(q[0]),P.Y(q[1]),P.X(-3.8)+4,P.Y(-30),cssv('--eye'),2.4);U.label(g,P.X(-3.7),P.Y(-24),'x = '+fmt(p[0],1)+'로 이탈 (높이 '+fmt(p[1],0)+')',cssv('--eye'));}}
    if(inb(p)){g.beginPath();g.arc(P.X(p[0]),P.Y(p[1]),i?4.5:6,0,7);g.fillStyle=i?cssv('--stain'):cssv('--eye');g.fill();if(i<=4)U.label(g,P.X(p[0])+8,P.Y(p[1])-10,String(i),cssv('--stain'));}}});
function up4b(){var path=OM.gd1(2,e4,8);$('#t4').innerHTML=path.map(function(p,i){return '<tr><td>'+i+'</td><td>'+fmt(p[0],3)+'</td><td>'+fmt(p[1],3)+'</td><td>'+fmt(d(p[0]),3)+'</td></tr>';}).join('');
  var M={0.1:['g','걸음이 점점 작아지며 바닥 x = 1에 차근차근 다가갑니다(여섯째 걸음 1.001). 기울기가 0에 가까워지니 걸음도 저절로 작아집니다.'],
    0.2:['g','첫 걸음에 0.2까지 갔다가 되돌아와 셋째 걸음에 1.015. 빠르지만 바닥을 한 번 지나쳤습니다.'],
    0.3:['a','첫 걸음에 꼭대기 근처 −0.7까지 날아갔다가, 바닥을 사이에 두고 1.175 → 0.832 → 1.109처럼 왔다 갔다 합니다. 도착은 하지만 흔들립니다.'],
    0.4:['r','첫 걸음 −1.6 — 꼭대기(−1)를 넘어 반대편으로 갔습니다. 그다음 −3.5, −16.7… 끝없이 내려가는 절벽으로 굴러떨어졌습니다 → 아래 AI 판단 코너']};
  U.ins($('#i4b'),[M[e4]]);v4b.dirty=true;}
U.btns($('#b4b'),E4.map(function(e){return [e,'η = '+e];}),e4,function(v){e4=v;up4b();});up4b();

/* ── 연습 5: 경주 ── */
var K5=0,play5=false,acc5=0,MAXK=Math.max(RV.x1.path.length,RV.x2.path.length,RV.x3.path.length)-1,ORD=OM.rank(RV);
var lanes=[['x1','#cv5a','#st1'],['x2','#cv5b','#st2'],['x3','#cv5c','#st3']].map(function(L){var one={};one[L[0]]=RV[L[0]];return {k:L[0],o:V($(L[1]),function(){terrain($(L[1]),'valley',one,K5);}),st:$(L[2])};});
var tick5=V($('#cv5a'),function(){},function(dt){if(!play5)return;acc5+=dt*60;var n=Math.floor(acc5);if(n>0){acc5-=n;set5(Math.min(MAXK,K5+n));if(K5>=MAXK){play5=false;$('#b5p').textContent='▶ 다시 시작';}}});
function set5(k){K5=k;$('#b5n').textContent=k+'걸음';lanes.forEach(function(L){var r=RV[L.k];L.o.dirty=true;if(r.steps&&k>=r.steps)L.st.textContent=r.steps+'걸음 · '+(ORD.indexOf(L.k)+1)+'등 도착';else L.st.textContent=k+'걸음째…';});
  var it=[];if(k===0)it.push(['m','세 사람 모두 왼쪽 위 회색 점에서 출발해 오른쪽 위 고리로 갑니다. 순위를 먼저 맞혀 보고 "경주 시작"을 누르세요.']);
  else if(k<RV.x3.steps)it.push(['m','처음 몇 걸음: X1은 골짜기 바닥으로 거의 곧장 떨어진 뒤 바닥길을 따라 천천히 갑니다. X3는 가로·세로 보폭이 비슷해 대각선으로 내려옵니다.']);
  else if(k<RV.x2.steps)it.push(['g','X3(Adam)가 '+RV.x3.steps+'걸음에 1등으로 도착! 완만한 바닥길에서도 보폭이 줄지 않았기 때문입니다.']);
  else if(k<RV.x1.steps)it.push(['a','X2(모멘텀)가 '+RV.x2.steps+'걸음에 도착. 바닥길을 따라 속도가 붙었습니다. X1은 같은 보폭인데 아직 가는 중입니다.']);
  else it.push(['r','X1(바닐라)이 '+RV.x1.steps+'걸음에 도착. 기울기가 작은 바닥길에서 걸음이 짧아져 오래 걸렸습니다. 벽 쪽이 가팔라 보폭을 키울 수도 없었지요(연습 6 미션 1).']);
  U.ins($('#i5'),it);}
$('#b5p').onclick=function(){if(K5>=MAXK)set5(0);if(U.reduce){set5(MAXK);return;}play5=!play5;this.textContent=play5?'❚❚ 멈춤':'▶ 이어서';};
$('#b5s').onclick=function(){play5=false;$('#b5p').textContent='▶ 이어서';set5(Math.min(MAXK,K5+10));};
$('#b5e').onclick=function(){play5=false;$('#b5p').textContent='▶ 다시 시작';set5(MAXK);};
$('#b5r').onclick=function(){play5=false;$('#b5p').textContent='▶ 경주 시작';set5(0);};set5(0);

/* ── 연습 6: 실전 연습장 ── */
var TK=['valley','bowl','ravine'],DESC={valley:'휘어진 골짜기 — 가로질러서는 가파르고 바닥길을 따라서는 완만하다. 연습 5와 같은 지형.',bowl:'둥근 그릇 — 어느 방향이든 가파름이 같다. 바닥이 출발점에서 곧장 보인다.',ravine:'곧고 좁은 골짜기 — 위아래로는 아주 가파르고, 가로로는 아주 완만하다(가파름 차이 100배).'};
var S6={ter:'valley',eta:OM.DEF.eta,beta:OM.DEF.beta,etaA:OM.DEF.etaA},touched=false,PASS={},R6;
var v6=V($('#cv6'),function(){terrain($('#cv6'),S6.ter,R6,null,{lw:2.4,dot:6});});
var v6b=V($('#cv6b'),function(){if(!R6)return;var T=OM.TER[S6.ter],mx=1;['x1','x2','x3'].forEach(function(k){mx=Math.max(mx,R6[k].path.length);});
  U.plot($('#cv6b'),{xr:[0,Math.max(20,mx)],yr:[1e-3,100],logy:true,yt:[0.001,0.01,0.1,1,10,100],yf:function(t){return String(t);},xt:[0,Math.round(mx/4),Math.round(mx/2),Math.round(3*mx/4),mx],xl:'걸음',yl:'오차 (로그)',
    series:['x1','x2','x3'].map(function(k){return {pts:R6[k].path.map(function(p,i){return [i,T.f(p[0],p[1])];}),color:rc(k),width:2,name:RN[k].split(' · ')[0],ndy:k==='x1'?-12:k==='x2'?-24:-36};}),stamp:'설명용 예시'});});
function nm(k){return RN[k];}
function stepTxt(r){return r.steps?r.steps+'걸음':r.out?'튕겨 나감':'800걸음 안에 못 옴';}
function up6(){R6=OM.all(OM.TER[S6.ter],{eta:S6.eta,beta:S6.beta,etaA:S6.etaA});var ord=OM.rank(R6);
  $('#m6a').textContent=stepTxt(R6.x1);$('#m6b').textContent=stepTxt(R6.x2);$('#m6c').textContent=stepTxt(R6.x3);$('#m6d').textContent=ord.length?nm(ord[0]):'없음';
  ['m6a','m6b','m6c'].forEach(function(id,i){var e=$('#'+id);e.style.fontSize=R6['x'+(i+1)].steps?'':'15px';e.style.color=rc('x'+(i+1));});
  $('#desc6').textContent=DESC[S6.ter];
  var outs=['x1','x2','x3'].filter(function(k){return R6[k].out;}),miss=['x1','x2','x3'].filter(function(k){return !R6[k].out&&!R6[k].steps;}),L=[];
  if(outs.length)L.push(['doc','doc_e09',outs.map(nm).join(', ')+'가 지형 밖으로 튕겨 나갔어요. 보폭이나 관성이 이 지형의 가파른 방향에 비해 큽니다.']);
  else if(miss.length)L.push(['doc','doc_e09',miss.map(nm).join(', ')+'는 800걸음 안에 도착하지 못했어요. 보폭이 너무 작은지, 지그재그로 제자리걸음인지 그림에서 확인해 보세요.']);
  else L.push(['doc','doc_e16','세 사람 모두 도착했어요. 1등은 '+nm(ord[0])+', '+R6[ord[0]].steps+'걸음. 이 순위가 다른 지형에서도 같은지 탭을 바꿔 보세요.']);
  L.push(['asst','asst_e09','보고합니다. X1 '+stepTxt(R6.x1)+', X2 '+stepTxt(R6.x2)+', X3 '+stepTxt(R6.x3)+'.']);
  L.push(['fly','fly_e09',S6.ter==='valley'?'η를 0.01만 바꿔도 X1의 걸음 수가 수십 걸음씩 변해. 보폭 하나가 결과를 얼마나 흔드는지 봐.':S6.ter==='bowl'?'그릇은 방향마다 가파름이 같아. 그러면 방향마다 보폭을 맞추는 Adam의 장점은 어디로 갔을까?':'가로로 아주 완만한 길이야. X1이 왜 가로로 거의 못 가는지 그림을 봐.']);
  L.push(['robo',ord.length?'robo_e16':'robo_e15',ord.length?nm(ord[0])+'가 1등이니까 앞으로 '+RM[ord[0]]+'만 쓰면 돼! 다른 건 필요 없어.':'아무도 도착 못 했어? 걸음 수를 1만으로 늘리면 해결이야!']);
  $('#say6').innerHTML=L.map(function(x,i){return U.say(x[0],x[1],x[2],i%2===1);}).join('');
  if(touched){
    if(S6.ter==='valley'&&R6.x1.steps&&R6.x1.steps<=350)PASS.m1='통과! η = '+S6.eta.toFixed(2)+'에서 X1 '+R6.x1.steps+'걸음. 0.10으로 올리면 어떻게 되는지도 보세요.';
    if(R6.x2.out)PASS.m2='통과! (β '+S6.beta.toFixed(2)+', η '+S6.eta.toFixed(2)+') 관성이 크면 빠르지만, 멈춰야 할 곳을 지나칩니다.';
    if(S6.ter==='bowl'&&R6.x1.steps&&(!R6.x3.steps||R6.x1.steps<R6.x3.steps))PASS.m3='통과! 그릇에서 X1 '+R6.x1.steps+'걸음 vs X3 '+stepTxt(R6.x3)+'. 지형이 바뀌면 순위도 바뀝니다.';}
  var MS=[['m1','보폭 맞추기 — 휘어진 골짜기에서 X1(바닐라)을 350걸음 안에 도착시키기','힌트: 보폭 η를 0.01씩 키워 보세요. 0.10부터는 오히려 못 갑니다 — 오른쪽 오차 곡선이 톱니처럼 오르내리면 X1이 바닥 주변을 지그재그로 맴도는 중이에요.'],
    ['m2','함정 관찰 — X2(모멘텀)를 튕겨 나가게 만들기','힌트: 관성 β와 보폭 η를 함께 키워 보세요. 무엇이 같이 커질 때 위험할까요?'],
    ['m3','조건 바꾸기 — 둥근 그릇에서 X1이 X3보다 먼저 도착하게 하기','힌트: 그릇은 방향마다 가파름이 같습니다. 그러면 Adam의 장점이 남을까요?']];
  $('#mis6').innerHTML=MS.map(function(m,i){var p=PASS[m[0]];return '<li class="'+(p?'pass':'')+'"><span class="ck" aria-hidden="true">'+(p?'✓':i+1)+'</span><div><b>미션 '+(i+1)+'</b> '+m[1]+'<small>'+(p||m[2])+'</small></div></li>';}).join('');
  v6.dirty=true;v6b.dirty=true;}
function setTer(k){S6.ter=k;$$('#tabs6 .bt').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.k===k));});up6();}
$('#tabs6').innerHTML=TK.map(function(k){return '<button class="bt" type="button" data-k="'+k+'" aria-pressed="'+(k===S6.ter)+'">'+OM.TER[k].name+'</button>';}).join('');
$$('#tabs6 .bt').forEach(function(b){b.onclick=function(){touched=true;setTer(b.dataset.k);try{history.replaceState(null,'','#'+b.dataset.k);}catch(e){}};});
rng('r6a','v6a',function(v){return v.toFixed(2);},function(v){touched=true;S6.eta=Math.round(v*100)/100;up6();});
rng('r6b','v6b',function(v){return v.toFixed(2);},function(v){touched=true;S6.beta=Math.round(v*100)/100;up6();});
rng('r6c','v6c',function(v){return v.toFixed(2);},function(v){touched=true;S6.etaA=Math.round(v*100)/100;up6();});
$('#b6r').onclick=function(){S6.eta=OM.DEF.eta;S6.beta=OM.DEF.beta;S6.etaA=OM.DEF.etaA;$('#r6a').value=S6.eta;$('#r6b').value=S6.beta;$('#r6c').value=S6.etaA;$('#v6a').textContent=S6.eta.toFixed(2);$('#v6b').textContent=S6.beta.toFixed(2);$('#v6c').textContent=S6.etaA.toFixed(2);up6();};
var hk=(location.hash||'').slice(1);if(TK.indexOf(hk)>=0){S6.ter=hk;setTimeout(function(){var el=$('#p6');if(el)el.scrollIntoView();},60);}
setTer(S6.ter);
/* 검사용: 미션 정답 조작을 흉내 낸다 (code/check_page.py) */
window.__lab6={S:S6,set:function(o){Object.keys(o).forEach(function(k){S6[k]=o[k];});touched=true;setTer(S6.ter);return {R:R6,PASS:PASS};}};

/* ── 대결 ── */
U.Duel({el:'#duel',run:function(){return TK.map(function(k){var R=OM.all(OM.TER[k]);return {k:k,R:R,first:OM.rank(R)[0]};});},
  show:function(res,pred){var adamWins=res.filter(function(r){return r.first==='x3';}).length,counter=res.length-adamWins;
    $('#d-tbl').innerHTML=res.map(function(r){return '<tr><td>'+OM.TER[r.k].name+'</td><td>'+stepTxt(r.R.x1)+'</td><td>'+stepTxt(r.R.x2)+'</td><td>'+stepTxt(r.R.x3)+'</td><td>'+nm(r.first)+'</td></tr>';}).join('');
    $('#d-vf').textContent='반례 '+counter+'개';$('#d-vr').textContent='Adam 1등 '+adamWins+' / '+res.length;
    $('#d-bf').style.width=(counter?100:10)+'%';$('#d-br').style.width=(adamWins/res.length*100)+'%';
    var flyWin=counter>0;U.setMood($('#d-fly'),flyWin?'fly_e12':'fly_e13');U.setMood($('#d-robo'),flyWin?'robo_e15':'robo_e16');
    var b=res.filter(function(r){return r.k==='bowl';})[0].R;
    $('#d-say').innerHTML=[U.say('fly','fly_e12','둥근 그릇에서는 X2(모멘텀)가 '+b.x2.steps+'걸음으로 1등이야. Adam은 한 걸음이 늘 0.15 안팎이라 거리 5를 가는 데 '+b.x3.steps+'걸음이 들었어. 반례 하나면 "언제나"는 깨져.'),
      U.say('robo','robo_e15','…"언제나"는 취소. "Adam은 휘어지고 방향마다 가파름이 다른 지형에 강하다"로 고칠게.',true),
      U.say('doc','doc_e16','좋은 수정이에요. 결론에 조건을 붙이는 것, 그게 연구예요. 남은 두 지형에서는 Adam이 1등이었다는 것, 그리고 관성 β를 흔히 쓰는 0.9로 올리면 휘어진 골짜기에서도 모멘텀이 68걸음으로 Adam(60걸음)에 바짝 따라붙는다는 것도 함께 적어 두세요.')].join('');
    $('#d-score').textContent='승자: 초파리 연구원 (Adam 1등 '+adamWins+'/'+res.length+', 반례 '+counter+'개)';
    $('#d-pred').textContent=pred?(pred==='fly'?'예측 적중!':'예측 빗나감 — 반례 하나면 충분해요'):'예측 없이 결과를 봤어요';},
  reset:function(){U.setMood($('#d-fly'),'fly_e09');U.setMood($('#d-robo'),'robo_e16');}});

/* ── 용어·퀴즈 ── */
U.Gloss({
 '접선':['접선','미분','곡선의 한 점에 살짝 닿는 직선. 그 기울기가 그 점의 미분값.'],
 '변화율':['변화율','미분','x가 변할 때 y가 변하는 빠르기. 간격을 한없이 줄인 끝이 미분.'],
 '정지점':['정지점 (stationary point)','미분','기울기가 0인 자리. 꼭대기·바닥·안장점일 수 있다.'],
 '경사하강':['경사하강 (gradient descent)','AI','기울기의 반대쪽으로 조금씩 걸어 오차를 줄이는 방법.'],
 '학습률':['학습률 (learning rate)','AI','한 걸음의 보폭 η. 기울기에 곱해 숫자를 고치는 크기.'],
 '모멘텀':['모멘텀 (momentum)','AI','앞 걸음 속도의 β배를 이어 받는 경사하강. 굴러가는 공.'],
 'Adam':['Adam','AI','기울기의 평균과 제곱 평균으로 방향마다 보폭을 맞추는 걸음법 (Kingma·Ba, 2015).'],
 '극한':['극한','수학','어떤 값을 한없이 가깝게 할 때 결과가 다가가는 값.'],
 '안장점':['안장점','최적화','한 방향으로는 바닥, 다른 방향으로는 꼭대기인 자리. 감자칩 모양.'],
 '미니배치':['미니배치','AI','데이터 일부. 실제 SGD는 이것으로 기울기를 재서 걸음이 흔들린다.']
},['접선','변화율','정지점','경사하강','학습률','모멘텀','극한','안장점']);
U.Study({quiz:{
 p1:[{q:'x = 0에서 기울기는 −3이다. 내리막으로 가려면?',o:['x를 늘린다 (오른쪽)','x를 줄인다 (왼쪽)','그 자리에 멈춘다'],a:0,why:'기울기가 음수면 오른쪽으로 갈수록 내려갑니다. 기울기의 반대 방향 = 오른쪽.',hint:'음수 기울기는 오른쪽 아래로 기운 선입니다.'}],
 p2:[{q:'x = 2에서 Δx = 0.1일 때 평균 변화율은 9.61이었다. Δx를 0.01로 줄이면?',o:['9에 더 가까워진다 (9.0601)','16으로 커진다','0이 된다'],a:0,why:'평균 변화율 = 9 + 6Δx + Δx². Δx가 작아질수록 9에 다가갑니다.',hint:'간격을 줄이면 할선이 접선에 붙습니다.'}],
 p3:[{q:'기울기가 0인 자리에서 왼쪽 기울기는 +, 오른쪽 기울기는 −였다. 이 자리는?',o:['꼭대기 (극대)','바닥 (극소)','알 수 없다'],a:0,why:'오르다가 내려가니 꼭대기입니다. x = −1이 그런 자리였어요.',hint:'+는 오르막, −는 내리막.'}],
 p4:[{q:'η = 0.3에서 x가 바닥(1)을 사이에 두고 1.175 → 0.832 → 1.109처럼 흔들렸다. 가장 알맞은 조치는?',o:['보폭을 조금 줄인다','보폭을 더 키운다','기울기의 부호를 바꾼다'],a:0,why:'바닥을 지나칠 만큼 걸음이 크다는 신호입니다. η = 0.2나 0.1이면 흔들림이 줄어듭니다.',hint:'연습 4 (나)의 표에서 0.2와 0.3을 비교해 보세요.'}],
 p5:[{q:'휘어진 골짜기에서 바닐라 SGD가 느렸던 가장 큰 이유는?',o:['가파른 벽 때문에 보폭을 작게 잡아야 해서 완만한 바닥길에서 기어갔다','기울기를 잘못 계산했다','출발점이 가장 멀었다'],a:0,why:'세 사람의 출발점과 기울기 계산은 같습니다. 차이는 걸음 규칙과 보폭입니다.',hint:'연습 5의 "왜 이 방법을 쓰나" 2번.'},
     {q:'Adam의 첫 걸음 크기는 기울기가 0.01일 때와 100일 때 어떻게 다른가?',o:['거의 같다 (약 η)','100일 때 1만 배 크다','0.01일 때 더 크다'],a:0,why:'첫 걸음에서 m̂ ÷ √v̂ = g ÷ |g| = ±1이라 크기는 η입니다. 기울기 크기를 나눠 없애는 것이 Adam의 핵심입니다.',hint:'조수 수식 상자의 "숫자로 한 번 해 보기".'}],
 p6:[{q:'β 0.9, η 0.10에서 X2가 튕겨 나갔다. 가장 알맞은 설명은?',o:['관성과 보폭이 함께 커서 가파른 벽에서 멈추지 못했다','Adam보다 느려서 탈락했다','지형이 둥근 그릇이라서'],a:0,why:'모멘텀의 속도는 최대 1 ÷ (1 − β)배까지 커집니다. β 0.9면 10배, 여기에 보폭까지 크면 벽을 넘어갑니다.',hint:'미션 2의 힌트를 보세요.'}],
 duel:[{q:'대결 결과를 반영해 결론을 가장 잘 고친 것은?',o:['"Adam은 휘어지고 방향마다 가파름이 다른 지형에서 특히 강하다"','"Adam은 언제나 1등이다"','"모멘텀이 언제나 1등이다"'],a:0,why:'둥근 그릇에서는 모멘텀이 1등이었고, 나머지 두 지형에서는 Adam이 1등이었습니다. 결론에 조건을 붙입니다.',hint:'반례가 하나라도 있으면 "언제나"는 쓸 수 없습니다.'}]
}});
U.start();
})();
