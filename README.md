# 최적화 연습실 — 미공개 X1·X2·X3의 몰래 연습

미분의 네 가지 뜻(① 기울기 ② 변화율 ③ 기울기 0 ④ 작은 증분)을 곡선 하나로 확인하고, 그 규칙으로 움직이는 세 걸음법(바닐라 SGD · 모멘텀 · Adam)을 휘어진 골짜기에서 경주시킨 뒤, 지형과 보폭을 바꿔 순위를 뒤집어 보는 **실습편** 연구실 해설입니다. 연구실 스킬 ai-lab-explainer-plain v1.3(비전공 독자판, 흰 배경)을 따릅니다.

- 사이트: https://adminmrobo.github.io/optimization_test_lab/
- 글 · 안상선 ((주)M-Robo 대표) · [저자 소개](https://adminmrobo.github.io/who_am_i/who_am_i.html)
- 함께 보기: [좌표축 위의 그릇 — 3D 지도로 본 모델 최적화](https://adminmrobo.github.io/optimization_3d_map/)

## 이야기

밤 11시, 정체를 숨긴 신입 **미공개 X1(리본)·X2(모자)·X3(꼬마)**가 몰래 연습하는 것을 조수 하루와 인턴 시아·모아가 발견하고 그 실력에 놀랍니다. 주판봇·초파리 연구원·박사가 격려하며 더 자세히 풀어 주고, 박사는 마지막에 "대학원 입학" 한마디를 남깁니다.

| 순서 | 내용 | 체험 |
|---|---|---|
| 연습 1 (X1) | 기울기 — 접선이 내리막을 알려 준다 | x 슬라이더 |
| 연습 2 (X2) | 변화율 — Δx를 줄이면 16 → 12.25 → 9.61 → 9.0601 → 9 | Δx 버튼 |
| 연습 3 (X3) | 기울기 0 — 꼭대기(x = −1)와 바닥(x = 1) · AI 판단 코너 | x 슬라이더 |
| 연습 4 (셋이 함께) | 작은 증분 근사와 경사하강 x ← x − η f′(x), 보폭 0.4면 절벽으로 · AI 판단 코너 | Δx · η 버튼 |
| 연습 5 | 휘어진 골짜기 경주 — Adam 60 · 모멘텀 118 · 바닐라 430걸음 | 재생 |
| 연습 6 | 실전 연습장 — 지형 3개, η·β·Adam η, 미션 3개 자동 판정 | 대시보드 (`#valley` `#bowl` `#ravine`) |
| 대결 | Adam은 언제나 1등일까? (주판봇 vs 초파리) → 둥근 그릇의 반례로 초파리 승 | 결과 보기 |

## 바탕 자료와 저작권

- 사용자 제공 영상 2편: Infinity Academy 「Four Meanings of Differentiation」(인포그래픽), 「Optimizer Battle — curved valley · adaptive vs. momentum vs. vanilla」(애니메이션). 원 게시물 주소·게시일은 받지 못해 "미확인"으로 적었습니다. **원본 영상·이미지는 이 저장소에 넣지 않았고**, 곡선·지형·그래프는 모두 새로 그렸습니다.
- 영상 2의 70 · 119 · 281걸음과 이 페이지의 숫자가 다른 이유: 영상의 지형·보폭·도착 기준을 알 수 없어 새로 정했습니다. 순위의 모양만 같습니다.
- 논문: Kingma·Ba (2015) Adam, Polyak (1964) 모멘텀, Choi 외 (2019) 걸음법 비교의 설정 민감도.
- 두 영상의 원 게시물은 2026-11-23 웹 검색으로도 찾지 못했습니다. 링크를 알게 되면 출처 [1]·[2]와 build/kg_defs.py를 고칩니다.
- 캐릭터 이름·설정·그림은 저작권자 안상선의 허락 없이 사용할 수 없습니다. 그림은 [fruitfly-lab-expressions](https://github.com/adminmrobo/fruitfly-lab-expressions) 캐릭터 팩에서 가져왔습니다.

## 폴더

```
.
├─ index.html                 완성 페이지 (build/에서 만듦, 단일 파일 · 외부 요청은 글꼴 하나)
├─ img/                       픽셀 표지 cover_01(1920×1080·960, 원래 격자 480×270)과 공유 미리보기 og_cover(960×504)
├─ build/
│  ├─ p0.src.html · page.js   페이지 원본과 페이지 스크립트(대사·연습·연습장·대결·퀴즈)
│  ├─ optmath.js              계산 모듈: 연습 곡선 x³ − 3x + 3, 지형 3개, 세 걸음법
│  ├─ common.css · common.js  공용 디자인·모듈 (optimization_3d_map에서 가져와 캐릭터 기본값만 바꿈)
│  ├─ kgx.js · backbone.json  지식 색인·꾸러미 모듈과 AI 영역 뼈대
│  ├─ kg_defs.py              지식 그래프·참고문헌·서지 → kg_0 / refs_0 / meta_0.json
│  ├─ make_cover.py           픽셀 표지 그리기 (python3 build/make_cover.py <캐릭터 팩 경로>)
│  ├─ make_sprites.py         캐릭터 팩에서 표정 58장을 골라 sprites96.js로
│  └─ build.js                조립: node build/build.js
├─ code/
│  ├─ check_numbers.js        페이지 수치 검산 (node code/check_numbers.js)
│  └─ check_page.py           브라우저 검사: 390·1280px 넘침, 콘솔 오류, 미션 판정 (python3 code/check_page.py)
├─ plan/최적화연습실_기획안_v1.md · plan/검증기록_v1.md · plan/페르소나감사_v1.md
├─ LECTURE_GUIDE.md                         강의자용 가이드 (2차시 흐름·발문·퀴즈 정답표)
├─ COVER_PROMPTS_optimization_test_lab.md   픽셀 표지 지시문
├─ IMG_spec_optimization_test_lab.md        이미지 제작 명세서
└─ cover_manifest.json                      표지 현황판 연결
```

다시 만들기: `python3 build/kg_defs.py && node build/build.js && node code/check_numbers.js`

## 주요 수치 (설명용 모형)

- 골짜기 f(x, y) = ½·8·(y − 0.3x²)² + ½·0.4·(x − 2.5)², 출발 (−2.5, 2.025), 도착 (2.5, 1.875), 도착 판정 거리 0.1, 최대 800걸음.
- 기본 설정 η 0.06 · β 0.7 · Adam η 0.15 (β₁ 0.9, β₂ 0.999) → Adam 60 · 모멘텀 118 · 바닐라 430걸음.
- 둥근 그릇 64 · 11 · 44, 곧고 좁은 골짜기 800걸음 안에 못 옴 · 236 · 44.
- 설정 민감도: 관성 β를 흔히 쓰는 0.9로 올리면 모멘텀 68걸음(η 0.06), 17걸음(η 0.08)으로 Adam과 비슷하거나 앞섭니다.
- 미션 1 η 0.08 → 322, 0.09 → 286 (0.10부터는 도착 못 함) · 미션 2 β 0.9 · η 0.10에서 튕김 · 미션 3 그릇에서 η 0.10 → 38 < 44.
