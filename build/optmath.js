/* optmath.js — 연습실 계산 모듈 (외부 라이브러리 없음, 페이지와 검산 스크립트가 함께 쓴다)
   ① 미분 네 뜻 예시 곡선 f(x) = x³ − 3x + 3
   ② 지형 세 개와 세 걸음법(바닐라 SGD · 모멘텀 SGD · Adam) */
var OM=(function(){
'use strict';
/* ── 1차원 예시 곡선 ── */
var C={f:function(x){return x*x*x-3*x+3;},d:function(x){return 3*x*x-3;}};
/* 1차원 경사하강: x ← x − η f'(x). 발산하면 멈춘다 */
function gd1(x0,eta,n){var x=x0,P=[[x,C.f(x)]];for(var i=0;i<n;i++){x=x-eta*C.d(x);if(!isFinite(x)||Math.abs(x)>6){P.push([x,C.f(x)]);break;}P.push([x,C.f(x)]);}return P;}

/* ── 지형 ── f(x,y)와 기울기 g, 도착점 m, 출발점 s */
var TER={
  valley:{name:'휘어진 골짜기',A:8,B:0.4,c:0.3,xg:2.5},
  bowl:{name:'둥근 그릇'},
  ravine:{name:'곧고 좁은 골짜기'}};
(function(){var V=TER.valley;V.m=[V.xg,V.c*V.xg*V.xg];V.s=[-2.5,V.c*6.25+0.15];
  V.f=function(x,y){var r=y-V.c*x*x;return 0.5*V.A*r*r+0.5*V.B*(x-V.xg)*(x-V.xg);};
  V.g=function(x,y){var r=y-V.c*x*x;return [-2*V.c*x*V.A*r+V.B*(x-V.xg),V.A*r];};
  V.floor=function(x){return V.c*x*x;};
  var Bw=TER.bowl;Bw.m=V.m;Bw.s=V.s;
  Bw.f=function(x,y){var dx=x-Bw.m[0],dy=y-Bw.m[1];return 0.5*(dx*dx+dy*dy);};
  Bw.g=function(x,y){return [x-Bw.m[0],y-Bw.m[1]];};
  var R=TER.ravine;R.m=V.m;R.s=V.s;R.A=8;R.B=0.08;
  R.f=function(x,y){var dx=x-R.m[0],dy=y-R.m[1];return 0.5*R.B*dx*dx+0.5*R.A*dy*dy;};
  R.g=function(x,y){return [R.B*(x-R.m[0]),R.A*(y-R.m[1])];};})();

var TOL=0.1,NMAX=800;
/* 걸음법 하나로 달리기. p={eta,beta} (Adam은 β₁ 0.9, β₂ 0.999 고정)
   돌려주는 값: {path:[[x,y]...], steps: 도착한 걸음 수 또는 null, out: 튕겨 나갔으면 true} */
function race(T,opt,p,n){n=n||NMAX;var x=T.s[0],y=T.s[1],vx=0,vy=0,mx=0,my=0,sx=0,sy=0,P=[[x,y]],steps=null,out=false;
  for(var t=1;t<=n;t++){var g=T.g(x,y),gx=g[0],gy=g[1];
    if(opt==='sgd'){x-=p.eta*gx;y-=p.eta*gy;}
    else if(opt==='mom'){vx=p.beta*vx+gx;vy=p.beta*vy+gy;x-=p.eta*vx;y-=p.eta*vy;}
    else{mx=0.9*mx+0.1*gx;my=0.9*my+0.1*gy;sx=0.999*sx+0.001*gx*gx;sy=0.999*sy+0.001*gy*gy;
      var c1=1-Math.pow(0.9,t),c2=1-Math.pow(0.999,t);x-=p.eta*(mx/c1)/(Math.sqrt(sx/c2)+1e-8);y-=p.eta*(my/c1)/(Math.sqrt(sy/c2)+1e-8);}
    if(!isFinite(x)||!isFinite(y)||Math.abs(x)>9||Math.abs(y)>9){out=true;break;}
    P.push([x,y]);
    if(Math.hypot(x-T.m[0],y-T.m[1])<TOL){steps=t;break;}}
  return {path:P,steps:steps,out:out};}
/* 세 식구의 기본 설정: X1·X2는 같은 보폭 η, X2는 관성 β, X3(Adam)은 자기 보폭 */
var DEF={eta:0.06,beta:0.7,etaA:0.15};
function all(T,s){s=s||DEF;return {x1:race(T,'sgd',{eta:s.eta}),x2:race(T,'mom',{eta:s.eta,beta:s.beta}),x3:race(T,'adam',{eta:s.etaA})};}
function rank(R){var k=['x1','x2','x3'].filter(function(q){return R[q].steps;}).sort(function(a,b){return R[a].steps-R[b].steps;});return k;}
return {C:C,gd1:gd1,TER:TER,race:race,all:all,rank:rank,DEF:DEF,TOL:TOL,NMAX:NMAX};
})();
if(typeof module!=='undefined')module.exports=OM;
