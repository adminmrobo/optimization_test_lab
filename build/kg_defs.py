# 지식 그래프·참고문헌·페이지 서지 정의 → kg_0.json / refs_0.json / meta_0.json
# python3 build/kg_defs.py
import json,os
B=os.path.dirname(os.path.abspath(__file__));PG='index'
def N(i,t,ko,en,a,lv,df,fam='optimization',dom=('ai','math')):
    return {"id":i,"type":t,"label":{"ko":ko,"en":en},"page":PG,"anchor":a,"level":lv,"status":"known","confidence":"high","coverage":"explained","family":fam,"domain":list(dom),"match":[],"definition":{"ko":df}}
nodes=[
 N("lab:concept/tangent-slope","Concept","접선의 기울기","Slope of the tangent","#p1",1,"곡선의 한 점에 살짝 닿는 직선의 기울기. 그 점의 미분값이며 내리막 방향을 알려 준다."),
 N("lab:concept/rate-of-change","Concept","변화율","Rate of change","#p2",1,"x가 변할 때 y가 변하는 빠르기. 평균 변화율 Δy/Δx의 간격을 한없이 줄인 끝이 미분 dy/dx."),
 N("lab:concept/stationary-point","Concept","정지점 (기울기 0)","Stationary point","#p3",1,"기울기가 0인 자리. 양옆 기울기의 부호로 꼭대기(극대)·바닥(극소)을 가린다."),
 N("lab:concept/small-increment-approximation","Concept","작은 증분 근사","Small-increment approximation","#p4",2,"조금 움직이면 Δy ≈ f′(x)·Δx. 움직임이 클수록 틀린 양이 빠르게 커진다."),
 N("lab:method/gradient-descent","Method","경사하강","Gradient descent","#p4",2,"x ← x − η·f′(x). 기울기 반대쪽으로 작게 걷고 다시 기울기를 재는 일을 되풀이한다."),
 N("lab:concept/learning-rate","Concept","학습률 (보폭 η)","Learning rate","#p4",2,"기울기에 곱해 한 걸음의 크기를 정하는 수. 작으면 느리고 크면 튀거나 달아난다."),
 N("lab:method/vanilla-sgd","Method","바닐라 SGD","Vanilla SGD","#p5",2,"관성이나 보폭 조절 없이 θ ← θ − η·g만 쓰는 기본 걸음법."),
 N("lab:method/momentum-sgd","Method","모멘텀 SGD","Momentum SGD","#p5",2,"v ← βv + g, θ ← θ − η·v. 앞 걸음 속도의 β배를 이어 받아 완만한 길에서 가속한다."),
 N("lab:method/adam","Method","Adam","Adam","#p5",3,"기울기의 평균 m̂과 제곱 평균 v̂로 θ ← θ − η·m̂/(√v̂+ε). 방향마다 보폭을 맞춘다."),
 N("lab:concept/ill-conditioned-valley","Concept","휘어진 골짜기 (방향마다 다른 가파름)","Ill-conditioned curved valley","#p5",3,"한 방향은 가파르고 다른 방향은 완만한 오차 지형. 바닐라 SGD가 느려지는 대표 상황."),
 N("lab:limitation/stationary-not-minimum","Limitation","기울기 0이 바닥이라는 보장은 없다","Zero gradient is not a minimum","#p3",1,"x³ − 3x + 3에서 x = −1은 기울기 0이지만 꼭대기다."),
 N("lab:limitation/large-step-divergence","Limitation","보폭이 크면 튀거나 달아난다","Large steps oscillate or diverge","#p4",2,"η 0.3은 바닥 주변에서 흔들리고, η 0.4는 꼭대기를 넘어 끝없이 내려가는 쪽으로 달아난다."),
 N("lab:limitation/ranking-depends-on-terrain","Limitation","걸음법 순위는 지형과 보폭에 달렸다","Optimizer ranking depends on landscape and step size","#duel",3,"기본 설정에서 Adam은 휘어진·곧은 골짜기에서 1등, 둥근 그릇에서는 모멘텀이 1등."),
 N("lab:simulation/optimizer-race","Simulation","휘어진 골짜기 경주","Curved-valley optimizer race","#p5",2,"같은 출발·도착점에서 세 걸음법을 동시에 달리게 한 연습. 기본 설정 Adam 60 · 모멘텀 118 · 바닐라 430걸음."),
 N("lab:simulation/practice-room","Simulation","실전 연습장 — 순위 뒤집기","Practice room: flip the ranking","#p6",3,"지형 3개와 η·β·Adam η를 바꿔 미션 3개(보폭 맞추기·튕김 관찰·조건 바꾸기)를 푼다."),
 N("lab:question/adam-always-best","Question","Adam은 언제나 1등일까?","Is Adam always the fastest?","#duel",3,"반례 하나(둥근 그릇)로 '언제나'가 깨진다. 결론에 지형 조건을 붙인다."),
]
E=lambda s,p,o,a:{"s":s,"p":p,"o":o,"anchor":a,"confidence":"high"}
edges=[
 E("lab:concept/tangent-slope","lab:broader","lab:topic/calculus-optimization-math","#p1"),
 E("lab:concept/rate-of-change","lab:prerequisiteOf","lab:concept/tangent-slope","#p2"),
 E("lab:concept/tangent-slope","lab:prerequisiteOf","lab:concept/stationary-point","#p3"),
 E("lab:concept/stationary-point","lab:hasLimitation","lab:limitation/stationary-not-minimum","#p3"),
 E("lab:concept/small-increment-approximation","lab:prerequisiteOf","lab:method/gradient-descent","#p4"),
 E("lab:method/gradient-descent","lab:broader","lab:topic/gradient-descent","#p4"),
 E("lab:method/gradient-descent","lab:relatedTo","lab:concept/learning-rate","#p4"),
 E("lab:concept/learning-rate","lab:hasLimitation","lab:limitation/large-step-divergence","#p4"),
 E("lab:method/vanilla-sgd","lab:broader","lab:method/gradient-descent","#p5"),
 E("lab:method/momentum-sgd","lab:broader","lab:topic/momentum-adam","#p5"),
 E("lab:method/adam","lab:broader","lab:topic/momentum-adam","#p5"),
 E("lab:method/momentum-sgd","lab:contrastsWith","lab:method/vanilla-sgd","#p5"),
 E("lab:method/adam","lab:contrastsWith","lab:method/momentum-sgd","#p5"),
 E("lab:concept/ill-conditioned-valley","lab:demonstratedBy","lab:simulation/optimizer-race","#p5"),
 E("lab:method/adam","lab:demonstratedBy","lab:simulation/optimizer-race","#p5"),
 E("lab:simulation/practice-room","lab:raises","lab:question/adam-always-best","#p6"),
 E("lab:question/adam-always-best","lab:addressedBy","lab:limitation/ranking-depends-on-terrain","#duel"),
 E("lab:method/adam","lab:hasLimitation","lab:limitation/ranking-depends-on-terrain","#duel"),
]
kg={"version":"1.3","page":PG,"nodes":nodes,"edges":edges}
def W(t,ln,lab,acc=(2026,11,23)):return lab
refs=[
 {"id":"infinity_four_meanings","type":"graphic","title":"Four Meanings of Differentiation","author":[{"literal":"Infinity Academy"}],"accessed":{"date-parts":[[2026,11,23]]},
  "lab":{"work":"lab:work/infinity_four_meanings","role":"background","supports":["lab:concept/tangent-slope","lab:concept/rate-of-change","lab:concept/stationary-point","lab:concept/small-increment-approximation"],"locs":[],"verified":{"title":True,"author":True,"year":False,"url":False},"checkedBy":"사용자 제공 영상에서 옮김. 원 게시물 주소·게시일은 받지 못함","note":"네 가지 뜻의 순서와 그림 아이디어만 참고, 그림은 새로 그림"}},
 {"id":"optimizer_battle_video","type":"motion_picture","title":"Optimizer Battle — curved valley · adaptive vs. momentum vs. vanilla","author":[{"literal":"작성자 미확인"}],"accessed":{"date-parts":[[2026,11,23]]},
  "lab":{"work":"lab:work/optimizer_battle_video","role":"background","supports":["lab:simulation/optimizer-race"],"locs":[],"verified":{"title":True,"author":False,"year":False,"url":False},"checkedBy":"사용자 제공 영상에서 옮김. 원 게시물 주소·게시일·작성자는 받지 못함","note":"경주 아이디어와 Adam 갱신식 표기만 참고, 지형·설정·걸음 수는 새로 계산"}},
 {"id":"kingma2015adam","type":"paper-conference","title":"Adam: A Method for Stochastic Optimization","author":[{"family":"Kingma","given":"Diederik P."},{"family":"Ba","given":"Jimmy"}],"issued":{"date-parts":[[2015]]},"container-title":"International Conference on Learning Representations (ICLR)","URL":"https://arxiv.org/abs/1412.6980",
  "lab":{"work":"lab:work/kingma2015adam","role":"source","supports":["lab:method/adam"],"locs":[],"verified":{"title":True,"author":True,"year":True,"url":True},"checkedBy":"서지 정보 확인"}},
 {"id":"polyak1964","type":"article-journal","title":"Some methods of speeding up the convergence of iteration methods","author":[{"family":"Polyak","given":"Boris T."}],"issued":{"date-parts":[[1964]]},"container-title":"USSR Computational Mathematics and Mathematical Physics","volume":"4","issue":"5","page":"1-17","DOI":"10.1016/0041-5553(64)90137-5",
  "lab":{"work":"lab:work/polyak1964","role":"source","supports":["lab:method/momentum-sgd"],"locs":[],"verified":{"title":True,"author":True,"year":True,"url":False},"checkedBy":"서지 정보 확인"}},
 {"id":"ahn_optimization_3d_map","type":"webpage","title":"좌표축 위의 그릇 — 3D 지도로 본 모델 최적화","author":[{"family":"안","given":"상선"}],"issued":{"date-parts":[[2026]]},"URL":"https://adminmrobo.github.io/optimization_3d_map/","accessed":{"date-parts":[[2026,11,23]]},
  "lab":{"work":"lab:work/ahn_optimization_3d_map","role":"background","supports":["lab:method/gradient-descent"],"locs":[],"verified":{"title":True,"author":True,"year":True,"url":True},"checkedBy":"저자 본인 시리즈"}},
]
meta={"title":"최적화 연습실 — 미공개 X1·X2·X3의 몰래 연습","series":"최적화 연습실","number":"1","creator":[{"name":"안상선","role":"author","affiliation":"(주)M-Robo"}],"contributor":[{"name":"AI 보조 제작","role":"assistant"}],
 "date":"2026-11-23","version":"1.0","language":["ko"],"license":"","url":"https://adminmrobo.github.io/optimization_test_lab/",
 "about":["lab:concept/tangent-slope","lab:method/gradient-descent","lab:method/adam","lab:limitation/ranking-depends-on-terrain"],
 "basedOn":["infinity_four_meanings","optimizer_battle_video","kingma2015adam","polyak1964"],"educationalLevel":"입문","learningResourceType":"interactive explainer","registry":"KG_00_registry 0.2",
 "suggestedCitation":"안상선 (2026). 최적화 연습실 — 미공개 X1·X2·X3의 몰래 연습. v1.0."}
for n,o in (('kg_0.json',kg),('refs_0.json',refs),('meta_0.json',meta)):
    json.dump(o,open(os.path.join(B,n),'w'),ensure_ascii=False,indent=1)
print(len(nodes),'nodes',len(edges),'edges')
