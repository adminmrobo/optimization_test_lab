# 이미지 제작 명세서 — 최적화 연습실

| # | 그림 | 상태 | 만드는 법 | 저장 이름 |
|---|---|---|---|---|
| 1 | 표지 (16:9) | 완료 — 코드로 그린 픽셀 표지 | build/make_cover.py: 480×270 격자에 화이트보드·경주 경로·캐릭터 팩 그림(바탕 지우기·상자 축소·48색)을 놓고 NEAREST ×4 무손실 WebP. 생성 도구로 다시 그릴 때는 COVER_PROMPTS의 cover_01 | img/cover_01.webp (1920×1080) · img/cover_01_960.webp · img/cover_01_grid480.png |
| 2 | 공유 미리보기 | 완료 | 표지 480×252를 잘라 ×2 → 960×504 | img/og_cover.png |
| 3 | 캐릭터 표정 58장 | 완료 (재사용) | build/make_sprites.py — 캐릭터 팩 96px | build/sprites96.js |

- 미공개 X1~X3는 팩에서 생성된 9종(E01·E02·E03·E04·E09·E13·E15·E16·E24) 안에서만 썼습니다(E13·E16·E09·E01·E04·E15).
- 표지를 받으면 `p0.src.html`의 `<!-- lab-cover -->` 블록의 캔버스를 `<picture>`로 바꾸고, og:image를 표지 자른 그림으로 교체합니다.
