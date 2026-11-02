"use strict";
/* ================= تقویم جلالی ================= */
function div(a,b){return ~~(a/b);}
function mod(a,b){return a-~~(a/b)*b;}
const BREAKS=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
function jalCal(jy){
  let bl=BREAKS.length,gy=jy+621,leapJ=-14,jp=BREAKS[0],jm,jump=0,leap,leapG,march,n,i;
  for(i=1;i<bl;i+=1){jm=BREAKS[i];jump=jm-jp;if(jy<jm)break;leapJ=leapJ+div(jump,33)*8+div(mod(jump,33),4);jp=jm;}
  n=jy-jp;leapJ=leapJ+div(n,33)*8+div(mod(n,33)+3,4);
  if(mod(jump,33)===4&&jump-n===4)leapJ+=1;
  leapG=div(gy,4)-div((div(gy,100)+1)*3,4)-150;march=20+leapJ-leapG;
  if(jump-n<6)n=n-jump+div(jump+4,33)*33;
  leap=mod(mod(n+1,33)-1,4);if(leap===-1)leap=4;
  return {leap,gy,march};
}
function g2d(gy,gm,gd){let d=div((gy+div(gm-8,6)+100100)*1461,4)+div(153*mod(gm+9,12)+2,5)+gd-34840408;d=d-div(div(gy+100100+div(gm-8,6),100)*3,4)+752;return d;}
function d2g(jdn){let j=4*jdn+139361631;j=j+div(div(4*jdn+183187720,146097)*3,4)*4-3908;const i=div(mod(j,1461),4)*5+308;const gd=div(mod(i,153),5)+1;const gm=mod(div(i,153),12)+1;const gy=div(j,1461)-100100+div(8-gm,6);return {gy,gm,gd};}
function j2d(jy,jm,jd){const r=jalCal(jy);return g2d(r.gy,3,r.march)+(jm-1)*31-div(jm,7)*(jm-7)+jd-1;}
function d2j(jdn){
  const gy=d2g(jdn).gy;let jy=gy-621;const r=jalCal(jy);const jdn1f=g2d(gy,3,r.march);let jd,jm,k=jdn-jdn1f;
  if(k>=0){if(k<=185){jm=1+div(k,31);jd=mod(k,31)+1;return {jy,jm,jd};}else k-=186;}
  else{jy-=1;k+=179;if(r.leap===1)k+=1;}
  jm=7+div(k,30);jd=mod(k,30)+1;return {jy,jm,jd};
}
const MONTHS={"فروردین":1,"اردیبهشت":2,"خرداد":3,"تیر":4,"مرداد":5,"شهریور":6,"مهر":7,"آبان":8,"ابان":8,"آذر":9,"اذر":9,"دی":10,"بهمن":11,"اسفند":12};
const MONTH_RE="فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|ابان|آذر|اذر|دی|بهمن|اسفند";
const WD=["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];
const pad2=n=>String(n).padStart(2,"0");
const keyOf=(y,m,d)=>y+"/"+pad2(m)+"/"+pad2(d);
const parseKey=k=>{const [y,m,d]=k.split("/").map(Number);return {y,m,d};};
function validKey(k){if(!/^\d{4}\/\d{2}\/\d{2}$/.test(k))return false;const p=parseKey(k);if(p.m<1||p.m>12||p.d<1||p.d>31||(p.m>6&&p.d>30))return false;return true;}
const keyToJdn=k=>{const p=parseKey(k);return j2d(p.y,p.m,p.d);};
const jdnToKey=j=>{const r=d2j(j);return keyOf(r.jy,r.jm,r.jd);};
const addDays=(k,n)=>jdnToKey(keyToJdn(k)+n);
const weekdayOfKey=k=>WD[(keyToJdn(k)+2)%7];
function phoneToday(){const n=new Date();return jdnToKey(g2d(n.getFullYear(),n.getMonth()+1,n.getDate()));}

/* ================= ابزارها ================= */
const FA="۰۱۲۳۴۵۶۷۸۹";
const toFa=s=>s===null||s===undefined?"":String(s).replace(/\d/g,d=>FA[d]);
const grp=s=>s.replace(/\B(?=(\d{3})+(?!\d))/g,"٬");
function fmtInt(n){if(n===null||n===undefined||n===""||isNaN(n))return "";return (n<0?"−":"")+toFa(grp(String(Math.round(Math.abs(n)))));}
function fmt(n){if(n===null||n===undefined||n===""||isNaN(n))return "";const r=Math.round(Math.abs(n)*100)/100;const [a,b]=String(r).split(".");return (n<0?"−":"")+toFa(grp(a))+(b?"٫"+toFa(b):"");}
function fmtDec(n,dp){if(n===null||n===undefined||isNaN(n))return "";return toFa(Number(n).toFixed(dp)).replace(".","٫");}
function fmtW(n){if(n===null||n===undefined||isNaN(n))return "";return toFa(String(Math.round(n*1000)/1000)).replace(".","٫");}
const longDate=k=>toFa(k);
const shortDate=k=>{const p=parseKey(k);return toFa(pad2(p.m)+"/"+pad2(p.d));};
function esc(s){return String(s===null||s===undefined?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function normText(s){
  s=String(s||"").replace(/[‎‏‪-‮⁦-⁩﻿]/g,"");
  s=s.replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d));
  s=s.replace(/ي|ى/g,"ی").replace(/ك/g,"ک").replace(/ة/g,"ه").replace(/[أإ]/g,"ا").replace(/ؤ/g,"و").replace(/\r/g,"").replace(/ـ/g,"");
  s=s.replace(/[ً-ْ]/g,"");
  return s;
}
function numOf(v){if(v===null||v===undefined||v==="")return null;let t=normText(String(v)).trim();if(/^\d{1,3}([،,]\d{3})+$/.test(t))t=t.replace(/[،,]/g,"");t=t.replace(/[٫،,\/]/g,".").replace(/[^\d.\-]/g,"");const n=parseFloat(t);return isNaN(n)?null:n;}
const uniq=a=>[...new Set(a)];
const ORD=["اول","دوم","سوم","چهارم","پنجم","ششم","هفتم","هشتم","نهم","دهم","یازدهم","دوازدهم","سیزدهم","چهاردهم","پانزدهم","شانزدهم","هفدهم","هجدهم","نوزدهم","بیستم"];
const ordFa=n=>ORD[n-1]||(toFa(n)+"ام");
const fmtTime=t=>t?toFa(t):"";

/* ================= مدل داده ================= */
const MAXH=6;
const HALL_COLORS=["#4ade80","#e8efe9","#f87171","#facc15","#60a5fa","#c084fc"];
const FEED_TYPES=["پیش‌دان","استارتر","رشد","پایانی"];
const arrOf=v=>Array(MAXH).fill(v);
const DEFAULT_SETTINGS={farmName:"سالم پرور",company:"مرغ پرور",breed:"رأس",mother:"",start:"1405/07/04",
  halls:[{name:"سالن ۱",initial:12500,hidden:false},{name:"سالن ۲",initial:13000,hidden:false},{name:"سالن ۳",initial:18900,hidden:false}],
  dict:{},finalWeight:null,todayOv:null,todayOvOn:null};
function blankEntry(date){return {date,tal:arrOf(null),hazf:arrOf(null),avgW:arrOf(null),water:arrOf(""),daru:arrOf(""),vacc:arrOf(""),dama:null,khamooshi:"",meals:null,feedIn:{},tozin:{},notes:"",items:""};}
const clone=o=>JSON.parse(JSON.stringify(o));
function padArr(a,v){a=Array.isArray(a)?a.slice(0,MAXH):[];while(a.length<MAXH)a.push(v);return a;}
function normEntry(r){
  const b=blankEntry(r.date);
  ["tal","hazf","avgW"].forEach(k=>b[k]=padArr(r[k],null));
  ["water","daru","vacc"].forEach(k=>b[k]=padArr(r[k],"").map(x=>x==null?"":String(x)));
  b.dama=r.dama==null||r.dama===""?null:Number(r.dama);b.khamooshi=r.khamooshi||"";b.meals=r.meals==null?null:Number(r.meals);
  b.feedIn=r.feedIn&&typeof r.feedIn==="object"?r.feedIn:{};
  b.tozin=r.tozin&&typeof r.tozin==="object"?r.tozin:{};
  if(r.feedUse&&typeof r.feedUse==="object"){Object.keys(r.feedUse).forEach(t=>{const v=r.feedUse[t];const kg=v&&typeof v==="object"?v.kg:v;if(kg)b.tozin[t]=(b.tozin[t]||0)+kg;if(v&&v.meals)b.meals=Math.max(b.meals||0,v.meals);});}
  // توزین بدون نوع: همه‌ی توزین‌ها یک عدد کل
  {const tzs=Object.values(b.tozin).reduce((a,v)=>a+(Number(v)||0),0);b.tozin=tzs?{[TZ]:tzs}:{};}
  b.notes=r.notes||"";b.items=r.items||"";
  return b;
}
const SEED=(function(){
  const mk=(d,tal,dr,ex)=>{const e=blankEntry(d);tal.forEach((v,i)=>e.tal[i]=v);if(dr)[0,1,2].forEach(i=>e.daru[i]=dr);return Object.assign(e,ex||{});};
  return [mk("1405/07/04",[12,9,32],"انرژی پلاس",{dama:32,khamooshi:"صفر",feedIn:{"استارتر":6730,"پیش‌دان":3760}}),
    mk("1405/07/05",[20,16,15],"ب کمپلکس ال کارنتین"),mk("1405/07/06",[19,29,28],"مولتی الکترولیت"),mk("1405/07/07",[28,36,40],"")];
})();
const LS_DATA="mehr1405:v2:data",LS_SET="mehr1405:v2:settings",LS_OLD="mehr1405:data:v1",LS_OLDSET="mehr1405:settings:v1";
const APP_VERSION="2.1.0";
const TZ="توزین";
const state={view:"home",sent:{},cellEdit:null,dayMenu:null,firstRun:false,swUpdate:false,entries:[],courses:[],settings:clone(DEFAULT_SETTINGS),input:"",showSettings:false,selDay:null,editing:null,editCourse:null,pendingDelete:null,chartMode:"split",toast:"",confirm:null,unk:{},endOpen:{},editToday:false,showFcr:false,showClosed:false,busy:""};
const LOGO="LOGO_DATA";

function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function validEntries(a){return Array.isArray(a)&&a.every(r=>r&&typeof r.date==="string"&&validKey(r.date)&&Array.isArray(r.tal));}
function normSettings(s){
  const o=Object.assign(clone(DEFAULT_SETTINGS),s||{});
  if(!Array.isArray(o.halls)||!o.halls.length){const init=Array.isArray(s&&s.initial)?s.initial:[12500,13000,18900];o.halls=init.map((v,i)=>({name:"سالن "+toFa(i+1),initial:v,hidden:false}));}
  o.halls=o.halls.slice(0,MAXH).map((h,i)=>({name:h.name||("سالن "+toFa(i+1)),initial:h.initial==null||h.initial===""?null:Number(h.initial),hidden:!!h.hidden}));
  if(!o.dict||typeof o.dict!=="object")o.dict={};
  if(!validKey(o.start))o.start=DEFAULT_SETTINGS.start;
  delete o.initial;return o;
}
function load(){
  let ok=false;
  const d=lsGet(LS_DATA);
  if(d){try{const p=JSON.parse(d);if(p&&validEntries(p.entries)){state.entries=p.entries.map(normEntry);state.courses=Array.isArray(p.courses)?p.courses:[];state.sent=p.sent&&typeof p.sent==="object"?p.sent:{};ok=true;}}catch(e){}}
  if(!d&&!lsGet(LS_OLD))state.firstRun=true;
  if(!ok){const o=lsGet(LS_OLD);if(o){try{const p=JSON.parse(o);if(validEntries(p)){state.entries=p.map(normEntry);ok=true;}}catch(e){}}}
  if(!ok){state.entries=SEED.map(clone);}
  const s=lsGet(LS_SET)||lsGet(LS_OLDSET);
  if(s){try{state.settings=normSettings(JSON.parse(s));}catch(e){}}
  sortEntries();save();saveSet();
}
function save(){state.settings.lastChange=Date.now();lsSet(LS_DATA,JSON.stringify({entries:state.entries,courses:state.courses,sent:state.sent}));lsSet(LS_SET,JSON.stringify(state.settings));}
function saveSet(){lsSet(LS_SET,JSON.stringify(state.settings));}
function sortEntries(){state.entries.sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);}
function effToday(){const s=state.settings,p=phoneToday();if(s.todayOv&&s.todayOvOn===p&&validKey(s.todayOv))return s.todayOv;return p;}
const H=()=>state.settings.halls.length;
const visIdx=()=>state.settings.halls.map((h,i)=>i).filter(i=>!state.settings.halls[i].hidden);
const hallName=i=>(state.settings.halls[i]&&state.settings.halls[i].name)||("سالن "+toFa(i+1));

/* ================= دوره‌های آنتی‌بیوتیک ================= */
function courseDay(c,date){
  if(date<c.start)return 0;
  const last=c.end||effToday();
  if(date>last)return 0;
  return keyToJdn(date)-keyToJdn(c.start)+1;
}
function courseText(c,date){
  const n=courseDay(c,date);if(!n)return "";
  let t=c.name+" — روز "+ordFa(n);
  if(n===1&&c.startTime)t+="، شروع "+fmtTime(c.startTime);
  if(c.end&&date===c.end)t+="، پایان"+(c.endTime?" "+fmtTime(c.endTime):"");
  return t;
}
function courseTexts(date,h){return state.courses.filter(c=>c.halls.includes(h)).map(c=>courseText(c,date)).filter(Boolean);}
function hallsLabel(hs){const V=visIdx();if(V.every(i=>hs.includes(i))&&hs.length>=V.length)return "همه سالن‌ها";return hs.map(i=>hallName(i)).join("، ");}

/* ================= محاسبات ================= */
function feedTypesUsed(){const s=new Set(FEED_TYPES);state.entries.forEach(e=>{Object.keys(e.feedIn).forEach(t=>s.add(t));});return [...s].filter(t=>FEED_TYPES.includes(t)||state.entries.some(e=>e.feedIn[t]||e.tozin[t]));}
function compute(){
  const st=state.settings,start=st.start,startJ=keyToJdn(start),V=visIdx(),NH=H();
  const map={};state.entries.forEach(e=>map[e.date]=e);
  const last=state.entries.length?state.entries[state.entries.length-1].date:start;
  let endJ=Math.max(keyToJdn(last),keyToJdn(effToday()));
  if(endJ<startJ)endJ=startJ;if(endJ-startJ>150)endJ=startJ+150;
  const rows=[],cumTal=arrOf(0),cumHazf=arrOf(0),cumIn={},cumTz={};
  let prevLive=st.halls.map(h=>h.initial),carry={dama:null,kh:"",meals:null};
  for(let j=startJ;j<=endJ;j++){
    const date=jdnToKey(j),e=map[date]||null,en=e||blankEntry(date);
    for(let s=0;s<NH;s++){cumTal[s]+=en.tal[s]||0;cumHazf[s]+=en.hazf[s]||0;}
    Object.keys(en.feedIn).forEach(t=>cumIn[t]=(cumIn[t]||0)+(en.feedIn[t]||0));
    Object.keys(en.tozin).forEach(t=>cumTz[t]=(cumTz[t]||0)+(en.tozin[t]||0));
    if(en.dama!=null)carry.dama=en.dama;if(en.khamooshi)carry.kh=en.khamooshi;if(en.meals!=null)carry.meals=en.meals;
    const live=st.halls.map((h,s)=>h.initial==null?null:h.initial-cumTal[s]-cumHazf[s]);
    const sumV=f=>V.reduce((a,s)=>a+(f(s)||0),0);
    const liveTotal=V.every(s=>live[s]!=null)?sumV(s=>live[s]):null;
    const inSum=Object.values(en.feedIn).reduce((a,b)=>a+(b||0),0),tzSum=Object.values(en.tozin).reduce((a,b)=>a+(b||0),0);
    const types=uniq(Object.keys(cumIn).concat(Object.keys(cumTz)));
    const stockBy={};types.forEach(t=>stockBy[t]=(cumIn[t]||0)-(cumTz[t]||0));
    const cumInTot=Object.values(cumIn).reduce((a,b)=>a+b,0),cumTzTot=Object.values(cumTz).reduce((a,b)=>a+b,0);
    const wTot=arrOf(null);let farmW=0;V.forEach(s=>{if(en.avgW[s]!=null&&live[s]!=null){wTot[s]=en.avgW[s]*live[s];farmW+=wTot[s];}});
    const allW=V.length>0&&V.every(s=>en.avgW[s]!=null);
    const fcr=allW&&farmW>0&&cumTzTot>0?cumTzTot/farmW:null;
    const avgWeight=allW&&liveTotal?farmW/liveTotal:null;
    const daruFull=arrOf("");for(let s=0;s<NH;s++){daruFull[s]=courseTexts(date,s).concat(en.daru[s]?[en.daru[s]]:[]).join(" | ");}
    const tal=en.tal,hazf=en.hazf;
    rows.push({date,entry:e,en,age:j-startJ+1,weekday:weekdayOfKey(date),prevLive:prevLive.slice(),live,liveTotal,
      prevTotal:V.every(s=>prevLive[s]!=null)?V.reduce((a,s)=>a+prevLive[s],0):null,
      tal,hazf,talSum:sumV(s=>tal[s]),hazSum:sumV(s=>hazf[s]),hasTal:V.some(s=>tal[s]!=null),hasHazf:V.some(s=>hazf[s]!=null),
      cumTalTot:sumV(s=>cumTal[s]),cumHazfTot:sumV(s=>cumHazf[s]),
      inSum,tzSum,cumInTot,cumTzTot,stock:cumInTot-cumTzTot,stockBy,
      dama:carry.dama,damaOwn:en.dama!=null,kh:carry.kh,khOwn:!!en.khamooshi,meals:carry.meals,mealsOwn:en.meals!=null,
      wTot,farmW:allW?farmW:null,allW,fcr,avgWeight,daruFull,hasAnyDaru:daruFull.some(Boolean)});
    prevLive=live.slice();
  }
  return rows;
}
function defaultFeedType(date){
  for(let i=state.entries.length-1;i>=0;i--){const e=state.entries[i];if(e.date>date)continue;const ks=Object.keys(e.tozin).filter(k=>e.tozin[k]);if(ks.length)return ks[ks.length-1];}
  const stock={};state.entries.forEach(e=>{if(e.date>date)return;Object.keys(e.feedIn).forEach(t=>stock[t]=(stock[t]||0)+e.feedIn[t]);Object.keys(e.tozin).forEach(t=>stock[t]=(stock[t]||0)-e.tozin[t]);});
  for(const t of FEED_TYPES)if((stock[t]||0)>0)return t;
  return "استارتر";
}
