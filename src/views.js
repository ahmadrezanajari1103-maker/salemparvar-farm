/* ================= رابط کاربری (نسخه ۲) ================= */
function defaultSel(){const rows=compute();const wd=rows.filter(r=>r.entry);return (wd.length?wd[wd.length-1]:rows[rows.length-1]).date;}
const CAT_LABEL={notes:"توضیحات",daru:"دارو",vacc:"واکسن",ignore:"نادیده"};
function unkA(u){return state.unk[u]||(u.trim().split(/\s+/).length>=2?{cat:"notes",auto:true}:{});}
function setUnk(id,v){const u=decodeURIComponent(id);state.unk[u]=Object.assign({},unkA(u),{cat:v,auto:false});liveUpdate();}
function setUnkR(id,v){const u=decodeURIComponent(id);state.unk[u]=Object.assign({},unkA(u),{remember:v});}
function go(v){state.view=v;state.cellEdit=null;render();window.scrollTo(0,0);if(v==="add")setTimeout(()=>{const t=document.getElementById("composerInput");if(t)t.focus();},80);}
const ICON={
  home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  table:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 9v11M15 9v11"/></svg>',
  report:'<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/></svg>',
  settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>'
};
function navHTML(){
  const b=(v,l)=>`<button class="nb${state.view===v?" on":""}" onclick="go('${v}')">${ICON[v]}<span>${l}</span>${v==="report"&&unsentDays().length?`<i class="dot">${toFa(unsentDays().length)}</i>`:""}</button>`;
  return `<nav class="bnav">${b("home","خانه")}${b("table","جدول")}<button class="nb plus${state.view==="add"?" on":""}" onclick="go('add')" aria-label="ثبت">${ICON.plus}<span>ثبت</span></button>${b("report","گزارش")}${b("settings","تنظیمات")}</nav>`;
}
function unsentDays(){return compute().filter(r=>r.entry&&r.hasTal&&sentStatus(r.date)!=="sent");}

/* ---------- نمودار ---------- */
function chartSVG(rows){
  const V=visIdx();const W=640,Hh=190,pad={t:14,r:14,b:26,l:40};const iw=W-pad.l-pad.r,ih=Hh-pad.t-pad.b;
  const data=rows.filter(r=>r.hasTal);
  if(!data.length)return '<div class="empty" style="padding:24px">هنوز تلفاتی برای نمودار ثبت نشده</div>';
  const series=state.chartMode==="split"?V.map(s=>({c:HALL_COLORS[s],p:data.map(r=>r.tal[s]||0)})):[{c:"#22c55e",p:data.map(r=>r.talSum)}];
  const max=Math.max(1,...series.flatMap(s=>s.p));const n=data.length;
  const X=i=>pad.l+(n<=1?iw/2:i/(n-1)*iw),Y=v=>pad.t+ih-(v/max)*ih;
  let svg=`<svg viewBox="0 0 ${W} ${Hh}" class="chart">`;
  [0,Math.round(max/2),max].forEach(t=>{svg+=`<line x1="${pad.l}" y1="${Y(t)}" x2="${W-pad.r}" y2="${Y(t)}" stroke="#1f3a2a" stroke-dasharray="3 4"/><text x="${pad.l-6}" y="${Y(t)+3}" text-anchor="end" class="tick">${toFa(t)}</text>`;});
  if(state.chartMode==="total"){const s=series[0];svg+=`<path d="M${X(0)},${Y(0)} ${s.p.map((v,i)=>"L"+X(i).toFixed(1)+","+Y(v).toFixed(1)).join(" ")} L${X(n-1)},${Y(0)}Z" fill="#22c55e22"/>`;}
  series.forEach(s=>{svg+=`<path d="${s.p.map((v,i)=>(i?"L":"M")+X(i).toFixed(1)+","+Y(v).toFixed(1)).join(" ")}" fill="none" stroke="${s.c}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;s.p.forEach((v,i)=>{svg+=`<circle cx="${X(i)}" cy="${Y(v)}" r="3" fill="${s.c}"><title>${toFa(v)}</title></circle>`;});});
  const stepL=Math.max(1,Math.ceil(n/10));
  data.forEach((r,i)=>{if(i%stepL===0||i===n-1)svg+=`<text x="${X(i)}" y="${Hh-8}" text-anchor="middle" class="tickX">${shortDate(r.date)}</text>`;});
  return svg+"</svg>";
}

/* ---------- پیش‌نمایش کادر ---------- */
function chipsFor(p){
  const V=visIdx(),chips=[];
  const hv=(a,f)=>{const idx=[];for(let h=0;h<MAXH;h++)if(a[h]!=null&&a[h]!=="")idx.push(h);if(!idx.length)return null;
    const vals=idx.map(h=>f(a[h]));if(idx.length===V.length&&idx.every((h,i)=>h===V[i])&&uniq(vals).length===1&&V.length>1)return "همه سالن‌ها: "+vals[0];
    return idx.map((h,k)=>`<i class="hd" style="background:${HALL_COLORS[h]}"></i>س${toFa(h+1)}: ${vals[k]}`).join("  ");};
  let x;
  if((x=hv(p.tal,fmtInt)))chips.push(["tal","تلفات",x]);
  if((x=hv(p.hazf,fmtInt)))chips.push(["tal","حذفی",x]);
  if((x=hv(p.avgW,v=>fmtW(v)+" کیلو")))chips.push(["w","وزن‌کشی",x]);
  p.feed.forEach(f=>chips.push(["feed",(f.mode==="tozin"?"توزین":"ورود دان")+" "+(f.type||defaultFeedType(p.date)),fmt(f.kg)+" کیلو"+(f.guessed?' <em>(ورودی فرض شد)</em>':"")+(p.replace?' <em>(جایگزین)</em>':"")]));
  if(p.meals!=null)chips.push(["feed","وعده",toFa(p.meals)]);
  if(p.dama!=null)chips.push(["env","دما",fmt(p.dama)]);
  if(p.khamooshi)chips.push(["env","خاموشی",esc(p.khamooshi)]);
  if((x=hv(p.water,v=>esc(v))))chips.push(["env","آب",x]);
  if((x=hv(p.daru,v=>esc(v))))chips.push(["daru","دارو",x]);
  if(p.copyDaru)chips.push(["daru","دارو","همان داروی دیروز"]);
  if((x=hv(p.vacc,v=>esc(v))))chips.push(["daru","واکسن",x]);
  p.anti.forEach(a=>{const hs=a.halls||V;const lbl=a.mode==="start"?"شروع آنتی":a.mode==="end"?"پایان آنتی":"ادامه آنتی";
    chips.push(["anti",lbl,`${esc(a.name)||(a.mode==="start"?'<em class="warnI">نام دارو؟</em>':"دوره‌های باز")} · ${hallsLabel(hs)}${a.time?" · ساعت "+toFa(a.time):""}${a.date?" · "+shortDate(a.date):""}`]);});
  if(p.notes)chips.push(["note","توضیحات",esc(p.notes)]);
  if(p.items)chips.push(["note","اقلام",esc(p.items)]);
  let unk="";
  if(p.unknown.length){unk=`<div class="unkBox"><span class="unkT">شناخته نشد:</span>${p.unknown.map(u=>{const a=unkA(u);const id=encodeURIComponent(u);
    return `<span class="unk"><b>${esc(u)}</b><select onchange="setUnk('${id}',this.value)"><option value="">—</option>${["notes","daru","vacc","ignore"].map(c=>`<option value="${c}"${a.cat===c?" selected":""}>${CAT_LABEL[c]}</option>`).join("")}</select><label><input type="checkbox"${a.remember?" checked":""} onchange="setUnkR('${id}',this.checked)"> یادم بماند</label></span>`;}).join("")}</div>`;}
  const warn=p.warn.length?`<div class="pvWarn">${p.warn.map(esc).join("<br>")}</div>`:"";
  const ex=state.entries.find(e=>e.date===p.date);
  return `<div class="pvDate"><b>${weekdayOfKey(p.date)} ${longDate(p.date)}</b> · سن ${toFa(keyToJdn(p.date)-keyToJdn(state.settings.start)+1)}${p.dateDefault?' <em>(بدون تاریخ ← امروز)</em>':""}${ex?' <span class="exTag">به روز موجود اضافه می‌شود</span>':""}</div><div class="chips">${chips.map(c=>`<span class="chip c-${c[0]}"><b>${c[1]}</b> ${c[2]}</span>`).join("")||'<span class="warnI">داده‌ای در این بخش نیست</span>'}</div>${unk}${warn}`;
}
function previewHTML(){
  if(!state.input.trim())return "";
  const cmd=detectCommand(state.input);
  if(cmd.type==="delete"){
    const txt=cmd.date?(cmd.wholeDay?`کل روز ${longDate(cmd.date)} حذف خواهد شد`:`${FIELD_LABELS[cmd.field]||"?"}${cmd.salon!=null?" "+hallName(cmd.salon):""} روز ${longDate(cmd.date)} حذف خواهد شد`):"تاریخ مشخص نیست";
    return `<div class="preview del"><span class="pvTag del">فرمان حذف</span><span class="${cmd.date?"":"warnI"}">${txt}</span></div>`;
  }
  const ps=parseMulti(state.input);
  return `<div class="preview">${ps.length>1?`<div class="multiT">📅 ${toFa(ps.length)} روز تشخیص داده شد</div>`:""}${ps.map(p=>`<div class="pvCard">${chipsFor(p)}</div>`).join("")}</div>`;
}
function liveUpdate(){
  const ta=document.getElementById("composerInput");if(!ta)return;
  const holder=document.getElementById("pvHolder");if(holder)holder.innerHTML=previewHTML();
  const b=document.getElementById("submitBtn");if(!b)return;const isDel=state.input.trim()&&detectCommand(state.input).type==="delete";
  b.className="btn big "+(isDel?"danger":"primary");b.textContent=isDel?"اجرای حذف":"ثبت در جدول ✓";b.disabled=!state.input.trim();
}
const SNIPS=[["سالن ۱ ()","سالن ۱ ("],["تلفات","تلفات "],["حذفی","حذفی "],["توزین","توزین "],["ورود دان","ورودی دان "],["وزنکشی","وزنکشی: یک  دو  سه "],["دارو","دارو "],["شروع آنتی","شروع آنتی ساعت  "],["پایان آنتی","پایان آنتی ساعت "],["خاموشی","خاموشی  ساعت"],["وعده","وعده "],["دما","دما "],["توضیحات","\nتوضیحات: "]];
function snip(i){
  const ta=document.getElementById("composerInput");if(!ta)return;let t=SNIPS[i][1];
  if(i===0){const n=(state.input.match(/سالن\s*\d\s*\(/g)||[]).length+1;t="سالن "+toFa(Math.min(n,6))+" (";}
  const s=ta.selectionStart??ta.value.length,e=ta.selectionEnd??ta.value.length;
  const pre=ta.value.slice(0,s),sp=pre&&!/[\s\n]$/.test(pre)&&!t.startsWith("\n")?" ":"";
  ta.value=pre+sp+t+ta.value.slice(e);const pos=(pre+sp+t).length;ta.focus();ta.setSelectionRange(pos,pos);state.input=ta.value;liveUpdate();
}
function addView(){
  return `<div class="card composer"><div class="cardHead"><div class="cardTitle">✍️ ثبت هوشمند</div><button class="mini" onclick="pasteClip()">📋 چسباندن</button></div>
  <textarea id="composerInput" placeholder="پیام را آزاد بنویسید یا بچسبانید؛ چند روز هم با هم قبول است.&#10;&#10;۸ مهر  سالن ۱ (۲۲) سالن ۲ (۱۸) سالن ۳ (۳۰)&#10;توزین ۲ تن استارتر · ۳ وعده · خاموشی ۳ ساعت&#10;وزنکشی: یک ۱،۷ دو ۱،۶ سه ۱،۸&#10;سالن یک ویتامین سی، دو ای سلنیوم&#10;انتی ساعت ۱۲،۰۰ استارت کلی استاپ بعلاوه TS">${esc(state.input)}</textarea>
  <div class="snips">${SNIPS.map((s,i)=>`<button class="sn" onclick="snip(${i})">${s[0]}</button>`).join("")}</div>
  <div id="pvHolder">${previewHTML()}</div>
  <div class="composerBar"><span class="hint">بدون تاریخ = امروز (${shortDate(effToday())}) · دان هم‌روز جمع می‌شود · «… را پاک کن» = حذف</span>
  <button class="btn big primary" id="submitBtn" onclick="submit()"${state.input.trim()?"":" disabled"}>ثبت در جدول ✓</button></div></div>
  <div class="card tips"><div class="cardTitle">نمونه‌هایی که کادر می‌فهمد</div><div class="tipGrid">
  <div><b>تلفات:</b> سالن ۱ (۱۲) · تلفات ۱۲ ۹ ۳۲ · س۱ ۱۲ س۲ ۹ · تلفات نداشتیم</div>
  <div><b>دان:</b> ورودی ۲۴ تن رشد · توزین ۲۰۰۰ استارتر · توزین را ۱۲۰۰ کن</div>
  <div><b>وزن:</b> وزنکشی یک ۱،۷ دو ۱،۶ · سالن ۱ ۱۶۰۰ گرم</div>
  <div><b>آنتی:</b> سالن یک شروع آنتی ساعت ۱۵،۰۰ فلور · پایان آنتی ۱۴:۰۰</div>
  <div><b>دارو:</b> AD3e و ویتامین سی · همان داروی دیروز · واکسن نیوکاسل سالن ۱ و ۲</div>
  <div><b>چند روز:</b> هر روز را با تاریخ در خط جدا بنویسید</div></div></div>`;
}
async function pasteClip(){try{const t=await navigator.clipboard.readText();if(t){state.input=(state.input?state.input+"\n":"")+t;render();}}catch(e){flash("اجازه‌ی دسترسی به حافظه‌ی کپی داده نشد؛ نگه دارید و Paste بزنید");}}

/* ---------- خانه ---------- */
function ov(label,val,sub,accent){return `<div class="ovStat${accent?" accent":""}"><div class="ovLabel">${label}</div><div class="ovVal">${val}</div>${sub?`<div class="ovSub">${sub}</div>`:""}</div>`;}
function coursesHTML(){
  if(!state.courses.length)return "";
  const today=effToday();const open=state.courses.filter(c=>!c.end),closed=state.courses.filter(c=>c.end);
  let h=`<div class="card coursesCard"><div class="cardHead"><div class="cardTitle">💊 دوره‌های آنتی‌بیوتیک</div>${closed.length?`<button class="mini" onclick="state.showClosed=!state.showClosed;render()">${state.showClosed?"بستن":"تمام‌شده‌ها ("+toFa(closed.length)+")"}</button>`:""}</div><div class="courseGrid">`;
  open.forEach(c=>{const n=courseDay(c,today);const ok=c.confirmed===today;
    h+=`<div class="course"><div class="cTop"><div class="cName">${esc(c.name)}</div><div class="cBadge">روز ${n?ordFa(n):"—"}</div></div><div class="cMeta">${hallsLabel(c.halls)} · شروع ${shortDate(c.start)}${c.startTime?" ساعت "+toFa(c.startTime):""}${ok?' · <span class="okTag">✓ امروز تأیید شد</span>':""}</div>
     <div class="cBtns"><button class="btn primary small" onclick="courseContinue('${c.id}')">ادامه</button><button class="btn danger small" onclick="courseEndToggle('${c.id}')">پایان</button><button class="mini" onclick="openCourse('${c.id}')">ویرایش</button></div>
     ${state.endOpen[c.id]?`<div class="endRow"><input id="endT_${c.id}" placeholder="ساعت پایان، مثلا ۱۴:۰۰" inputmode="numeric"><button class="btn danger small" onclick="courseEnd('${c.id}')">ثبت پایان امروز</button></div>`:""}</div>`;});
  if(!open.length)h+=`<div class="empty small">دوره‌ی بازی نیست</div>`;
  h+=`</div>`;
  if(state.showClosed&&closed.length)h+=`<div class="closedList">${closed.map(c=>`<div class="cl"><b>${esc(c.name)}</b> · ${hallsLabel(c.halls)} · ${shortDate(c.start)} تا ${shortDate(c.end)} (${toFa(keyToJdn(c.end)-keyToJdn(c.start)+1)} روز)${c.endTime?" · پایان "+toFa(c.endTime):""} <button class="mini" onclick="openCourse('${c.id}')">ویرایش</button></div>`).join("")}</div>`;
  return h+`</div>`;
}
function todoHTML(rows){
  const today=effToday(),y=addDays(today,-1),items=[];
  const ry=rows.find(r=>r.date===y);
  if(ry&&!ry.hasTal&&y>=state.settings.start)items.push(`<div class="todo warn"><span>🐔 تلفات دیروز (${weekdayOfKey(y)} ${shortDate(y)}) هنوز ثبت نشده</span><button class="btn primary small" onclick="state.input='${toFa(parseKey(y).d)} ${["","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"][parseKey(y).m]}\\n';go('add')">ثبت</button></div>`);
  const un=unsentDays();
  if(un.length)items.push(`<div class="todo"><span>📤 ${toFa(un.length)} گزارش روزانه ارسال نشده:</span><div class="dchips">${un.slice(-6).reverse().map(r=>`<button class="dchip ${sentStatus(r.date)}" onclick="state.selDay='${r.date}';go('report')">${shortDate(r.date)}${sentStatus(r.date)==="changed"?" ⚠":""}</button>`).join("")}</div></div>`);
  const lb=state.settings.lastBackup||0,lc=state.settings.lastChange||0;
  if(lc>lb&&Date.now()-lb>3*864e5)items.push(`<div class="todo"><span>💾 ${lb?toFa(Math.floor((Date.now()-lb)/864e5))+" روز از آخرین پشتیبان گذشته":"هنوز پشتیبان نگرفته‌اید"}</span><button class="btn ghost small" onclick="exportBackup()">پشتیبان</button></div>`);
  if(!items.length)items.push(`<div class="todo ok"><span>✓ همه‌چیز به‌روز است</span></div>`);
  return `<div class="card"><div class="cardTitle" style="margin-bottom:6px">📋 کارهای امروز</div>${items.join("")}</div>`;
}
function homeView(rows){
  const st=state.settings,V=visIdx(),last=rows[rows.length-1];
  const init=V.reduce((a,s)=>a+(st.halls[s].initial||0),0);
  const lastTal=[...rows].reverse().find(r=>r.hasTal)||rows[0];
  const lastF=[...rows].reverse().find(r=>r.fcr!=null),lastW=[...rows].reverse().find(r=>r.avgWeight!=null);
  return todoHTML(rows)+coursesHTML()+
  `<div class="overview">${ov("موجودی زنده",lastTal.liveTotal!=null?fmtInt(lastTal.liveTotal):"—","تا "+shortDate(lastTal.date),true)}${ov("کل تلفات",fmtInt(last.cumTalTot),fmtDec(init?last.cumTalTot/init*100:0,2)+"٪ از جوجه‌ریزی")}${ov("کل حذفی",fmtInt(last.cumHazfTot))}${ov("مانده انبار دان",fmt(last.stock),"کیلوگرم")}${ov("کل ورود دان",fmt(last.cumInTot),"کیلوگرم")}${ov("کل توزین",fmt(last.cumTzTot),"کیلوگرم")}${ov("آخرین وزن",lastW?fmtW(Math.round(lastW.avgWeight*1000)/1000):"—",lastW?"سن "+toFa(lastW.age):"کیلو")}${ov("ضریب تبدیل",lastF?fmtDec(lastF.fcr,3):"—",lastF?"سن "+toFa(lastF.age):"با وزن‌کشی همه سالن‌ها")}</div>
  <div class="card"><div class="cardHead"><div class="cardTitle">📈 تلفات روزانه</div><div class="seg"><button class="${state.chartMode==="split"?"on":""}" onclick="state.chartMode='split';render()">تفکیکی</button><button class="${state.chartMode==="total"?"on":""}" onclick="state.chartMode='total';render()">تجمیعی</button></div></div>`+
  (state.chartMode==="split"?`<div class="legend">${V.map(s=>`<span><i style="background:${HALL_COLORS[s]}"></i>${esc(hallName(s))}</span>`).join("")}</div>`:`<div class="legend"><span><i style="background:#22c55e"></i>جمع تلفات</span></div>`)+chartSVG(rows)+`</div>`;
}

/* ---------- جدول با ویرایش سلولی ---------- */
function tableView(rows){
  const V=visIdx(),types=feedTypesUsed();const last=rows[rows.length-1];const d='<span class="dim">—</span>';
  const hc=s=>`style="--hc:${HALL_COLORS[s]}"`;
  const ce=(date,f,h,cls,html)=>`<td class="ed ${cls||""}" onclick="openCell('${date}','${f}',${h==null?"null":h})">${html}</td>`;
  let h=`<div class="card tableCard"><div class="cardHead"><div class="cardTitle">📊 جدول روزانه</div><div class="hint">روی هر خانه بزنید تا همان‌جا ویرایش شود · روی تاریخ = گزینه‌های روز</div></div><div class="tableScroll" id="tScroll"><table class="main"><thead><tr>
   <th class="fz fz1" rowspan="2">تاریخ</th><th class="fz fz2" rowspan="2">سن</th><th rowspan="2" title="وضعیت ارسال">📤</th>
   <th class="g gT" colspan="${V.length+1}">تلفات</th><th class="g gH" colspan="${V.length+1}">حذفی</th><th class="g gL" colspan="${V.length+1}">موجودی زنده</th>
   <th class="g gF" colspan="${3+types.length}">دان (کیلو)</th><th rowspan="2">وعده</th><th rowspan="2">دما</th><th rowspan="2">خاموشی</th>
   <th class="g gW" colspan="${V.length+2}">وزن‌کشی (کیلو)</th><th class="g gD" colspan="${V.length}">دارو / آنتی / واکسن</th><th rowspan="2">توضیحات</th></tr><tr>`+
   V.map(s=>`<th class="hh" ${hc(s)}>س${toFa(s+1)}</th>`).join("")+'<th class="st">جمع</th>'+
   V.map(s=>`<th class="hh" ${hc(s)}>س${toFa(s+1)}</th>`).join("")+'<th class="st">جمع</th>'+
   V.map(s=>`<th class="hh" ${hc(s)}>س${toFa(s+1)}</th>`).join("")+'<th class="st">کل</th>'+
   '<th>ورود</th><th>توزین</th><th class="st">مانده</th>'+types.map(t=>`<th class="sm">مانده ${t}</th>`).join("")+
   V.map(s=>`<th class="hh" ${hc(s)}>س${toFa(s+1)}</th>`).join("")+'<th>وزن کل</th><th class="st">ضریب</th>'+
   V.map(s=>`<th class="hh" ${hc(s)}>س${toFa(s+1)}</th>`).join("")+'</tr></thead><tbody>';
  rows.forEach(r=>{
    const ss=r.entry&&r.hasTal?sentStatus(r.date):"";
    h+=`<tr class="${r.entry?"":"nodata"}${r.date===effToday()?" today":""}${state.selDay===r.date?" sel":""}">`+
     `<td class="fz fz1 datev" onclick="state.dayMenu='${r.date}';renderModal()"><div class="wd">${r.weekday}</div>${shortDate(r.date)}</td><td class="fz fz2 age">${toFa(r.age)}</td>`+
     `<td class="sst">${ss==="sent"?'<span class="sOk">✓</span>':ss==="changed"?'<span class="sCh">⚠</span>':ss==="none"?'<span class="sNo">●</span>':""}</td>`+
     V.map(s=>ce(r.date,"tal",s,"cT",r.tal[s]!=null?fmtInt(r.tal[s]):d)).join("")+`<td class="cT st">${r.hasTal?fmtInt(r.talSum):d}</td>`+
     V.map(s=>ce(r.date,"hazf",s,"cH",r.hazf[s]!=null?fmtInt(r.hazf[s]):d)).join("")+`<td class="cH st">${r.hasHazf?fmtInt(r.hazSum):d}</td>`+
     V.map(s=>`<td class="cL">${r.live[s]!=null?fmtInt(r.live[s]):d}</td>`).join("")+`<td class="cL st">${r.liveTotal!=null?fmtInt(r.liveTotal):d}</td>`+
     ce(r.date,"feedIn",null,"cF",r.inSum?fmt(r.inSum):d)+ce(r.date,"tozin",null,"cF",r.tzSum?fmt(r.tzSum):d)+`<td class="cF st">${(r.cumInTot||r.cumTzTot)?fmt(r.stock):d}</td>`+
     types.map(t=>`<td class="cF sm">${(r.cumInTot||r.cumTzTot)?fmt(r.stockBy[t]||0):d}</td>`).join("")+
     ce(r.date,"meals",null,r.mealsOwn?"":"inh",r.meals!=null?toFa(r.meals):d)+ce(r.date,"dama",null,r.damaOwn?"":"inh",r.dama!=null?fmt(r.dama):d)+ce(r.date,"khamooshi",null,r.khOwn?"":"inh",r.kh?esc(r.kh):d)+
     V.map(s=>ce(r.date,"avgW",s,"cW",r.en.avgW[s]!=null?fmtW(r.en.avgW[s]):d)).join("")+`<td class="cW">${r.farmW?fmt(Math.round(r.farmW)):d}</td><td class="cW st">${r.fcr?fmtDec(r.fcr,3):d}</td>`+
     V.map(s=>{const ct=courseTexts(r.date,s);const t=[ct.join(" · "),r.en.daru[s],r.en.vacc[s]?"واکسن: "+r.en.vacc[s]:""].filter(Boolean);return ce(r.date,"daru",s,"txc",t.length?t.map((x,i)=>i===0&&ct.length?`<span class="anti">${esc(x)}</span>`:esc(x)).join("<br>"):d);}).join("")+
     ce(r.date,"notes",null,"txc",r.en.notes?esc(r.en.notes):d)+`</tr>`;
  });
  const tot=k=>V.map(s=>rows.reduce((a,r)=>a+(r[k][s]||0),0));
  h+=`</tbody><tfoot><tr><td class="fz fz1">جمع</td><td class="fz fz2"></td><td></td>`+
    tot("tal").map(x=>`<td class="cT">${fmtInt(x)}</td>`).join("")+`<td class="cT">${fmtInt(last.cumTalTot)}</td>`+
    tot("hazf").map(x=>`<td class="cH">${fmtInt(x)}</td>`).join("")+`<td class="cH">${fmtInt(last.cumHazfTot)}</td>`+
    V.map(s=>`<td class="cL">${last.live[s]!=null?fmtInt(last.live[s]):"—"}</td>`).join("")+`<td class="cL">${last.liveTotal!=null?fmtInt(last.liveTotal):"—"}</td>`+
    `<td class="cF">${fmt(last.cumInTot)}</td><td class="cF">${fmt(last.cumTzTot)}</td><td class="cF">${fmt(last.stock)}</td>`+types.map(t=>`<td class="cF sm">${fmt(last.stockBy[t]||0)}</td>`).join("")+
    `<td colspan="3"></td><td colspan="${V.length*2+3}"></td></tr></tfoot></table></div>
    <div class="legendRow"><span><span class="sOk">✓</span> ارسال شده</span><span><span class="sCh">⚠</span> تغییر بعد از ارسال</span><span><span class="sNo">●</span> ارسال نشده</span><span class="inh">کم‌رنگ = تکرار از روز قبل</span></div></div>`;
  return h;
}

/* ---------- گزارش: بازبینی و ارسال ---------- */
function checklist(r){
  const V=visIdx();
  const it=(ok,label,opt)=>`<span class="ck ${ok?"ok":opt?"opt":"miss"}">${ok?"✓":opt?"○":"✗"} ${label}</span>`;
  return it(V.every(s=>r.tal[s]!=null),"تلفات همه سالن‌ها")+it(r.hasHazf,"حذفی",true)+it(r.tzSum>0,"توزین دان",true)+it(r.meals!=null,"وعده",true)+it(r.dama!=null,"دما",true)+it(!!r.kh,"خاموشی",true)+it(r.hasAnyDaru,"دارو",true)+it(V.some(s=>r.en.avgW[s]!=null),"وزن‌کشی",true)+it(!!r.en.notes,"توضیحات",true);
}
function reportView(rows){
  const sel=state.selDay||defaultSel();const r=rows.find(x=>x.date===sel)||rows[rows.length-1];
  const ss=r.entry?sentStatus(r.date):"none";const s=state.sent[r.date];
  const strip=[...rows].reverse().map(x=>{const st=x.entry&&x.hasTal?sentStatus(x.date):"empty";return `<button class="dc ${st}${x.date===r.date?" on":""}" onclick="state.selDay='${x.date}';render()"><span class="dcw">${WD_SHORT[(keyToJdn(x.date)+2)%7]}</span><b>${toFa(parseKey(x.date).d)}</b><span class="dci">${st==="sent"?"✓":st==="changed"?"⚠":st==="none"?"●":""}</span></button>`;}).join("");
  const status=ss==="sent"?`<div class="sbar ok">✓ ارسال شده — ${fmtSentAt(s.at)} <button class="mini" onclick="unmarkSent('${r.date}')">برداشتن علامت</button></div>`
    :ss==="changed"?`<div class="sbar ch">⚠ بعد از ارسال (${fmtSentAt(s.at)}) تغییر کرده — نسخه‌ی جدید را بفرستید <button class="mini" onclick="markSent('${r.date}');render()">علامت ارسال</button></div>`
    :`<div class="sbar no">● هنوز ارسال نشده <button class="mini" onclick="markSent('${r.date}');render();flash('علامت ارسال خورد')">علامت ارسال‌شده</button></div>`;
  return `<div class="card"><div class="cardHead"><div class="cardTitle">📄 گزارش روزانه</div><div class="hint">${r.weekday} ${longDate(r.date)} · سن ${toFa(r.age)}</div></div>
   <div class="dstrip" id="dstrip">${strip}</div>
   ${status}
   <div class="cklist">${checklist(r)}</div>
   <div class="actRow"><button class="btn big primary grow" data-busy="day" onclick="exportDay(true)">📤 ارسال گزارش (واتساپ/تلگرام)</button></div>
   <div class="actRow"><button class="btn ghost" data-busy="day" onclick="exportDay(false)">⬇ دانلود JPG</button><button class="btn ghost" onclick="openEditor('${r.date}')">✏️ ویرایش کامل روز</button><button class="btn ghost" onclick="state.input='';go('add')">＋ ثبت</button></div>
   <div class="fname">نام فایل: ${esc(dayFileName(r))}</div>
   <div class="paperBox" id="paperBox"><div class="paperInner" id="paperInner">${sheetHTML(r)}</div></div></div>
   <div class="card"><div class="cardHead"><div class="cardTitle">📚 گزارش تجمیعی دوره (PDF)</div></div>
   <div class="actRow"><button class="btn gold" data-busy="agg" onclick="exportAgg(true)">📤 اشتراک PDF تجمیعی</button><button class="btn ghost" data-busy="agg" onclick="exportAgg(false)">⬇ دانلود PDF</button><button class="btn ghost" onclick="state.showFcr=true;renderModal()">🧮 ضریب تبدیل آخر دوره</button></div>
   <div class="fname">${esc(aggFileName())} · A5 افقی · از ${shortDate(rows[0].date)} تا ${shortDate(rows[rows.length-1].date)}</div></div>`;
}
function fitPaper(){
  const box=document.getElementById("paperBox"),inner=document.getElementById("paperInner");if(!box||!inner)return;
  const sheet=inner.firstElementChild;if(!sheet)return;
  const W=sheet.offsetWidth,Hh=sheet.offsetHeight;const sc=Math.min(1,(box.clientWidth-2)/W);
  inner.style.transform=`scale(${sc})`;inner.style.transformOrigin="top right";box.style.height=(Hh*sc+2)+"px";
}

/* ---------- تنظیمات ---------- */
function settingsView(){
  const s=state.settings;const dict=Object.keys(s.dict||{});
  return `<div class="card"><div class="cardTitle">💾 پشتیبان و انتقال داده</div>
   <div class="hint" style="margin:4px 0 10px">داده‌ها فقط روی همین دستگاه و همین آدرس ذخیره می‌شوند. برای انتقال به گوشی/آدرس دیگر: اینجا «پشتیبان» بگیرید و در مقصد «بازگردانی» کنید.${s.lastBackup?"<br>آخرین پشتیبان: "+fmtSentAt(new Date(s.lastBackup).toISOString()):""}</div>
   <div class="actRow"><button class="btn primary" onclick="exportBackup()">⬇ گرفتن پشتیبان</button><label class="btn ghost">⬆ بازگردانی از فایل<input type="file" accept=".json,application/json" hidden onchange="importBackup(this.files[0]);this.value=''"></label></div></div>
   <div class="card settings"><div class="cardTitle">🏠 مشخصات مرغداری</div><div class="setGrid">
   <div class="field"><label>نام مرغداری</label><input value="${esc(s.farmName)}" oninput="setSetting('farmName',this.value)"></div>
   <div class="field"><label>نام شرکت (مادر)</label><input value="${esc(s.company)}" oninput="setSetting('company',this.value)"></div>
   <div class="field"><label>نژاد</label><input value="${esc(s.breed)}" oninput="setSetting('breed',this.value)"></div>
   <div class="field"><label>نام و سن گله مادر</label><input value="${esc(s.mother)}" oninput="setSetting('mother',this.value)"></div>
   <div class="field"><label>تاریخ جوجه‌ریزی</label><input value="${esc(s.start)}" oninput="if(validKey(normText(this.value)))setSetting('start',normText(this.value))" placeholder="1405/07/04"></div></div>
   <div class="subT">سالن‌ها (حداکثر ۶)</div><div class="hallList">${s.halls.map((hh,i)=>`<div class="hallRow${hh.hidden?" hid":""}"><i class="hd" style="background:${HALL_COLORS[i]}"></i><input value="${esc(hh.name)}" oninput="setHall(${i},'name',this.value)"><input type="number" inputmode="numeric" value="${hh.initial==null?"":hh.initial}" placeholder="تعداد اولیه" oninput="setHall(${i},'initial',this.value)"><label><input type="checkbox"${hh.hidden?"":" checked"} onchange="setHall(${i},'hidden',this.checked);render()"> نمایش</label>${!hh.hidden?`<button class="mini danger" onclick="removeHall(${i})">${i===s.halls.length-1&&!hallHasData(i)&&s.halls.length>1?"حذف":"مخفی"}</button>`:""}</div>`).join("")}
   ${s.halls.length<MAXH?`<button class="btn ghost small" onclick="addHall()">+ افزودن سالن</button>`:""}</div>
   <div class="actRow" style="margin-top:10px"><button class="btn primary" onclick="applySettings()">ذخیره و اعمال</button></div></div>
   <div class="card"><div class="cardTitle">🧠 واژه‌نامه‌ی شخصی کادر</div><div class="dictRow" style="margin-top:8px"><input id="dictW" placeholder="واژه یا عبارت، مثلا: پخ"><select id="dictC">${["notes","daru","vacc","ignore"].map(c=>`<option value="${c}">${CAT_LABEL[c]}</option>`).join("")}</select><button class="btn ghost small" onclick="addDict()">افزودن</button></div>
   <div class="dictList">${dict.length?dict.map(w=>`<span class="chip">${esc(w)} → ${CAT_LABEL[s.dict[w]]} <button class="x" onclick="delDict('${esc(w).replace(/'/g,"\\'")}')">×</button></span>`).join(""):'<span class="hint">خالی — از پیش‌نمایش با «یادم بماند» هم اضافه می‌شود</span>'}</div></div>
   <div class="card"><div class="cardTitle">⚠️ ناحیه‌ی خطر</div><div class="actRow" style="margin-top:8px"><button class="btn danger small" onclick="resetAll()">بازنشانی کامل دوره</button></div></div>
   <div class="ver">دفتر پرورش ${esc(s.farmName)} · نسخه ${toFa(APP_VERSION)}</div>`;
}

/* ---------- رندر اصلی ---------- */
function render(){
  const app=document.getElementById("app"),rows=compute(),st=state.settings;
  const today=effToday(),ovr=st.todayOv&&st.todayOvOn===phoneToday();
  let h=`<header class="top"><img class="logo" src="${LOGO}" alt=""><div class="ttl"><h1>${esc(st.farmName)}</h1><p>${esc(st.company)} · ${esc(st.breed)} · دوره ${longDate(st.start)}</p></div>
   <div class="todayBox${ovr?" ovr":""}"><button class="arrow" onclick="shiftToday(-1)" aria-label="روز قبل">›</button>${state.editToday?`<input id="todayIn" value="${toFa(today)}" inputmode="numeric" onkeydown="if(event.key==='Enter')setTodayFrom()"><button class="mini" onclick="setTodayFrom()">✓</button>`:`<div class="tdM" onclick="state.editToday=true;render()"><b>${weekdayOfKey(today)} ${shortDate(today)}</b><span>سن ${toFa(keyToJdn(today)-keyToJdn(st.start)+1)}${ovr?" · دستی":""}</span></div>`}<button class="arrow" onclick="shiftToday(1)" aria-label="روز بعد">‹</button>${ovr?`<button class="mini" onclick="resetToday()" title="تاریخ گوشی">📱</button>`:""}</div></header>`;
  if(state.swUpdate)h+=`<div class="banner"><span>نسخه‌ی جدید اپ آماده است</span><button class="btn primary small" onclick="location.reload()">به‌روزرسانی</button></div>`;
  if(state.firstRun)h+=`<div class="banner gold"><span>👋 اولین بار است این آدرس را باز می‌کنید. اگر داده‌ها در فایل/آدرس قبلی است، آنجا «پشتیبان» بگیرید و اینجا بازگردانی کنید.</span><label class="btn primary small">⬆ بازگردانی<input type="file" accept=".json,application/json" hidden onchange="importBackup(this.files[0]);this.value=''"></label><button class="mini" onclick="state.firstRun=false;render()">بعداً</button></div>`;
  h+=`<main>`+(state.view==="add"?addView():state.view==="table"?tableView(rows):state.view==="report"?reportView(rows):state.view==="settings"?settingsView():homeView(rows))+`</main>`;
  app.innerHTML=h+navHTML();
  const ta=document.getElementById("composerInput");
  if(ta){ta.oninput=()=>{state.input=ta.value;liveUpdate();};ta.addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();state.input=ta.value;submit();}});}
  if(state.view==="report"){fitPaper();const ds=document.querySelector(".dc.on");if(ds)ds.scrollIntoView({block:"nearest",inline:"center"});}
  if(state.view==="table"){const t=document.getElementById("tScroll"),tr=t&&t.querySelector("tr.today");if(tr&&!render._scrolled){t.scrollTop=Math.max(0,tr.offsetTop-120);render._scrolled=true;}}
  renderModal();renderToast();renderBusy();
}
function renderToast(){const t=document.getElementById("toast");t.innerHTML=state.toast?`<div class="toast">${esc(state.toast)}</div>`:"";}
function renderModal(){
  const root=document.getElementById("modalRoot");let h="";
  const wrap=(inner,cls,close)=>`<div class="modalWrap" onclick="if(event.target===this){${close};renderModal();}"><div class="modal ${cls||""}">${inner}</div></div>`;
  if(state.pendingDelete){
    const {cmd}=state.pendingDelete;const what=cmd.wholeDay?`کل اطلاعات روز ${longDate(cmd.date)}`:`${FIELD_LABELS[cmd.field]||"این داده"}${cmd.salon!=null?" "+hallName(cmd.salon):""} در روز ${longDate(cmd.date)}`;
    h=wrap(`<div class="modalIcon">🗑️</div><div class="modalTitle">تأیید حذف</div><div class="modalText">${what} حذف می‌شود.</div><div class="modalBtns"><button class="btn ghost" onclick="state.pendingDelete=null;renderModal()">انصراف</button><button class="btn danger" onclick="confirmDelete()">بله، حذف کن</button></div>`,"","state.pendingDelete=null");
  }else if(state.confirm){
    h=wrap(`<div class="modalIcon">❓</div><div class="modalTitle">تأیید</div><div class="modalText">${esc(state.confirm.text)}</div><div class="modalBtns"><button class="btn ghost" onclick="state.confirm=null;renderModal()">انصراف</button><button class="btn primary" onclick="const f=state.confirm.ok;state.confirm=null;renderModal();f()">بله</button></div>`,"","state.confirm=null");
  }else if(state.cellEdit){
    const c=state.cellEdit,en=state.entries.find(e=>e.date===c.date)||blankEntry(c.date);
    const title=`${CELL_LABEL[c.f]}${c.h!=null?" — "+esc(hallName(c.h)):""}`;
    let body;
    if(c.f==="tozin"||c.f==="feedIn")body=`<div class="egrid" style="grid-template-columns:90px 1fr">${feedTypesUsed().map((t,i)=>`<div class="el">${t}</div><input id="cellF${i}" class="ein" inputmode="decimal" value="${en[c.f][t]?toFa(en[c.f][t]):""}">`).join("")}</div><input id="cellIn" type="hidden">`;
    else{const cur=c.h!=null?en[c.f][c.h]:en[c.f];const num=["tal","hazf","avgW","dama","meals"].includes(c.f);
      body=(c.f==="notes"||c.f==="daru")?`<textarea id="cellIn" class="ein wide" rows="3">${esc(cur||"")}</textarea>`:`<input id="cellIn" class="ein big" ${num?'inputmode="decimal"':""} value="${cur==null?"":esc(num?toFa(cur):cur)}" onkeydown="if(event.key==='Enter'){state.cellNext=${["tal","hazf","avgW"].includes(c.f)};saveCell();}">`;
      if(c.f==="daru"&&courseTexts(c.date,c.h).length)body+=`<div class="hint">دوره‌ی آنتی (خودکار): ${esc(courseTexts(c.date,c.h).join(" · "))}</div>`;}
    const hasNext=c.h!=null&&["tal","hazf","avgW"].includes(c.f)&&visIdx().some(s=>s>c.h);
    h=wrap(`<div class="modalTitle">${title}</div><div class="hint" style="margin-bottom:8px">${weekdayOfKey(c.date)} ${longDate(c.date)} · خالی = پاک شدن</div>${body}
    <div class="modalBtns"><button class="btn ghost" onclick="state.cellEdit=null;renderModal()">انصراف</button>${hasNext?`<button class="btn ghost" onclick="state.cellNext=true;saveCell()">ذخیره و سالن بعد ›</button>`:""}<button class="btn primary" onclick="state.cellNext=false;saveCell()">ذخیره</button></div>`,"sheetM","state.cellEdit=null");
  }else if(state.dayMenu){
    const d=state.dayMenu;const has=state.entries.some(e=>e.date===d);
    h=wrap(`<div class="modalTitle">${weekdayOfKey(d)} ${longDate(d)}</div><div class="menuL">
      <button class="btn ghost" onclick="state.dayMenu=null;state.selDay='${d}';go('report')">📄 گزارش و ارسال این روز</button>
      <button class="btn ghost" onclick="state.dayMenu=null;openEditor('${d}')">✏️ ویرایش کامل روز</button>
      <button class="btn ghost" onclick="state.dayMenu=null;state.input='${toFa(parseKey(d).d)} ${MONTH_NAMES_FA[parseKey(d).m]}\\n';go('add')">＋ ثبت متن برای این روز</button>
      ${has?`<button class="btn danger" onclick="state.dayMenu=null;askDeleteDay('${d}')">🗑️ حذف کل روز</button>`:""}</div>
      <div class="modalBtns"><button class="btn ghost" onclick="state.dayMenu=null;renderModal()">بستن</button></div>`,"sheetM","state.dayMenu=null");
  }else if(state.showFcr){
    const rows=compute(),l=rows[rows.length-1],fw=state.settings.finalWeight;
    const res=fw&&l.cumTzTot?l.cumTzTot/fw:null;
    h=wrap(`<div class="modalTitle">🧮 ضریب تبدیل آخر دوره</div><div class="modalText">ضریب = کل دان توزین‌شده ÷ کل وزن زنده‌ی تولیدشده</div>
     <div class="fcrGrid"><div>کل توزین دوره</div><b>${fmt(l.cumTzTot)} کیلو</b><div>کل وزن زنده (کیلو)</div><input id="fw" inputmode="decimal" value="${fw==null?"":fw}" oninput="setFinalWeight()" placeholder="مثلا ۱۲۰٬۰۰۰"></div>
     <div class="fcrRes">${res?`ضریب تبدیل: <b>${fmtDec(res,3)}</b>${l.liveTotal?`<div class="hint">میانگین وزن هر قطعه: ${fmtW(Math.round(fw/l.liveTotal*1000)/1000)} کیلو (با موجودی ${fmtInt(l.liveTotal)})</div>`:""}`:"وزن زنده‌ی کل را وارد کنید"}</div>
     <div class="modalBtns"><button class="btn primary" onclick="state.showFcr=false;render()">بستن</button></div>`,"","state.showFcr=false");
  }else if(state.editCourse){
    const c=state.courses.find(x=>x.id===state.editCourse);
    if(c)h=wrap(`<div class="modalTitle">ویرایش دوره‌ی دارویی</div><div class="field"><label>نام دارو</label><input id="ec_name" class="ein wide" value="${esc(c.name)}"></div>
     <div class="field"><label>سالن‌ها</label><div class="hallChecks">${state.settings.halls.map((hh,i)=>`<label><input type="checkbox" id="ec_h${i}"${c.halls.includes(i)?" checked":""}> ${esc(hh.name)}</label>`).join("")}</div></div>
     <div class="egrid two"><div class="el">تاریخ شروع</div><input id="ec_start" class="ein" value="${c.start}"><div class="el">ساعت شروع</div><input id="ec_st" class="ein" value="${esc(c.startTime||"")}">
     <div class="el">تاریخ پایان</div><input id="ec_end" class="ein" value="${c.end||""}" placeholder="خالی = باز"><div class="el">ساعت پایان</div><input id="ec_et" class="ein" value="${esc(c.endTime||"")}"></div>
     <div class="modalBtns"><button class="btn danger small" onclick="deleteCourse()">حذف دوره</button><span style="flex:1"></span><button class="btn ghost" onclick="state.editCourse=null;renderModal()">انصراف</button><button class="btn primary" onclick="saveCourse()">ذخیره</button></div>`,"edit","state.editCourse=null");
  }else if(state.editing){
    const date=state.editing,rows=compute(),V=visIdx(),types=feedTypesUsed();
    const r=rows.find(x=>x.date===date)||{age:keyToJdn(date)-keyToJdn(state.settings.start)+1,weekday:weekdayOfKey(date)};const en=state.entries.find(e=>e.date===date)||blankEntry(date);
    const ni=(id,val)=>`<input id="${id}" class="ein" inputmode="decimal" value="${val==null||val===""?"":esc(toFa(val))}">`;
    const ti=(id,val)=>`<input id="${id}" class="ein" value="${esc(val||"")}">`;
    const cols=`grid-template-columns:86px repeat(${V.length},1fr)`;
    h=wrap(`<div class="modalTitle">ویرایش ${r.weekday} ${longDate(date)} — سن ${toFa(r.age)}</div>
    <div class="egrid" style="${cols}"><div class="eh"></div>${V.map(s=>`<div class="eh" style="color:${HALL_COLORS[s]}">${esc(hallName(s))}</div>`).join("")}
    <div class="el">تلفات</div>${V.map(s=>ni("e_tal"+s,en.tal[s])).join("")}
    <div class="el">حذفی</div>${V.map(s=>ni("e_hazf"+s,en.hazf[s])).join("")}
    <div class="el">میانگین وزن</div>${V.map(s=>ni("e_avgW"+s,en.avgW[s])).join("")}
    <div class="el">آب</div>${V.map(s=>ti("e_water"+s,en.water[s])).join("")}
    <div class="el">دارو / مکمل</div>${V.map(s=>ti("e_daru"+s,en.daru[s])).join("")}
    <div class="el">واکسن</div>${V.map(s=>ti("e_vacc"+s,en.vacc[s])).join("")}</div>
    <div class="egrid three"><div class="el">دما</div>${ni("e_dama",en.dama)}<div class="el">خاموشی</div>${ti("e_kh",en.khamooshi)}<div class="el">وعده</div>${ni("e_meals",en.meals)}</div>
    <div class="egrid" style="grid-template-columns:86px 1fr 1fr"><div class="eh">نوع دان</div><div class="eh">ورودی (کیلو)</div><div class="eh">توزین (کیلو)</div>
    ${types.map((t,i)=>`<div class="el">${t}</div>${ni("e_in"+i,en.feedIn[t])}${ni("e_tz"+i,en.tozin[t])}`).join("")}</div>
    <div class="field"><label>توضیحات</label><textarea id="e_notes" class="ein wide" rows="2">${esc(en.notes)}</textarea></div>
    <div class="field"><label>اقلام ورودی و خروجی (اضافه بر دان)</label><textarea id="e_items" class="ein wide" rows="2">${esc(en.items)}</textarea></div>
    <div class="modalBtns"><button class="btn ghost" onclick="state.editing=null;renderModal()">انصراف</button><button class="btn primary" onclick="saveEditor()">ذخیره</button></div>`,"edit","state.editing=null");
  }
  root.innerHTML=h;
}
const WD_SHORT=["ش","۱ش","۲ش","۳ش","۴ش","۵ش","ج"];
const MONTH_NAMES_FA=["","فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
window.addEventListener("resize",fitPaper);
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol)){
  navigator.serviceWorker.register("sw.js").then(reg=>{
    reg.addEventListener("updatefound",()=>{const w=reg.installing;if(!w)return;w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller){state.swUpdate=true;render();}});});
    setInterval(()=>reg.update().catch(()=>{}),3600e3);
  }).catch(()=>{});
}
if(navigator.storage&&navigator.storage.persist){navigator.storage.persist().catch(()=>{});}
load();render();
setInterval(()=>{const t=effToday();if(t!==render._day){render._day=t;render();}},60000);render._day=effToday();
