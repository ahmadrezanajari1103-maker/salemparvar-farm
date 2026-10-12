#!/usr/bin/env python3
"""ساخت نسخه‌ی نهایی: python3 tools/build.py  ← خروجی در پوشه‌ی docs/ (برای GitHub Pages)"""
import os,shutil,re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd=lambda p:open(os.path.join(R,p),encoding="utf-8").read()
js="\n".join(rd("src/"+f) for f in ["core.js","parser.js","actions.js","export.js","views.js"])
ver=re.search(r'APP_VERSION="([^"]+)"',js).group(1)
js=js.replace('const LOGO="LOGO_DATA"','const LOGO="data:image/jpeg;base64,'+rd("assets/logo_b64.txt").strip()+'"')
html=rd("src/index.tpl.html").replace("{{FONT_REG}}",rd("assets/font_reg_b64.txt").strip()).replace("{{FONT_BOLD}}",rd("assets/font_bold_b64.txt").strip())\
  .replace("{{STYLES}}",rd("src/styles.css")).replace("{{SHEETCSS}}",rd("src/sheet.css")).replace("{{SCRIPT}}",js)
out=os.path.join(R,"docs");os.makedirs(out,exist_ok=True)
open(os.path.join(out,"index.html"),"w",encoding="utf-8").write(html)
for f in ["icon-192.png","icon-512.png"]:shutil.copy(os.path.join(R,"assets",f),os.path.join(out,f))
open(os.path.join(out,"manifest.webmanifest"),"w",encoding="utf-8").write('''{
 "name":"سالم پرور — دفتر پرورش","short_name":"سالم پرور","lang":"fa","dir":"rtl",
 "start_url":"./","scope":"./","display":"standalone","orientation":"portrait",
 "background_color":"#07130c","theme_color":"#07130c",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png","purpose":"any maskable"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]
}''')
open(os.path.join(out,"sw.js"),"w",encoding="utf-8").write('''const C="salemparvar-%s";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("message",e=>{if(e.data==="skip")self.skipWaiting();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))));
});
'''%ver)
open(os.path.join(out,".nojekyll"),"w").write("")
print("ساخته شد: docs/index.html  نسخه",ver," حجم",len(html)//1024,"KB")
