/* ================= اکشن‌ها ================= */
function flash(m){state.toast=m;renderToast();clearTimeout(flash._t);flash._t=setTimeout(()=>{state.toast="";renderToast();},2800);}
function hasData(p){return p.tal.some(x=>x!=null)||p.hazf.some(x=>x!=null)||p.avgW.some(x=>x!=null)||p.water.some(x=>x)||p.daru.some(x=>x)||p.vacc.some(x=>x)||p.dama!=null||p.khamooshi||p.meals!=null||p.feed.length||p.notes||p.items||p.copyDaru||p.unknown.some(u=>{const a=unkA(u);return a.cat&&a.cat!=="ignore";});}
function applyParse(p,msgs){
  if(hasData(p)){
    let e=state.entries.find(x=>x.date===p.date);const isNew=!e;e=e?clone(e):blankEntry(p.date);
    for(let h=0;h<MAXH;h++){
      if(p.tal[h]!=null)e.tal[h]=p.tal[h];if(p.hazf[h]!=null)e.hazf[h]=p.hazf[h];if(p.avgW[h]!=null)e.avgW[h]=p.avgW[h];
      if(p.water[h])e.water[h]=p.water[h];if(p.daru[h])e.daru[h]=p.daru[h];if(p.vacc[h])e.vacc[h]=p.vacc[h];
    }
    if(p.copyDaru){const pr=state.entries.find(x=>x.date===addDays(p.date,-1));if(pr)for(let h=0;h<MAXH;h++)if(!p.daru[h]&&pr.daru[h])e.daru[h]=pr.daru[h];}
    if(p.dama!=null)e.dama=p.dama;if(p.khamooshi)e.khamooshi=p.khamooshi;if(p.meals!=null)e.meals=p.meals;
    const touched={in:{},tozin:{}};
    p.feed.forEach(f=>{const t=f.mode==="tozin"?TZ:(f.type||defaultFeedType(p.date));const o=f.mode==="tozin"?e.tozin:e.feedIn;const tk=f.mode==="tozin"?"tozin":"in";
      if(p.replace&&!touched[tk][t]){o[t]=0;touched[tk][t]=1;}o[t]=(o[t]||0)+f.kg;});
    if(p.notes)e.notes=e.notes?e.notes+" | "+p.notes:p.notes;
    if(p.items)e.items=e.items?e.items+" | "+p.items:p.items;
    p.unknown.forEach(u=>{const a=unkA(u);if(!a.cat)return;
      if(a.cat==="notes")e.notes=e.notes?e.notes+" | "+u:u;
      else if(a.cat==="daru")visIdx().forEach(h=>e.daru[h]=e.daru[h]?e.daru[h]+"، "+u:u);
      else if(a.cat==="vacc")visIdx().forEach(h=>e.vacc[h]=e.vacc[h]?e.vacc[h]+"، "+u:u);
      if(a.remember&&!a.auto){state.settings.dict[u.toLowerCase()]=a.cat;}});
    if(isNew){state.entries.push(e);sortEntries();}else state.entries=state.entries.map(x=>x.date===p.date?e:x);
    msgs.push((isNew?"ثبت ":"افزوده به ")+shortDate(p.date));
  }
  p.anti.forEach(a=>{
    const date=a.date||p.date,hs=a.halls||visIdx();
    if(a.mode==="start"){
      if(!a.name){msgs.push("نام داروی آنتی پیدا نشد");return;}
      state.courses.push({id:"c"+Date.now()+Math.floor(Math.random()*1000),name:a.name,halls:hs,start:date,startTime:a.time||"",end:null,endTime:"",confirmed:date});
      msgs.push("دوره "+a.name+" شروع شد");
    }else{
      const open=state.courses.filter(c=>!c.end&&c.halls.some(h=>hs.includes(h))&&(!a.name||c.name.includes(a.name)||a.name.includes(c.name)));
      if(!open.length){msgs.push("دوره‌ی باز پیدا نشد");return;}
      open.forEach(c=>{if(a.mode==="end"){c.end=date<c.start?c.start:date;c.endTime=a.time||"";}else c.confirmed=effToday();});
      msgs.push(a.mode==="end"?"پایان دوره ثبت شد":"ادامه‌ی دوره تأیید شد");
    }
  });
}
function submit(){
  const inp=state.input;if(!inp.trim())return;
  const cmd=detectCommand(inp);
  if(cmd.type==="delete"){
    const target=state.entries.find(e=>e.date===cmd.date);
    if(!cmd.date||!target){flash("روز موردنظر پیدا نشد — تاریخ را بنویسید");return;}
    state.pendingDelete={cmd,target};renderModal();return;
  }
  const ps=parseMulti(inp);
  if(!ps.some(p=>hasData(p)||p.anti.length)){flash("چیزی تشخیص داده نشد");return;}
  if(ps.some(p=>p.date<state.settings.start)){flash("تاریخی قبل از شروع دوره است");return;}
  const msgs=[];ps.forEach(p=>applyParse(p,msgs));
  state.input="";state.unk={};save();
  const dates=ps.filter(p=>hasData(p)).map(p=>p.date);
  if(dates.length){state.selDay=dates[dates.length-1];state.view="report";}
  render();window.scrollTo(0,0);flash(msgs.join(" · ")||"ثبت شد");
}
/* وضعیت ارسال گزارش روزانه */
function daySig(date){
  const r=compute().find(x=>x.date===date);if(!r)return "";
  const V=visIdx();
  return JSON.stringify([V.map(s=>[r.tal[s],r.hazf[s],r.en.avgW[s],r.en.water[s],r.daruFull[s],r.en.vacc[s]]),r.tzSum,r.en.feedIn,r.dama,r.kh,r.meals,r.en.notes,r.en.items]);
}
function sentStatus(date){const s=state.sent[date];if(!s)return "none";return s.sig===daySig(date)?"sent":"changed";}
function markSent(date,how){state.sent[date]={at:new Date().toISOString(),sig:daySig(date),how:how||"manual"};save();}
function unmarkSent(date){delete state.sent[date];save();render();flash("علامت ارسال برداشته شد");}
function fmtSentAt(iso){try{const d=new Date(iso);return jdnToKey(g2d(d.getFullYear(),d.getMonth()+1,d.getDate())).slice(5).replace("/","/")+" ساعت "+pad2(d.getHours())+":"+pad2(d.getMinutes());}catch(e){return "";}}
/* ویرایش سلولی در جدول */
const CELL_LABEL={tal:"تلفات",hazf:"حذفی",avgW:"میانگین وزن (کیلو)",water:"آب",daru:"دارو / مکمل",vacc:"واکسن",dama:"دما",khamooshi:"خاموشی",meals:"وعده",notes:"توضیحات",items:"اقلام",tozin:"توزین (کیلو)",feedIn:"ورود دان (کیلو)"};
function openCell(date,f,h){state.cellEdit={date,f,h:h==null?null:+h};renderModal();setTimeout(()=>{const el=document.getElementById("cellIn");if(el){el.focus();el.select&&el.select();}},50);}
function saveCell(){
  const c=state.cellEdit;if(!c)return;
  let e=state.entries.find(x=>x.date===c.date);const isNew=!e;e=e?clone(e):blankEntry(c.date);
  const raw=gv("cellIn").trim();
  if(["tal","hazf"].includes(c.f)){const v=numOf(raw);e[c.f][c.h]=v==null?null:Math.round(v);}
  else if(c.f==="avgW"){let v=numOf(raw);if(v!=null&&v>20)v=v/1000;e.avgW[c.h]=v;}
  else if(c.f==="water")e.water[c.h]=raw;
  else if(c.f==="daru"||c.f==="vacc"){
    // «همه» در متن = برای همه‌ی سالن‌ها
    const ALL=/(^|[\s،,(])(?:برای\s*)?(?:همه|همه‌ی|همه ی|کل|تمام)(?:\s*(?:سالن\s*ها|سالنها|سالن‌ها|سالن))?(?=$|[\s،,)])/;
    const n=normText(raw);
    if(ALL.test(n)){const t=n.replace(ALL,"$1").replace(/\s+/g," ").replace(/^[\s،,]+|[\s،,]+$/g,"").trim();visIdx().forEach(h=>e[c.f][h]=t);}
    else e[c.f][c.h]=raw;
  }
  else if(c.f==="dama"||c.f==="meals"){const v=numOf(raw);e[c.f]=v==null?null:(c.f==="meals"?Math.round(v):v);}
  else if(c.f==="feedIn"){e.feedIn={};feedTypesUsed().forEach((t,i)=>{const v=numOf(gv("cellF"+i));if(v)e.feedIn[t]=v;});}
  else if(c.f==="tozin"){const v=numOf(raw);e.tozin=v?{[TZ]:v}:{};}
  else e[c.f]=raw;
  if(isNew){state.entries.push(e);sortEntries();}else state.entries=state.entries.map(x=>x.date===c.date?e:x);
  // انتقال به سلول بعدی (تلفات/حذفی سالن بعد)
  const next=c.h!=null&&["tal","hazf","avgW"].includes(c.f)?visIdx().find(s=>s>c.h):undefined;
  state.cellEdit=null;save();render();
  if(next!==undefined&&state.cellNext)openCell(c.date,c.f,next);
}
function confirmDelete(){
  const {cmd,target}=state.pendingDelete;
  if(cmd.wholeDay){state.entries=state.entries.filter(e=>e!==target);flash("روز "+longDate(cmd.date)+" پاک شد");}
  else{
    const c=clone(target),f=cmd.field;
    if(["tal","hazf","avgW"].includes(f)){if(cmd.salon!=null)c[f][cmd.salon]=null;else c[f]=arrOf(null);}
    else if(["daru","vacc","water"].includes(f)){if(cmd.salon!=null)c[f][cmd.salon]="";else c[f]=arrOf("");}
    else if(f==="feedIn"||f==="tozin")c[f]={};
    else if(f==="dama"||f==="meals")c[f]=null;
    else c[f]="";
    state.entries=state.entries.map(e=>e===target?c:e);flash(FIELD_LABELS[f]+" روز "+longDate(cmd.date)+" پاک شد");
  }
  state.pendingDelete=null;state.input="";save();render();
}
function askDeleteDay(date){state.confirm={text:"کل اطلاعات روز "+longDate(date)+" حذف شود؟",ok:()=>{state.entries=state.entries.filter(e=>e.date!==date);save();render();flash("روز حذف شد");}};renderModal();}
function openEditor(date){state.editing=date;renderModal();}
const gv=id=>{const el=document.getElementById(id);return el?el.value:"";};
function saveEditor(){
  const date=state.editing;const idx=state.entries.findIndex(e=>e.date===date);
  const e=idx>=0?clone(state.entries[idx]):blankEntry(date);
  visIdx().forEach(s=>{
    const tv=numOf(gv("e_tal"+s)),hv=numOf(gv("e_hazf"+s));let w=numOf(gv("e_avgW"+s));if(w!=null&&w>20)w=w/1000;
    e.tal[s]=tv==null?null:Math.round(tv);e.hazf[s]=hv==null?null:Math.round(hv);e.avgW[s]=w;
    e.daru[s]=gv("e_daru"+s).trim();e.vacc[s]=gv("e_vacc"+s).trim();e.water[s]=gv("e_water"+s).trim();
  });
  e.dama=numOf(gv("e_dama"));e.khamooshi=gv("e_kh").trim();const m=numOf(gv("e_meals"));e.meals=m==null?null:Math.round(m);
  e.feedIn={};e.tozin={};
  feedTypesUsed().forEach((t,i)=>{const a=numOf(gv("e_in"+i));if(a)e.feedIn[t]=a;});
  {const u=numOf(gv("e_tz"));if(u)e.tozin[TZ]=u;}
  e.notes=gv("e_notes").trim();e.items=gv("e_items").trim();
  if(idx>=0)state.entries[idx]=e;else{state.entries.push(e);sortEntries();}
  state.editing=null;save();render();flash("ذخیره شد");
}
/* دوره‌ها */
function courseContinue(id){const c=state.courses.find(x=>x.id===id);if(!c)return;c.confirmed=effToday();save();render();flash("ادامه‌ی "+c.name+" — روز "+ordFa(courseDay(c,effToday())));}
function courseEndToggle(id){state.endOpen[id]=!state.endOpen[id];render();}
function courseEnd(id){
  const c=state.courses.find(x=>x.id===id);if(!c)return;
  const t=normText(gv("endT_"+id)).trim();let tm="";const mm=t.match(/(\d{1,2})(?:\s*[:\/،,.]\s*(\d{1,2}))?/);if(mm)tm=pad2(+mm[1])+":"+pad2(mm[2]?+mm[2]:0);
  c.end=effToday()<c.start?c.start:effToday();c.endTime=tm;state.endOpen[id]=false;save();render();flash("پایان "+c.name+(tm?" ساعت "+toFa(tm):""));
}
function openCourse(id){state.editCourse=id;renderModal();}
function saveCourse(){
  const c=state.courses.find(x=>x.id===state.editCourse);if(!c)return;
  const name=gv("ec_name").trim();if(name)c.name=name;
  const hs=[];state.settings.halls.forEach((h,i)=>{const el=document.getElementById("ec_h"+i);if(el&&el.checked)hs.push(i);});if(hs.length)c.halls=hs;
  const sd=normText(gv("ec_start")).trim();if(validKey(sd))c.start=sd;
  c.startTime=normText(gv("ec_st")).trim();
  const ed=normText(gv("ec_end")).trim();c.end=validKey(ed)?ed:null;c.endTime=c.end?normText(gv("ec_et")).trim():"";
  state.editCourse=null;save();render();flash("دوره ذخیره شد");
}
function deleteCourse(){const id=state.editCourse;state.editCourse=null;state.confirm={text:"این دوره‌ی دارویی کامل حذف شود؟",ok:()=>{state.courses=state.courses.filter(c=>c.id!==id);save();render();flash("دوره حذف شد");}};renderModal();}
/* تنظیمات */
function setSetting(k,v){state.settings[k]=v;saveSet();}
function setHall(i,k,v){const h=state.settings.halls[i];if(!h)return;if(k==="initial")h.initial=v===""?null:parseInt(normText(v),10);else if(k==="hidden")h.hidden=!v;else h[k]=v;saveSet();}
function addHall(){const hs=state.settings.halls;if(hs.length>=MAXH){flash("حداکثر ۶ سالن");return;}hs.push({name:"سالن "+toFa(hs.length+1),initial:null,hidden:false});saveSet();render();}
function hallHasData(i){return state.entries.some(e=>e.tal[i]!=null||e.hazf[i]!=null||e.avgW[i]!=null||e.daru[i]||e.vacc[i]);}
function removeHall(i){
  const hs=state.settings.halls;
  if(i===hs.length-1&&!hallHasData(i)&&hs.length>1){hs.pop();saveSet();render();flash("سالن حذف شد");return;}
  hs[i].hidden=true;saveSet();render();flash(hallName(i)+" مخفی شد (داده‌ها حفظ شد)");
}
function addDict(){const w=normText(gv("dictW")).replace(/\u200c/g," ").trim().toLowerCase();const c=gv("dictC");if(!w){flash("واژه را بنویسید");return;}state.settings.dict[w]=c;saveSet();render();flash("به واژه‌نامه اضافه شد");}
function delDict(w){delete state.settings.dict[w];saveSet();render();}
function applySettings(){render();flash("تنظیمات ذخیره شد");}
function resetAll(){state.confirm={text:"همه‌ی داده‌ها پاک و دوره خام (۴ روز واقعی اولیه) بارگذاری شود؟ ابتدا پشتیبان بگیرید.",ok:()=>{state.entries=SEED.map(clone);state.courses=[];state.sent={};state.settings=clone(DEFAULT_SETTINGS);save();saveSet();state.selDay=null;render();flash("بازنشانی شد");}};renderModal();}
/* امروز */
function shiftToday(n){const t=addDays(effToday(),n);state.settings.todayOv=t===phoneToday()?null:t;state.settings.todayOvOn=phoneToday();saveSet();render();}
function setTodayFrom(){const v=normText(gv("todayIn")).trim().replace(/[،,.\-]/g,"/");const m=v.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);if(!m){flash("قالب تاریخ: ۱۴۰۵/۰۷/۱۰");return;}const k=keyOf(+m[1],+m[2],+m[3]);if(!validKey(k)){flash("تاریخ نامعتبر");return;}state.settings.todayOv=k===phoneToday()?null:k;state.settings.todayOvOn=phoneToday();state.editToday=false;saveSet();render();}
function resetToday(){state.settings.todayOv=null;state.editToday=false;saveSet();render();flash("تاریخ گوشی");}
/* پشتیبان */
function exportBackup(){
  const blob=new Blob([JSON.stringify({app:"mehr1405",version:2,appVersion:APP_VERSION,exported:new Date().toISOString(),settings:state.settings,entries:state.entries,courses:state.courses,sent:state.sent},null,1)],{type:"application/json"});
  downloadBlob(blob,state.settings.farmName+"-پشتیبان-"+effToday().replace(/\//g,"،")+".json");state.settings.lastBackup=Date.now();saveSet();render();flash("فایل پشتیبان دانلود شد");
}
function importBackup(file){
  if(!file)return;const rd=new FileReader();
  rd.onload=()=>{try{const d=JSON.parse(rd.result);const ents=Array.isArray(d)?d:d.entries;if(!validEntries(ents))throw 0;
    state.confirm={text:"داده‌های فعلی با فایل پشتیبان جایگزین شود؟",ok:()=>{state.entries=ents.map(normEntry);state.courses=Array.isArray(d.courses)?d.courses:[];state.sent=d.sent&&typeof d.sent==="object"?d.sent:{};state.firstRun=false;if(d.settings)state.settings=normSettings(d.settings);sortEntries();save();saveSet();render();flash("پشتیبان بازگردانی شد");}};renderModal();
  }catch(e){flash("فایل پشتیبان معتبر نیست");}};
  rd.readAsText(file);
}
function setFinalWeight(){const v=numOf(gv("fw"));state.settings.finalWeight=v;saveSet();renderModal();}


/* ویرایش یک روز با کادر متن زیر ردیف جدول */
function toggleDayBox(d){state.dayBox=state.dayBox===d?null:d;state.dayBoxText="";render();if(state.dayBox)setTimeout(()=>{const t=document.getElementById("dayBoxIn"),sc=document.getElementById("tScroll");if(t&&sc){const tr=t.closest("tr"),head=sc.querySelector("thead");sc.scrollTop=Math.max(0,tr.offsetTop-(head?head.offsetHeight:0)-44);t.focus({preventScroll:true});}},60);}
function dayBoxParse(){
  const d=state.dayBox,t=state.dayBoxText||"";if(!d||!t.trim())return null;
  const p=parseEntry(t);p.date=d;p.dateDefault=false;p.replace=true;
  p.anti.forEach(a=>{a.date=d;});return p;
}
function dayBoxSubmit(){
  const p=dayBoxParse();if(!p){flash("متنی ننوشته‌اید");return;}
  if(!hasData(p)&&!p.anti.length){flash("چیزی تشخیص داده نشد");return;}
  const msgs=[];applyParse(p,msgs);state.dayBoxText="";state.unk={};save();render();flash("روز "+shortDate(p.date)+" به‌روز شد");
}
/* ارسال گروهی گزارش‌های روزانه */
function batchToggle(d,on){if(!state.batch)state.batch={};if(on)state.batch[d]=1;else delete state.batch[d];renderBatchBar();}
function batchSelect(mode){
  state.batch={};const rows=compute().filter(r=>r.entry&&r.hasTal);
  if(mode==="unsent")rows.filter(r=>sentStatus(r.date)!=="sent").forEach(r=>state.batch[r.date]=1);
  else if(mode==="all")rows.forEach(r=>state.batch[r.date]=1);
  render();
}
function batchDates(){return Object.keys(state.batch||{}).sort();}
function renderBatchBar(){const el=document.getElementById("batchCount");if(el)el.textContent=toFa(batchDates().length);document.querySelectorAll("[data-batchbtn]").forEach(b=>b.disabled=!batchDates().length||!!state.busy);}
async function batchSend(share){
  const ds=batchDates();if(!ds.length||state.busy)return;
  const already=ds.filter(d=>sentStatus(d)==="sent");
  if(share&&already.length&&!batchSend._ok){state.confirm={text:toFa(already.length)+" روز از انتخاب‌ها قبلاً ارسال شده‌اند. همه دوباره ارسال شوند؟",ok:()=>{batchSend._ok=true;batchSend(true);}};renderModal();return;}
  batchSend._ok=false;state.busy="batch";renderBusy();
  try{
    const files=[];
    for(let i=0;i<ds.length;i++){state.toast="ساخت گزارش "+toFa(i+1)+" از "+toFa(ds.length)+"…";renderToast();const {blob,name}=await makeDayJpg(ds[i]);files.push(new File([blob],name,{type:"image/jpeg"}));}
    state.toast="";renderToast();
    if(share){
      let shared=false;
      try{if(navigator.canShare&&navigator.canShare({files})){await navigator.share({files,title:toFa(files.length)+" گزارش روزانه"});shared=true;}}
      catch(e){if(e&&e.name==="AbortError"){flash("ارسال لغو شد");return;}}
      if(shared){ds.forEach(d=>markSent(d,"share"));state.batch={};render();flash("✓ "+toFa(ds.length)+" گزارش ارسال شد و علامت خورد");return;}
    }
    for(const f of files){downloadBlob(f,f.name);await new Promise(r=>setTimeout(r,400));}
    state.confirm={text:toFa(files.length)+" فایل دانلود شد. اگر آن‌ها را فرستادید، همه علامت «ارسال شد» بخورند؟",ok:()=>{ds.forEach(d=>markSent(d,"manual"));state.batch={};render();flash("علامت خورد");}};renderModal();
  }catch(e){flash("خطا: "+e.message);}finally{state.busy="";renderBusy();}
}
function batchMark(){const ds=batchDates();if(!ds.length)return;ds.forEach(d=>markSent(d,"manual"));state.batch={};render();flash("✓ "+toFa(ds.length)+" روز علامت ارسال خورد");}

/* پس از ارتقای نسخه، امضای روزهای ارسال‌شده بازسازی می‌شود تا بی‌دلیل «⚠ تغییر» نشان ندهند */
function migrateSent(){if(state.settings.sentSigV===2)return;Object.keys(state.sent).forEach(d=>{state.sent[d].sig=daySig(d);});state.settings.sentSigV=2;save();}
