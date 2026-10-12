/* ================= فرم روزانه (JPG) ================= */
function sheetHTML(row){
  const st=state.settings,en=row.en,V=visIdx();
  const totalInit=V.reduce((a,s)=>a+(st.halls[s].initial||0),0);
  const tz=Object.keys(en.tozin).filter(t=>en.tozin[t]);
  const cell=v=>`<td>${v===""||v==null?"&nbsp;":v}</td>`;
  let body="";
  V.forEach((s,k)=>{
    const tal=row.tal[s],hz=row.hazf[s],any=tal!=null||hz!=null;
    body+=`<tr><th class="hn">${toFa(s+1)}</th>`+cell(fmtInt(row.prevLive[s]))+cell(tal!=null?fmtInt(tal):"")+cell(hz!=null?fmtInt(hz):"—")+cell(any?fmtInt((tal||0)+(hz||0)):"")+cell(any&&row.live[s]!=null?fmtInt(row.live[s]):"");
    if(k===0)body+=`<td rowspan="${V.length}" class="fd">${tz.map(t=>`<div>${t}</div>`).join("")||"&nbsp;"}</td><td rowspan="${V.length}" class="fd">${tz.map(t=>`<div>${fmt(en.tozin[t])}</div>`).join("")||"&nbsp;"}</td><td rowspan="${V.length}" class="fd">${row.meals!=null?fmtInt(row.meals):"&nbsp;"}</td>`;
    body+=cell(esc(toFa(en.water[s])))+cell(row.dama!=null?fmt(row.dama):"")+cell(esc(row.kh))+cell(en.avgW[s]!=null?fmtW(en.avgW[s]):"")+`<td class="tx">${esc(en.vacc[s])||"&nbsp;"}</td><td class="tx">${esc(row.daruFull[s]).replace(/ \| /g,"<br>")||"&nbsp;"}</td></tr>`;
  });
  const anyT=row.hasTal||row.hasHazf;
  body+=`<tr class="tot"><th class="hn">کل</th>`+cell(fmtInt(row.prevTotal))+cell(row.hasTal?fmtInt(row.talSum):"")+cell(row.hasHazf?fmtInt(row.hazSum):"—")+cell(anyT?fmtInt(row.talSum+row.hazSum):"")+cell(anyT&&row.liveTotal!=null?fmtInt(row.liveTotal):"")+
    `<td></td><td>${row.tzSum?fmt(row.tzSum):"&nbsp;"}</td><td></td><td colspan="3"></td><td>${row.avgWeight?fmtW(Math.round(row.avgWeight*1000)/1000):""}</td><td colspan="2"></td></tr>`;
  const items=[];
  Object.keys(en.feedIn).filter(t=>en.feedIn[t]).forEach(t=>items.push(`ورود دان ${t}: <b>${fmt(en.feedIn[t])}</b> کیلوگرم`));
  tz.forEach(t=>items.push(`توزین دان ${t}: <b>${fmt(en.tozin[t])}</b> کیلوگرم`));
  const stockTxt=Object.keys(row.stockBy).filter(t=>row.stockBy[t]).map(t=>`${t} ${fmt(row.stockBy[t])}`).join("، ");
  items.push(`<b>مانده انبار دان:</b> ${row.cumInTot||row.cumTzTot?(fmt(row.stock)+" کیلوگرم"+(stockTxt?` (${stockTxt})`:"")):"—"}`);
  if(row.cumTzTot)items.push(`توزین تجمعی دوره: ${fmt(row.cumTzTot)} کیلوگرم`);
  if(row.farmW)items.push(`وزن کل فارم: ${fmt(Math.round(row.farmW))} کیلوگرم`);
  if(row.fcr)items.push(`<b>ضریب تبدیل: ${fmtDec(row.fcr,3)}</b>`);
  if(en.items)items.push(esc(en.items));
  return `<div class="sheet"><div class="hbox">
    <div class="hcol"><div><span>تاریخ</span><b>${row.weekday} ${longDate(row.date)}</b></div><div><span>تاریخ ورود جوجه</span><b>${longDate(st.start)}</b></div><div><span>سن</span><b>${toFa(row.age)} روز</b></div></div>
    <div class="hmid"><img src="${LOGO}" alt=""><div class="t1">زنجیره تولید گوشت مرغ</div><div class="t2">شرکت ${esc(st.company)}</div><div class="t3">گزارش روزانه فارم گوشتی: <b>${esc(st.farmName)}</b></div></div>
    <div class="hcol"><div><span>تعداد کل جوجه‌ریزی</span><b>${fmtInt(totalInit)}</b></div><div><span>نام و سن گله مادر</span><b>${esc(st.mother)||"&nbsp;"}</b></div><div><span>نژاد</span><b>${esc(st.breed)}</b></div></div></div>
  <table class="ftable"><thead><tr><th rowspan="2" class="hn">سالن</th><th rowspan="2">موجودی طیور</th><th rowspan="2">تلفات</th><th rowspan="2">حذفی</th><th rowspan="2">جمع</th><th rowspan="2">باقیمانده طیور</th><th colspan="3">دان مصرفی (توزین)</th><th rowspan="2">آب</th><th rowspan="2">دما</th><th rowspan="2">خاموشی</th><th rowspan="2">میانگین وزن</th><th rowspan="2">واکسیناسیون</th><th rowspan="2" class="wide">دارو / مکمل مصرفی</th></tr>
  <tr><th>نوع</th><th>وزن کل</th><th>وعده</th></tr></thead><tbody>${body}</tbody></table>
  <div class="bottom"><div class="box"><div class="bl">توضیحات:</div><div class="bt">${esc(en.notes).replace(/ \| /g,"<br>")}</div></div><div class="box small"><div class="bl">اقلام ورودی و خروجی:</div><div class="bt">${items.map(x=>`<div>${x}</div>`).join("")}</div></div></div></div>`;
}

/* ================= گزارش تجمیعی (PDF A5 افقی) ================= */
const AP_W=1190,AP_H=839;
function aggHeader(page,total,rows){
  const st=state.settings;const f=rows[0],l=rows[rows.length-1];
  return `<div class="aph"><img src="${LOGO}" alt=""><div class="apt"><div class="a1">گزارش تجمیعی دوره پرورش — ${esc(st.farmName)}</div><div class="a2">شرکت ${esc(st.company)} · نژاد ${esc(st.breed)} · جوجه‌ریزی ${longDate(st.start)} · از ${longDate(f.date)} تا ${longDate(l.date)}</div></div><div class="apn">صفحه ${toFa(page)} از ${toFa(total)}</div></div>`;
}
function aggSummary(rows){
  const st=state.settings,V=visIdx(),l=rows[rows.length-1];
  const init=V.reduce((a,s)=>a+(st.halls[s].initial||0),0);
  const lastW=[...rows].reverse().find(r=>r.fcr!=null);
  const fw=st.finalWeight;
  const box=(a,b)=>`<div class="sb"><b>${b}</b><span>${a}</span></div>`;
  return `<div class="sgrid">${box("جوجه‌ریزی",fmtInt(init))}${box("موجودی زنده",fmtInt(l.liveTotal))}${box("کل تلفات",fmtInt(l.cumTalTot)+" ("+fmtDec(init?l.cumTalTot/init*100:0,2)+"٪)")}${box("کل حذفی",fmtInt(l.cumHazfTot))}${box("کل دان ورودی",fmt(l.cumInTot)+" کیلو")}${box("کل توزین",fmt(l.cumTzTot)+" کیلو")}${box("مانده انبار",fmt(l.stock)+" کیلو")}${box("آخرین ضریب",lastW?fmtDec(lastW.fcr,3)+" (سن "+toFa(lastW.age)+")":"—")}${fw?box("ضریب نهایی",fmtDec(l.cumTzTot/fw,3)):""}</div>`;
}
function aggTableHead(){const V=visIdx();return `<thead><tr><th>تاریخ</th><th>سن</th>${V.map(s=>`<th>تلفات س${toFa(s+1)}</th>`).join("")}<th>جمع تلفات</th><th>حذفی</th><th>تلفات تجمعی</th><th>٪ تلفات</th><th>موجودی زنده</th><th>ورود دان</th><th>توزین</th><th>مانده انبار</th><th>میانگین وزن</th><th>ضریب</th><th class="wd">دارو / آنتی / واکسن</th></tr></thead>`;}
function aggRowHTML(r,init){
  const V=visIdx(),d="—";
  const dr=uniq(V.map(s=>[r.daruFull[s],r.en.vacc[s]].filter(Boolean).join(" + ")).filter(Boolean));
  const allSame=dr.length===1&&V.every(s=>[r.daruFull[s],r.en.vacc[s]].filter(Boolean).join(" + ")===dr[0]);
  const drTxt=allSame?dr[0]:V.map(s=>{const t=[r.daruFull[s],r.en.vacc[s]].filter(Boolean).join(" + ");return t?`س${toFa(s+1)}: ${t}`:"";}).filter(Boolean).join(" · ");
  return `<tr><td>${r.weekday.slice(0,1)==="س"?"":""}${shortDate(r.date)}</td><td>${toFa(r.age)}</td>${V.map(s=>`<td>${r.tal[s]!=null?fmtInt(r.tal[s]):d}</td>`).join("")}<td><b>${r.hasTal?fmtInt(r.talSum):d}</b></td><td>${r.hasHazf?fmtInt(r.hazSum):d}</td><td>${fmtInt(r.cumTalTot)}</td><td>${init?fmtDec(r.cumTalTot/init*100,2):d}</td><td>${r.liveTotal!=null?fmtInt(r.liveTotal):d}</td><td>${r.inSum?fmt(r.inSum):d}</td><td>${r.tzSum?fmt(r.tzSum):d}</td><td>${r.cumInTot||r.cumTzTot?fmt(r.stock):d}</td><td>${r.avgWeight?fmtW(Math.round(r.avgWeight*1000)/1000):d}</td><td>${r.fcr?"<b>"+fmtDec(r.fcr,3)+"</b>":d}</td><td class="wd">${esc(drTxt)||d}</td></tr>`;
}
function aggFoot(rows){
  const V=visIdx(),l=rows[rows.length-1],st=state.settings;
  const sum=s=>rows.reduce((a,r)=>a+(r.tal[s]||0),0);
  const fw=st.finalWeight;
  return `<tfoot><tr><td colspan="2">جمع دوره</td>${V.map(s=>`<td>${fmtInt(sum(s))}</td>`).join("")}<td>${fmtInt(l.cumTalTot)}</td><td>${fmtInt(l.cumHazfTot)}</td><td></td><td></td><td>${fmtInt(l.liveTotal)}</td><td>${fmt(l.cumInTot)}</td><td>${fmt(l.cumTzTot)}</td><td>${fmt(l.stock)}</td><td></td><td>${fw?fmtDec(l.cumTzTot/fw,3):""}</td><td class="wd">${fw?"ضریب نهایی با وزن زنده "+fmt(fw)+" کیلو":""}</td></tr></tfoot>`;
}
function buildAggPages(){
  const rows=compute();const st=state.settings,V=visIdx();
  const init=V.reduce((a,s)=>a+(st.halls[s].initial||0),0);
  const host=document.getElementById("measure");host.innerHTML="";
  const pages=[];
  const newPage=(first)=>{const p=document.createElement("div");p.className="ap";p.innerHTML=`<div class="aphh"></div>${first?aggSummary(rows):""}<div class="apbody"><table class="atable">${aggTableHead()}<tbody></tbody></table></div>`;host.appendChild(p);return p;};
  let pg=newPage(true);
  const over=p=>{const b=p.querySelector(".apbody");return b.scrollHeight>b.clientHeight+1;};
  rows.forEach(r=>{
    const tb=pg.querySelector("tbody");tb.insertAdjacentHTML("beforeend",aggRowHTML(r,init));
    if(over(pg)&&tb.children.length>1){tb.lastElementChild.remove();pages.push(pg);pg=newPage(false);pg.querySelector("tbody").insertAdjacentHTML("beforeend",aggRowHTML(r,init));}
  });
  pg.querySelector("table").insertAdjacentHTML("beforeend",aggFoot(rows));
  if(over(pg)){const tf=pg.querySelector("tfoot");tf.remove();pages.push(pg);pg=newPage(false);pg.querySelector("table").insertAdjacentHTML("beforeend",tf.outerHTML);}
  pages.push(pg);
  const html=pages.map((p,i)=>{p.querySelector(".aphh").outerHTML=aggHeader(i+1,pages.length,rows);return p.outerHTML;});
  host.innerHTML="";return html;
}

/* ================= تبدیل HTML به تصویر و PDF ================= */
function cssText(id){const el=document.getElementById(id);return el?el.textContent:"";}
async function htmlToCanvas(html,w,h,scale){
  const wrap=document.createElement("div");
  wrap.innerHTML=`<style>${cssText("fontcss")}${cssText("sheetcss")}</style><div style="width:${w}px;height:${h}px;background:#fff;direction:rtl">${html}</div>`;
  const xhtml=new XMLSerializer().serializeToString(wrap);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w*scale}" height="${h*scale}" viewBox="0 0 ${w} ${h}"><foreignObject x="0" y="0" width="${w}" height="${h}">${xhtml}</foreignObject></svg>`;
  const img=new Image();
  const url="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
  {
    await new Promise((res,rej)=>{img.onload=res;img.onerror=()=>rej(new Error("svg"));img.src=url;});
    await new Promise(r=>setTimeout(r,120));
    const cv=document.createElement("canvas");cv.width=Math.round(w*scale);cv.height=Math.round(h*scale);
    const ctx=cv.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,cv.width,cv.height);ctx.drawImage(img,0,0,cv.width,cv.height);
    return cv;
  }
}
function canvasJpegBytes(cv,q){const d=cv.toDataURL("image/jpeg",q);const b=atob(d.split(",")[1]);const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function buildPdf(imgs,pw,ph){
  const parts=[];let len=0;const offs=[];
  const enc=s=>{const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i)&255;return u;};
  const push=x=>{const b=typeof x==="string"?enc(x):x;parts.push(b);len+=b.length;};
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const n=imgs.length;const kids=imgs.map((_,i)=>(3+i*3)+" 0 R").join(" ");
  const obj=(id,body)=>{offs[id]=len;push(id+" 0 obj\n");body.forEach(push);push("\nendobj\n");};
  obj(1,["<< /Type /Catalog /Pages 2 0 R >>"]);
  obj(2,[`<< /Type /Pages /Kids [${kids}] /Count ${n} >>`]);
  imgs.forEach((im,i)=>{
    const pid=3+i*3,cid=pid+1,iid=pid+2;
    obj(pid,[`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im${i} ${iid} 0 R >> >> /Contents ${cid} 0 R >>`]);
    const cs=`q ${pw} 0 0 ${ph} 0 0 cm /Im${i} Do Q`;
    obj(cid,[`<< /Length ${cs.length} >>\nstream\n`,cs,"\nendstream"]);
    obj(iid,[`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.bytes.length} >>\nstream\n`,im.bytes,"\nendstream"]);
  });
  const total=3+n*3;const xref=len;
  let x=`xref\n0 ${total}\n0000000000 65535 f \n`;for(let i=1;i<total;i++)x+=String(offs[i]).padStart(10,"0")+" 00000 n \n";
  push(x);push(`trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts,{type:"application/pdf"});
}
function downloadBlob(blob,name){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);}
async function shareBlob(blob,name){
  try{const file=new File([blob],name,{type:blob.type});
    if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:name});return "shared";}
  }catch(e){if(e&&e.name==="AbortError")return "cancel";}
  downloadBlob(blob,name);flash("اشتراک مستقیم در این حالت ممکن نیست؛ فایل دانلود شد");return "downloaded";
}
const fileDate=k=>k.replace(/\//g,"،");
const dayFileName=r=>`${state.settings.farmName}-${fileDate(r.date)}-${r.weekday}.jpg`;
const aggFileName=()=>`${state.settings.farmName}،تجمیعی.pdf`;
async function makeDayJpg(date){
  const rows=compute();const r=rows.find(x=>x.date===date)||rows[rows.length-1];
  if(document.fonts&&document.fonts.ready)await document.fonts.ready;
  const host=document.getElementById("measure");host.innerHTML=sheetHTML(r);
  const el=host.firstElementChild;const w=el.offsetWidth,h=el.offsetHeight;host.innerHTML="";
  const cv=await htmlToCanvas(sheetHTML(r),w,h,2);
  return {blob:await new Promise(res=>cv.toBlob(res,"image/jpeg",0.93)),name:dayFileName(r)};
}
async function makeAggPdf(){
  if(document.fonts&&document.fonts.ready)await document.fonts.ready;
  const pages=buildAggPages();const imgs=[];
  for(const p of pages){const cv=await htmlToCanvas(p,AP_W,AP_H,1.6);imgs.push({bytes:canvasJpegBytes(cv,0.9),w:cv.width,h:cv.height});}
  return {blob:buildPdf(imgs,595.28,419.53),name:aggFileName()};
}
async function exportDay(share,force){
  if(state.busy)return;const date=state.selDay||defaultSel();
  if(share&&!force&&sentStatus(date)==="sent"){state.confirm={text:"گزارش "+longDate(date)+" قبلاً ارسال شده ("+fmtSentAt(state.sent[date].at)+"). دوباره ارسال شود؟",ok:()=>exportDay(true,true)};renderModal();return;}
  state.busy="day";renderBusy();
  try{const {blob,name}=await makeDayJpg(date);
    if(share){const r=await shareBlob(blob,name);if(r==="shared"){markSent(date,"share");render();flash("✓ ارسال شد و علامت خورد");}else if(r==="downloaded"){render();}}
    else{downloadBlob(blob,name);flash("دانلود شد — اگر فرستادید، «علامت ارسال» را بزنید");}}
  catch(e){flash("خطا در ساخت تصویر: "+e.message);}finally{state.busy="";renderBusy();}
}
async function exportAgg(share){
  if(state.busy)return;state.busy="agg";renderBusy();
  try{const {blob,name}=await makeAggPdf();if(share)await shareBlob(blob,name);else{downloadBlob(blob,name);flash("دانلود شد: "+name);}}
  catch(e){flash("خطا در ساخت PDF: "+e.message);}finally{state.busy="";renderBusy();}
}
function renderBusy(){document.querySelectorAll("[data-busy]").forEach(b=>{const k=b.getAttribute("data-busy");b.disabled=!!state.busy;b.classList.toggle("loading",state.busy===k);});}

