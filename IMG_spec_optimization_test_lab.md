# 이미지 제작 명세서 — 최적화 연습실

| # | 그림 | 상태 | 만드는 법 | 저장 이름 |
|---|---|---|---|---|
| 1 | 표지 (16:9) | 그림판 표지로 대신 (캔버스) | COVER_PROMPTS의 cover_01 → 무손실 WebP 정수배 | img/cover_01.webp · img/cover_01_960.webp |
| 2 | 공유 미리보기 | 그림판 표지 캡처로 대신 | 표지에서 자르기 | img/og_cover.png |
| 3 | 캐릭터 표정 58장 | 완료 (재사용) | build/make_sprites.py — 캐릭터 팩 96px | build/sprites96.js |

- 미공개 X1~X3는 팩에서 생성된 9종(E01·E02·E03·E04·E09·E13·E15·E16·E24) 안에서만 썼습니다(E13·E16·E09·E01·E04·E15).
- 표지를 받으면 `p0.src.html`의 `<!-- lab-cover -->` 블록의 캔버스를 `<picture>`로 바꾸고, og:image를 표지 자른 그림으로 교체합니다.
