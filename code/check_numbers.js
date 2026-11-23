// 페이지 기대 수치 다시 계산: node code/check_numbers.js
const OM=require('../build/optmath.js');let bad=0;
const eq=(name,got,want,tol=1e-9)=>{const ok=typeof want==='number'?Math.abs(got-want)<=tol:got===want;if(!ok)bad++;console.log((ok?'OK  ':'FAIL')+' '+name+' = '+got+(ok?'':' (기대 '+want+')'));};
const f=OM.C.f,d=OM.C.d;
// 연습 1 기울기
eq('f(2)',f(2),5);eq("f'(2)",d(2),9);eq('접선 y = 9x − 13 에서 x=2.5',9*2.5-13,9.5);
// 연습 2 변화율 9 + 6Δx + Δx²
[[1,16],[0.5,12.25],[0.1,9.61],[0.01,9.0601]].forEach(([h,w])=>eq('Δy/Δx (Δx='+h+')',(f(2+h)-f(2))/h,w,1e-9));
// 연습 3 정지점
eq("f'(−1)",d(-1),0);eq("f'(1)",d(1),0);eq('f(−1) 꼭대기',f(-1),5);eq('f(1) 바닥',f(1),1);
// 연습 4 작은 증분
eq('근사 dy = 9 × 0.1',9*0.1,0.9,1e-12);eq('실제 Δy (0.1)',f(2.1)-f(2),0.961,1e-9);
eq('근사 dy = 9 × 0.5',9*0.5,4.5,1e-12);eq('실제 Δy (0.5)',f(2.5)-f(2),6.125,1e-9);
const g1=OM.gd1(2,0.1,8);eq('η 0.1 첫 걸음',g1[1][0],1.1,1e-9);eq('η 0.1 둘째 걸음',+g1[2][0].toFixed(3),1.037);
const g4=OM.gd1(2,0.4,8);eq('η 0.4 첫 걸음',g4[1][0],-1.6,1e-9);eq('η 0.4 발산',g4[g4.length-1][0]<-6,true);
const g3=OM.gd1(2,0.3,12);eq('η 0.3 첫 걸음',g3[1][0],-0.7,1e-9);
// 연습 5 경주 기본 설정
const V=OM.TER.valley,R=OM.all(V);eq('X1 걸음',R.x1.steps,430);eq('X2 걸음',R.x2.steps,118);eq('X3 걸음',R.x3.steps,60);
// 연습 6 미션
const sg=e=>OM.race(V,'sgd',{eta:e});eq('미션1 η0.08',sg(0.08).steps,322);eq('미션1 η0.09',sg(0.09).steps,286);eq('미션1 η0.07 실패',sg(0.07).steps>350,true);eq('미션1 η0.10 도착 못 함',sg(0.10).steps,null);
eq('미션2 β0.9 η0.10 튕김',OM.race(V,'mom',{eta:0.10,beta:0.9}).out,true);eq('미션2 기본은 안 튕김',R.x2.out,false);
const Bw=OM.TER.bowl;eq('미션3 그릇 X3 기본',OM.race(Bw,'adam',{eta:0.15}).steps,44);eq('미션3 그릇 X1 η0.10',OM.race(Bw,'sgd',{eta:0.10}).steps,38);eq('미션3 그릇 X1 η0.06 실패',OM.race(Bw,'sgd',{eta:0.06}).steps>44,true);
// 대결: 기본 설정으로 세 지형
const rk=k=>OM.rank(OM.all(OM.TER[k]))[0];eq('대결 골짜기 1등',rk('valley'),'x3');eq('대결 그릇 1등',rk('bowl'),'x2');eq('대결 곧은 골짜기 1등',rk('ravine'),'x3');
const Bo=OM.all(Bw);eq('그릇 X1',Bo.x1.steps,64);eq('그릇 X2',Bo.x2.steps,11);
const Ra=OM.all(OM.TER.ravine);eq('곧은 골짜기 X2',Ra.x2.steps,236);eq('곧은 골짜기 X3',Ra.x3.steps,44);eq('곧은 골짜기 X1 (800걸음 안 못 감)',Ra.x1.steps,null);
console.log(bad?'\n틀린 값 '+bad+'개':'\n모두 맞음');process.exit(bad?1:0);
