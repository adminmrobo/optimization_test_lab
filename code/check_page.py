# 브라우저 검사: python3 code/check_page.py  (playwright + Chrome)
# 390·1280px 가로 넘침, 콘솔 오류, 빈 캐릭터 그림, 미션 판정(조작 전 미통과 → 정답 조작 후 통과)을 확인한다.
import asyncio,sys,os
from playwright.async_api import async_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
async def main():
    bad=0
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path=os.environ.get('CHROME','/usr/bin/google-chrome'),args=['--no-sandbox'])
        for W in (390,1280):
            pg=await b.new_page(viewport={'width':W,'height':900});errs=[]
            pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.on('console',lambda m:errs.append(m.text) if m.type=='error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await pg.route('**/fonts.*/**',lambda r:r.abort())
            await pg.goto('file://'+ROOT+'/index.html');await pg.wait_for_timeout(900)
            sw=await pg.evaluate('document.documentElement.scrollWidth');emp=await pg.evaluate("[...document.querySelectorAll('img')].filter(i=>!i.getAttribute('src')).length")
            pre=await pg.evaluate("document.querySelectorAll('#mis6 li.pass').length")
            r=await pg.evaluate("""()=>{const o=[];o.push(window.__lab6.set({ter:'valley',eta:0.09,beta:0.7,etaA:0.15}).PASS.m1?1:0);
              o.push(window.__lab6.set({eta:0.10,beta:0.9}).PASS.m2?1:0);o.push(window.__lab6.set({ter:'bowl',eta:0.12,beta:0.7}).PASS.m3?1:0);return o}""")
            kg=await pg.evaluate("!!document.querySelector('#kg-mount')&&document.querySelector('#kg-mount').children.length>0")
            ok=sw<=W and not errs and emp==0 and pre==0 and r==[1,1,1] and kg
            bad+=0 if ok else 1
            print(('OK  ' if ok else 'FAIL'),W,'px · 가로',sw,'· 오류',errs[:3],'· 빈 그림',emp,'· 조작 전 통과',pre,'· 미션',r,'· 지식 색인',kg)
        await b.close()
    sys.exit(1 if bad else 0)
asyncio.run(main())
