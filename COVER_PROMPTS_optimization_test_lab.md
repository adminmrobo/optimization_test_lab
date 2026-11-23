# Genspark 이미지 지시문 — 최적화 연습실 (픽셀풍)

> 화풍: 16비트 SNES 시대 RPG 픽셀아트, 밝은 흰 연구실. 지금 페이지의 표지는 build/make_cover.py가 코드로 그린 임시판이다. 받은 그림은 아래 저장 이름으로 바꿔 넣는다.
> 반영 규칙: 생성 PNG의 원래 격자(보통 ÷4, 예 480×270)를 찾아 NEAREST 정수배로만 키운 무손실 WebP(1920×1080)로. 1600×900처럼 정수배가 아닌 크기로 줄이거나 손실 압축하지 않는다.

## 요청 순서와 첨부 그림

| 순서 | 그림 | 비율 | 저장 이름 | 첨부할 참고 그림 (fruitfly-lab-expressions/images/…) |
|---|---|---|---|---|
| 1 | 표지 | 16:9 | img/cover_01.webp (+ _960) | x1/E16_proud, x2/E09_thinking, x3/E01_joy, haru/E04_surprise, sia/E04_surprise, moa/E24_shock, doctor/E07_explaining, jupanbot/E01_joy, fruitfly/E12_cheering + 지금 임시 표지 img/cover_01_grid480.png(구도 참고) |
| 2 | ahnboat.xyz 카드 썸네일 | 4:3 | img/card_thumb.webp | 1번 결과 + x1·x2·x3 E16 |
| 3 | 프롤로그 컷 (선택) | 4:3 | img/prologue_01.webp | 1번 결과 + haru·sia·moa E04 |
| 4 | 아웃트로 컷 "대학원 입학" (선택) | 4:3 | img/outro_01.webp | 1번 결과 + doctor/E14_sheepish, x1~x3 E04 |

1번을 먼저 받아 그림체를 확인한 뒤, 2~4번에 1번 결과를 참고 그림으로 함께 올린다. 한 번에 3~5장, 같은 비율끼리.

## 공통 토큰

```
STYLE: detailed 16-bit SNES-era pixel art, limited palette, crisp pixels, dithering shading, thick dark outlines, cheerful comedy mood, bright clean white research lab interior, soft daylight-white lighting even at night
X1: a mysterious unrevealed girl drawn as a cute solid very dark navy-black silhouette (#1B1A2E) with a thin dithered purple rim light, two round plain white dot eyes, small pink blush pixels, long side ponytail with a big bright pink bow (the bow is her only colored part), lab coat shape visible only as silhouette
X2: a mysterious unrevealed character as the same dark navy silhouette style, round beret, short hair, round glasses whose lenses glint teal (the teal glint is the only colored part)
X3: a tiny mysterious unrevealed character as the same dark navy silhouette style, cat-ear hood, oversized lab coat covering the hands, a small yellow bell (the only colored part)
HARU: assistant girl with pink and dark-blue two-tone hair in twin buns, white lab coat over a lavender hoodie
SIA: intern girl with long straight black hair, black-and-white maid-style uniform with a ribbon tie
MOA: intern girl with long light-brown hair, white frilly headband, maid-style uniform with a red bow
DOCTOR: middle-aged professor with gray-streaked swept-back hair, glasses, white lab coat, black tie
ROBO: small boxy cream-colored robot with a green screen face, holding a wooden abacus
FLY: fruit-fly researcher with big red compound eyes and translucent wings, wearing a tiny lab coat
NEGATIVE: scary, horror, villain, menacing smile, sharp teeth, glowing red eyes, detailed faces on the silhouettes, realistic proportions, dark gloomy room, text, letters, numbers, words, watermark, logo
```

## 1. 표지 cover_01 (16:9)

```
[STYLE]. Wide 16:9 scene. A bright white research lab at 11 pm: a window on the left shows a dark-blue night sky with tiny stars, but the room is brightly lit.
Center: a large whiteboard showing one long U-shaped valley drawn as a dashed gray curve, and three thin colored ball trails (pink, teal, gold) racing from a gray dot at the upper left down through the valley and up to a small black ring at the upper right. The gold trail is slightly ahead.
In front of the whiteboard, standing proudly side by side: [X1] holding a marker, [X2] pointing at the curve thoughtfully, [X3] jumping with joy.
On the right, a half-open wooden door; peeking in with big surprised faces, mouths open in amazement: [HARU] in front, [SIA] and [MOA] behind her.
In the lower left corner, cheering them on: [DOCTOR] raising one finger as if explaining, [ROBO] lifting its abacus, [FLY] cheering with both arms up.
Light checkered lab floor. no readable text, no letters, no numbers.
NEGATIVE: [NEGATIVE]
```

## 2. 카드 썸네일 card_thumb (4:3)

```
[STYLE]. 4:3 close-up. [X1], [X2] and [X3] stand shoulder to shoulder in front of a whiteboard with a U-shaped valley and three colored trails (pink, teal, gold), each giving a small proud pose. Behind the door frame on the right edge, only the surprised faces of [HARU] and [SIA] peek in. Plain bright white background, strong simple silhouette shapes that read well at small size. no text.
NEGATIVE: [NEGATIVE]
```

## 3. 프롤로그 컷 prologue_01 (4:3, 선택)

```
[STYLE]. 4:3 comic panel. A dim hallway at night; light spills from a lab door left ajar. [HARU], [SIA] and [MOA] crouch at the door gap, peeking in with wide surprised eyes; Haru covers her mouth, Sia points inside, Moa has a big sweat drop. Inside the bright lab (seen through the gap), three dark navy silhouettes — [X1], [X2], [X3] — are working at a whiteboard covered with small curve sketches and arrows. no text.
NEGATIVE: [NEGATIVE]
```

## 4. 아웃트로 컷 outro_01 (4:3, 선택)

```
[STYLE]. 4:3 comic panel, bright lab. [DOCTOR] smiles a little sheepishly while holding up a blank application form with an empty name box, offering it toward [X1], [X2] and [X3], who look surprised with tiny exclamation marks above their heads. [ROBO] and [FLY] clap in the background; [HARU] raises her hand eagerly as if asking "me too". The form has no readable writing, only blank lines. no text.
NEGATIVE: [NEGATIVE]
```

## 받은 뒤 반영
- 1번: `img/cover_01.webp`(1920×1080, 무손실 정수배)·`img/cover_01_960.webp`로 교체. 공유 미리보기 `img/og_cover.png`는 표지 원래 격자에서 1.91:1로 잘라 ×2(960×504).
- 2번: ahnboat.xyz 카드에 사용.
- 3·4번을 쓰면 프롤로그·아웃트로 섹션 대사 위에 `<figure>`로 넣고 alt를 단다.
