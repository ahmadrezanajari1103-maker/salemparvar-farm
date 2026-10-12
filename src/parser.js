/* ================= واژه‌نامه کادر هوشمند ================= */
const KW={};
function addKW(cat,list,val){list.split("|").forEach(p=>{const k=p.trim().replace(/\s+/g," ").toLowerCase();if(k)KW[k]={cat,val};});}
addKW("FILL","سلام|سلامتی|علیک|علیکم|درود|صبح|ظهر|عصر|شب|بخیر|خیر|خسته|نباشید|ممنون|مرسی|تشکر|لطفا|ها|های|هم|و|با|به|از|در|را|رو|که|برای|تا|است|هست|بود|شد|شده|شدند|شدن|شدیم|داشتیم|داریم|داشت|داشته|کردیم|کرد|کنید|کن|بکن|بکنید|دادیم|داده|زدیم|زده|جمعا|جمع|مجموع|حدود|تقریبا|حدودا|میزان|مقدار|تعداد|قطعه|عدد|امار|آمار|گزارش|اطلاعات|فارم|مرغداری|جوجه|مرغ|روزانه|ی|یعنی|هر|الان|فعلا|ا|اینم|این|اون|آن|روز|کل|شنبه|یکشنبه|دوشنبه|سهشنبه|چهارشنبه|پنجشنبه|جمعه|ثبت|بفرمایید|عزیز|جان|مهندس|آقای|اقای|کیسه|موجود|مانده|باقی|باقیمانده|اصلاح|تصحیح|تغییر|بده|بشه|شود|میشه|میشود|امروزی|ثبت شود|بزن|بنویس|انجام|انجام شد|تا الان|تاکنون|سالم|پرور|حدودی|وقت|روزتون|روزبخیر|احوال|خوبید|سلامت|باشید|خدا|قوت|دوستان|همکاران|گزارشات|مورد|موارد");
addKW("TAL","تلفات|تلف|تلفاتی|تلفی|تلفاتش|تلفات ها|مرده|مرده ها|مردگی|مرگ و میر|مرگ|تلفات روزانه|تلفاتمون|تلفاتشون");
addKW("HAZF","حذفی|حذف|حذفیات|حذفی ها|کشتار|کشتاری|سورت|معدوم|معدومی|حذف شده|حذف شد");
addKW("FIN","ورودی|ورود|تخلیه|تخلیه شد|بار|بارگیری|رسید|اومد|آمد|امد|اومده|آمده|خرید|کامیون|ماشین|وارد|وارده|دریافت|دریافتی|تحویل|آوردند|اوردن|آوردن|آوردیم|خالی شد|تخلیه کردیم");
addKW("FTZ","توزین|توزینی|توزین شد|توزین شده|انتقال|منتقل|مخزن|ریختیم|ریخته شد|مصرف|مصرفی|مصرف شده|مصرف شد|سیلو|توزین کردیم");
addKW("FEED","دان|خوراک|دون|دانه");
addKW("FTYPE","پیش دان|پیشدان|پری استارتر|پره استارتر|پیش استارتر|prestarter|pre starter","پیش‌دان");
addKW("FTYPE","استارتر|starter|آغازین","استارتر");
addKW("FTYPE","رشد|گروور|گرور|grower|میان دان|میاندان","رشد");
addKW("FTYPE","پایانی|فینیشر|finisher|پس دان|پسدان|پایان دان","پایانی");
addKW("TON","تن|ton|تنی");
addKW("KG","کیلو|کیلوگرم|کیلوگرام|کیلویی|کیلوئی|kg|کیلو گرم|کیلو گرام|کیلوگرمی|کیلوگرمه");
addKW("GR","گرم|گرمی|gr|گرمه");
addKW("LIT","لیتر|لیتری");
addKW("WEIGHT","وزن کشی|وزنکشی|وزن گیری|وزنگیری|میانگین وزن|وزن|میانگین|بیومتری|وزن متوسط|متوسط وزن|وزن کشی شد|وزنکشی شد|وزنها|وزن ها");
addKW("MEALSW","وعده|نوبت|دفعه|دفعات|مرتبه|وعده ای");
addKW("MEALS","دانخوری|دانخور|دان خوری|تغذیه|وعده غذایی|دفعات دانخوری");
addKW("KHAM","خاموشی|خاموش|تاریکی|قطع برق|برق قطع|بی برقی|قطعی برق|نور خاموش|خاموشی ها");
addKW("NOKHAM","بدون خاموشی|خاموشی نداشتیم|خاموشی نداریم|خاموشی نبود|خاموشی نداشت");
addKW("DAMA","دما|دمای|حرارت|دمای سالن|دما سالن|دمای سالنها");
addKW("DEG","درجه|سانتیگراد");
addKW("WATER","آب|آب مصرفی|مصرف آب|آبخوری|اب مصرفی");
addKW("DARUG","دارو|داروی|داروها|داروهای|مکمل|مکمل ها|دارو و مکمل|داروی مصرفی|دارو مصرفی|مکمل مصرفی|دارو ها");
addKW("DARU","ویتامین|ویتامین ها|ویتامینه|مولتی ویتامین|مولتی|انرژی|انرژی پلاس|کمپلکس|ب کمپلکس|بی کمپلکس|کارنتین|کارنیتین|ال کارنتین|الکترولیت|مولتی الکترولیت|سلنیوم|ای سلنیوم|ای+سلنیوم|ad3e|ad3|ade|ای دی تری|کبد|کبدی|هپاتو|سوربیتول|متیونین|لیزین|بتائین|بتایین|گلوکز|قند|شکر|سرکه|اسید|اسیدیفایر|اسیدی فایر|پروبیوتیک|پری بیوتیک|پروتکسین|ضد استرس|آنتی استرس|بی کربنات|بیکربنات|جوش شیرین|کلسیم|فسفر|آهن|منیزیم|کلر|ید|یدوفور|ضدعفونی|ضد عفونی|کوکسی|ضد کوکسی|آمپرولیوم|تولترازوریل|دیکلازوریل|ویرکن|آمینو|آمینو اسید|آمینواسید|مایکوتوکسین|توکسین بایندر|بایندر|سیترات|منادیون|بیوتین|ضد قارچ|نیستاتین|سولفات مس|ویتامین سی|ویتامین ث|ویتامین ای|ویتامین آ|ویتامین کا|ویتامین ب|vit|multivitamin|electrolyte|سرم|او آر اس|ors");
addKW("DARU","فلور|فلورفنیکل|فلور فنیکل|کلی استاپ|کلیستاپ|colistop|کولیستین|colistin|تیلوزین|تایلوزین|تیلمیکوزین|انرو|انروفلوکساسین|انروفلوکسازین|داکسی|داکسی سایکلین|داکسی سیکلین|آموکسی|آموکسی سیلین|لینکو|لینکواسپکتین|لینکو اسپکتین|نئومایسین|جنتامایسین|اریترومایسین|سولفا|تریمتوپریم|ts|تی اس|نورفلوکساسین|سیپروفلوکساسین|فسفومایسین|اکسی تتراسایکلین|تتراسایکلین|تیامولین|اسپیرامایسین|کلستین|florfenicol|tylosin|enro|doxy|amoxi","anti");
addKW("VACCG","واکسن|واکسیناسیون|واکسن ها|واکسن زدیم|واکسن زده شد");
addKW("VACC","نیوکاسل|گامبورو|برونشیت|آنفولانزا|انفولانزا|h9|h5|b1|لاسوتا|کلون|ib|ibd|nd|ماوا|آبله|ای بی|آی بی|ایبی|ان دی|قطره چشمی|nd ib|ma5|کوکسیواک");
addKW("ANTI","آنتی|انتی|آنتی بیوتیک|انتی بیوتیک|انتیبیوتیک|آنتیبیوتیک|antibiotic|anti|آنتی‌بیوتیک");
addKW("START","شروع|استارت|start|آغاز|شروع شد|استارت شد|شروع کردیم|استارت زدیم|شروع دوره");
addKW("END","پایان|اتمام|تمام|end|پایان دوره|تموم|تمام شد|پایان یافت|بستیم|قطع|قطع شد");
addKW("CONT","ادامه|ادامه دارد|ادامه داره|continue|ادامه میدیم");
addKW("NOTES","توضیحات|توضیح|نکته|یادداشت|ملاحظات|شرح|توضیحات تکمیلی|مشاهدات|نکات");
addKW("ITEMS","اقلام|اقلام ورودی|اقلام ورودی و خروجی|اقلام خروجی");
addKW("HALL","سالن|سالون|س|هال|salon");
addKW("ALLH","سالن ها|سالنها|همه سالن ها|همه سالنها|کل سالن ها|کل سالنها|تمام سالن ها|تمام سالنها|همه سالن|کل سالن|تمام سالن|هر سه سالن|هر 3 سالن|هر سالن|همه|همگی|کلیه سالن ها|کلیه سالنها|کلیه|همه ی سالن ها|همه ی سالنها");
[["یک|یه|اول|یکم",0],["دو|دوم",1],["سه|سوم",2],["چهار|چهارم",3],["پنج|پنجم",4],["شش|شیش|ششم",5]].forEach(([l,v])=>addKW("HALLW",l,v));
addKW("NUMW","هفت",7);addKW("NUMW","هشت",8);addKW("NUMW","ده",10);addKW("NUMW","نیم",0.5);
addKW("ZERO","صفر|هیچ|نداشتیم|نداریم|نبود|نداشت|ندارد");
addKW("TIMEU","ساعت|ساعته|ساعتی|ساعات");
addKW("PLUSW","بعلاوه|به علاوه|باضافه|به اضافه|علاوه|پلاس+");
const FUZZ_CATS=new Set(["TAL","HAZF","FIN","FTZ","FTYPE","WEIGHT","KHAM","DARU","VACCG","VACC","NOTES","DARUG","MEALS","DAMA"]);
const FUZZ_KEYS=Object.keys(KW).filter(k=>!k.includes(" ")&&k.length>=5&&FUZZ_CATS.has(KW[k].cat)&&!/[a-z]/.test(k));
function lev(a,b,max){if(Math.abs(a.length-b.length)>max)return max+1;const m=a.length,n=b.length;let prev=Array(n+1).fill(0).map((_,i)=>i);for(let i=1;i<=m;i++){const cur=[i];let best=i;for(let j=1;j<=n;j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));if(cur[j]<best)best=cur[j];}if(best>max)return max+1;prev=cur;}return prev[n];}
function lookup(key){
  const d=state.settings.dict||{};
  if(d[key]){const c=d[key];if(c==="daru")return {cat:"DARU"};if(c==="vacc")return {cat:"VACC"};if(c==="ignore")return {cat:"FILL"};if(c==="notes")return {cat:"NOTEW"};}
  return KW[key]||null;
}
function fuzzy(key){
  if(key.length<5||KW[key])return null;
  let best=null,bd=9;
  for(const k of FUZZ_KEYS){const max=k.length>=8?2:1;const d=lev(key,k,max);if(d<=max&&d<bd){bd=d;best=k;}}
  return best?Object.assign({fuzzy:best},KW[best]):null;
}

/* ================= پیش‌پردازش: تاریخ و ساعت ================= */
const ORD_MAP={"اول":1,"یکم":1,"دوم":2,"سوم":3,"چهارم":4,"پنجم":5,"ششم":6,"هفتم":7,"هشتم":8,"نهم":9,"دهم":10,"یازدهم":11,"دوازدهم":12,"سیزدهم":13,"چهاردهم":14,"پانزدهم":15,"شانزدهم":16,"هفدهم":17,"هجدهم":18,"هیجدهم":18,"نوزدهم":19,"بیستم":20};
const NB="(?<![\\u0600-\\u06FF\\w])",NA="(?![\\u0600-\\u06FF\\w])";
function prepass(s){
  const ph=[],st=state.settings,sp=parseKey(st.start),today=effToday();
  const P=(type,data,raw,pri)=>{ph.push({type,data,raw,pri});return " @@"+type+(ph.length-1)+"@@ ";};
  const yearFor=m=>m<sp.m-3?sp.y+1:sp.y;
  const ANTICTX=/(شروع|استارت|پایان|آنتی|انتی|start|اتمام|قطع|ادامه)/;
  // تاریخ کامل
  s=s.replace(/(1[34]\d\d)\s*[\/،,.\-]\s*(\d{1,2})\s*[\/،,.\-]\s*(\d{1,2})(?!\d)/g,(m,y,mo,d)=>{const k=keyOf(+y,+mo,+d);return validKey(k)?P("D",k,m,1):m;});
  // ساعت با کلمه «ساعت»
  s=s.replace(/(?<!\d[ \t]*)ساعت[ \t]*(\d{1,2})(?:[ \t]*([:\/،,.٫])[ \t]*(\d{2}))?([ \t]*و[ \t]*نیم)?(?![\d\/،,.٫])/g,(m,h,sep,mi,nim)=>{
    h=+h;if(h>24)return m;const mm=mi!==undefined?+mi:(nim?30:0);if(mm>59)return m;return P("T",pad2(h)+":"+pad2(mm),m);});
  // ساعت‌های بدون کلمه «ساعت»
  s=s.replace(/(?<![\d\/@])(\d{1,2})([:\/،,٫.])(\d{2})(?![\d\/])/g,(m,h,sep,mi,off,str)=>{
    const hh=+h,mm=+mi;if(hh>24||mm>59)return m;
    const before=str.slice(Math.max(0,off-25),off);
    if(/(سالن|س)[ \t]*$/.test(before))return m;
    const ctx=ANTICTX.test(before)||ANTICTX.test(str.slice(off,off+25));
    let isT=false;
    if(sep===":")isT=true;
    else if(ctx&&sep!=="/")isT=true;
    else if(ctx&&sep==="/"&&(hh>12||mm===0||mm>31))isT=true;
    else if(sep==="/"&&(hh>12||mm===0))isT=true;
    else if((sep==="،"||sep===",")&&mi==="00")isT=true;
    return isT?P("T",pad2(hh)+":"+pad2(mm),m):m;});
  s=s.replace(/(\d+)([ \t]*(?:ساعت|تن))[ \t]*و[ \t]*نیم/g,"$1.5$2");
  // عددهای حرفی ترکیبی (بیست و دو ...)
  const TENS={"بیست":20,"سی":30,"چهل":40,"پنجاه":50,"شصت":60,"هفتاد":70,"هشتاد":80,"نود":90},ONES={"یک":1,"دو":2,"سه":3,"چهار":4,"پنج":5,"شش":6,"هفت":7,"هشت":8,"نه":9},TEENS={"یازده":11,"دوازده":12,"سیزده":13,"چهارده":14,"پانزده":15,"پونزده":15,"شانزده":16,"شونزده":16,"هفده":17,"هجده":18,"هیجده":18,"نوزده":19};
  s=s.replace(new RegExp("(?<!(?:ویتامین|ویتامینه|vit)[ \\t]*)"+NB+"("+Object.keys(TENS).join("|")+")(?:[ \\t]*و[ \\t]*("+Object.keys(ONES).join("|")+"))?"+NA,"g"),(m,t,o)=>" "+(TENS[t]+(o?ONES[o]:0))+" ");
  s=s.replace(new RegExp(NB+"("+Object.keys(TEENS).join("|")+")"+NA,"g"),(m,t)=>" "+TEENS[t]+" ");
  // روز + نام ماه
  s=s.replace(new RegExp("(\\d{1,2})[ \\t]*(?:ام|م)?[ \\t]*("+MONTH_RE+")"+NA,"g"),(m,d,mo)=>{const M=MONTHS[mo];const k=keyOf(yearFor(M),M,+d);return validKey(k)?P("D",k,m,2):m;});
  s=s.replace(new RegExp(NB+"("+Object.keys(ORD_MAP).join("|")+")[ \\t]+("+MONTH_RE+")"+NA,"g"),(m,o,mo)=>{const M=MONTHS[mo];const k=keyOf(yearFor(M),M,ORD_MAP[o]);return validKey(k)?P("D",k,m,2):m;});
  // ماه/روز
  s=s.replace(/(?<![\d\/@.،,])(\d{1,2})[ \t]*\/[ \t]*(\d{1,2})(?![\d\/])/g,(m,mo,d)=>{mo=+mo;d=+d;if(mo<1||mo>12||d<1||d>31)return m;const k=keyOf(yearFor(mo),mo,d);return validKey(k)?P("D",k,m,3):m;});
  // تاریخ نسبی
  s=s.replace(new RegExp(NB+"(پس[ \\t]*فردا|پریروز|دیروز|امروز|فردا)"+NA,"g"),(m,w)=>{const off={"امروز":0,"دیروز":-1,"پریروز":-2,"فردا":1}[w.replace(/[ \t]/g,"")];const o=off===undefined?2:off;return P("D",addDays(today,o),m,4);});
  // سن
  s=s.replace(new RegExp(NB+"سن[ \\t]*(\\d{1,3})(?:[ \\t]*روز(?:ه|گی)?)?"+NA,"g"),(m,n)=>{n=+n;if(n<1||n>120)return m;return P("D",addDays(st.start,n-1),m,5);});
  // «روز N» در ابتدای خط
  s=s.replace(new RegExp("(^|\\n)([ \\t]*(?:سلام[ \\t،,]*)?)روز[ \\t]+(\\d{1,3}|"+Object.keys(ORD_MAP).join("|")+")(?:[ \\t]*(?:دوره|پرورش))?"+NA,"g"),(m,a,b,n)=>{const v=/^\d+$/.test(n)?+n:ORD_MAP[n];if(!v||v>120)return m;return a+b+P("D",addDays(st.start,v-1),m.slice(a.length+b.length),6);});
  return {s,ph};
}
function bestDate(ph){let b=null;ph.forEach(p=>{if(p.type==="D"&&(!b||p.pri<b.pri))b=p;});return b?b.data:"";}

/* ================= توکن‌ساز ================= */
const TRE=/(\n)|@@([DT])(\d+)@@|([A-Za-z]+\d*[A-Za-z0-9]*)|(\d+(?:[.٫،,]\d+)*)|([\(\)\[\]\{\}«»"'])|(\+)|([،,;؛:\-–—_!?؟.\/\\|*٪%=])|([^\s\d\(\)\[\]\{\}«»"'+،,;؛:\-–—_!?؟.\/\\|*٪%=@A-Za-z]+)/g;
function tokenize(s){
  const out=[];let m;TRE.lastIndex=0;
  while((m=TRE.exec(s))){
    const pos=m.index,end=pos+m[0].length;
    if(m[1])out.push({k:"NL",pos,end});
    else if(m[2])out.push({k:m[2],n:+m[3],pos,end});
    else if(m[4]&&/^[sS]\d$/.test(m[4])){out.push({k:"W",t:"س",key:"س",pos,end});out.push({k:"N",t:m[4].slice(1),v:+m[4].slice(1),pos,end});}
    else if(m[4])out.push({k:"W",t:m[4],key:m[4].toLowerCase(),pos,end,latin:true});
    else if(m[5])out.push({k:"N",t:m[5],v:numVal(m[5]),pos,end});
    else if(m[6])out.push({k:"PO",t:m[6],pos,end});
    else if(m[7])out.push({k:"PL",t:"+",pos,end});
    else if(m[8])out.push({k:"PU",t:m[8],pos,end});
    else if(m[9])out.push({k:"W",t:m[9],key:m[9].toLowerCase(),pos,end});
  }
  return out;
}
function numVal(t){
  if(/^\d{1,3}([،,]\d{3})+$/.test(t))return parseInt(t.replace(/[،,]/g,""),10);
  const m=t.match(/^(\d+)(?:[.٫،,](\d+))?$/);
  if(m)return m[2]!==undefined?parseFloat(m[1]+"."+m[2]):parseInt(m[1],10);
  return parseFloat(t.replace(/[^\d.]/g,""))||0;
}
function classify(toks){
  const out=[];
  for(let i=0;i<toks.length;i++){
    const t=toks[i];
    if(t.k!=="W"){out.push(t);continue;}
    let done=false;
    for(let len=4;len>=2&&!done;len--){
      if(i+len>toks.length)continue;
      const seg=toks.slice(i,i+len);if(!seg.every(x=>x.k==="W"))continue;
      const key=seg.map(x=>x.key).join(" ");const kw=lookup(key);
      if(kw){out.push({k:"W",t:seg.map(x=>x.t).join(" "),key,cat:kw.cat,val:kw.val,pos:seg[0].pos,end:seg[len-1].end});i+=len-1;done=true;}
    }
    if(done)continue;
    let kw=lookup(t.key);
    if(!kw&&!t.latin)kw=fuzzy(t.key);
    out.push(Object.assign({},t,kw?{cat:kw.cat,val:kw.val,fz:kw.fuzzy}:{}));
  }
  return out;
}

/* ================= پاک‌سازی نام دارو ================= */
const CANON=[[/کلی\s*استاپ|کلیستاپ|colistop/gi,"Colistop"],[/(?<![؀-ۿ])تی\s+اس(?![؀-ۿ])/g,"TS"],[/(?<![A-Za-z])ts(?![A-Za-z])/gi,"TS"],[/(?<![A-Za-z])ad3e(?![A-Za-z])/gi,"AD3e"],[/(?<![؀-ۿ])(?:به\s*علاوه|بعلاوه|باضافه|به\s*اضافه)(?![؀-ۿ])/g,"+"]];
const TRAIL=/^(و|را|رو|هم|با|به|از|در|که|دادیم|زدیم|شد|شده|داده شد|زده شد|ریختیم|استفاده|استفاده شد|کردیم|است|هست|برای|سالن|سالنها|سالن ها|،|,|:|-)$/;
function cleanDrug(t){
  CANON.forEach(([re,r])=>t=t.replace(re,r));
  t=t.replace(/\s*\+\s*/g," + ").replace(/\(\s+/g,"(").replace(/\s+\)/g,")").replace(/\s+/g," ").trim();
  let w=t.split(" ");while(w.length&&TRAIL.test(w[0]))w.shift();while(w.length&&TRAIL.test(w[w.length-1]))w.pop();
  t=w.join(" ");
  // پرانتزهای نامتوازن
  let o=(t.match(/\(/g)||[]).length,c=(t.match(/\)/g)||[]).length;
  if(o!==c){t=t.replace(/[()]/g," ").replace(/\s+/g," ").trim();}
  t=t.replace(/\(\s*\)/g,"").replace(/^\+\s*|\s*\+$/g,"").trim();
  return toFa(t).replace(/(?<=[A-Za-z])([۰-۹]+)/g,m=>m.replace(/[۰-۹]/g,d=>FA.indexOf(d)));
}

/* ================= پارسر اصلی ================= */
function blankParse(){return {date:"",dateDefault:false,tal:arrOf(null),hazf:arrOf(null),avgW:arrOf(null),water:arrOf(""),daru:arrOf(""),vacc:arrOf(""),dama:null,khamooshi:"",meals:null,feed:[],notes:"",items:"",anti:[],copyDaru:false,replace:false,unknown:[],warn:[]};}
function parseEntry(raw){
  const R=blankParse(),NH=H(),V=visIdx();
  let s=normText(raw).replace(/‌/g," ");
  const cpRe=/(همان|همون|مثل|عین)\s*(داروی|دارو|داروهای|داروها)?\s*(دیروز|روز قبل|قبل)/;
  if(cpRe.test(s)){R.copyDaru=true;s=s.replace(cpRe," ");}
  if(/(اصلاح|تصحیح|تغییر)/.test(s)||/(?:را|رو)\s+[^\n]{0,20}?\d[^\n]{0,12}?\s*(?:کن|بکن|کنید|بشه|شود)(?![؀-ۿ])/.test(s))R.replace=true;
  s=s.replace(/(یک|دو|سه|چهار|پنج)\s+شنبه/g,"$1شنبه");
  // اعداد با فاصله مثل «۶ ۷۳۰» نادیده؛ ولی «س1» جدا می‌شود
  const pp=prepass(s);s=pp.s;const ph=pp.ph;
  R.date=bestDate(ph);if(!R.date){R.date=effToday();R.dateDefault=true;}
  const restore=t=>t.replace(/@@([DT])(\d+)@@/g,(m,a,n)=>ph[+n].raw);
  const items=classify(tokenize(s));
  // تقسیم به خطوط
  const lines=[[]];items.forEach(it=>{if(it.k==="NL")lines.push([]);else lines[lines.length-1].push(it);});
  let carry=null,carryMode=null,carrySeq=null;
  const unkAll=[];
  lines.forEach((L,li)=>{
    if(!L.length)return;
    if(isAntiLine(L)){parseAnti(L,ph,R,V);carry=null;return;}
    const out=processLine(L,carry,carryMode,R,V,NH,ph,s,restore,carry?carrySeq:null);
    unkAll.push(...out.unk);
    if(out.headerOnly){carry=out.topic;carryMode=out.feedMode;carrySeq=out.seq;}
    else if(out.continued){carrySeq=out.seq;}
    else{carry=null;carryMode=null;carrySeq=null;}
  });
  // ثبت حالت دان نامشخص
  R.feed.forEach(f=>{if(!f.mode){f.mode="in";f.guessed=true;}});
  if(R.feed.some(f=>f.guessed))R.warn.push("ورودی یا توزین بودن دان مشخص نبود؛ «ورودی» فرض شد");
  // واژه‌های ناشناخته + واژه‌نامه شخصی
  const dict=state.settings.dict||{};
  unkAll.forEach(u=>{
    const k=u.toLowerCase();const c=dict[k];
    if(c==="notes")R.notes=R.notes?R.notes+"، "+u:u;
    else if(c==="daru")V.forEach(h=>R.daru[h]=R.daru[h]?R.daru[h]+"، "+u:u);
    else if(c==="vacc")V.forEach(h=>R.vacc[h]=R.vacc[h]?R.vacc[h]+"، "+u:u);
    else if(c==="ignore"){}
    else R.unknown.push(u);
  });
  for(let h=0;h<MAXH;h++){if(h>=NH&&(R.tal[h]!=null||R.hazf[h]!=null||R.avgW[h]!=null||R.daru[h]))R.warn.push(hallName(h)+" تعریف نشده است (در تنظیمات اضافه کنید)");}
  return R;
}
function isAntiLine(L){
  const has=c=>L.some(x=>x.cat===c);
  if(!(has("START")||has("END")||has("CONT")))return false;
  return has("ANTI")||L.some(x=>x.cat==="DARU"&&x.val==="anti");
}
function hallFrom(L,i){
  // L[i] = HALL ؛ خروجی: {h, j(اندیس آخر مصرف‌شده), extra(عدد چسبیده)}
  let j=i+1;while(j<L.length&&(L[j].k==="PO"||(L[j].k==="PU"&&/[:\-]/.test(L[j].t))))j++;
  const nx=L[j];if(!nx)return null;
  if(nx.k==="N"){
    const parts=nx.t.split(/[،,]/);
    if(/^\d$/.test(parts[0])&&+parts[0]>=1&&+parts[0]<=MAXH&&!/[.٫]/.test(nx.t)){
      return {h:+parts[0]-1,j,extra:parts.length===2&&/^\d+$/.test(parts[1])?parts[1]:null};
    }
    return null;
  }
  if(nx.cat==="HALLW")return {h:nx.val,j,extra:null};
  return null;
}
function parseAnti(L,ph,R,V){
  const mode=L.some(x=>x.cat==="END")?"end":L.some(x=>x.cat==="START")?"start":"cont";
  let halls=[],time=null,date=null;const name=[];
  for(let i=0;i<L.length;i++){
    const x=L[i];
    if(x.k==="T"){if(!time)time=ph[x.n].data;continue;}
    if(x.k==="D"){if(!date)date=ph[x.n].data;continue;}
    if(x.cat==="HALL"){const r=hallFrom(L,i);if(r){halls.push(r.h);i=r.j;}continue;}
    if(x.cat==="ALLH"){halls=V.slice();continue;}
    if(x.cat==="HALLW"&&halls.length){halls.push(x.val);continue;}
    if(["ANTI","START","END","CONT","FILL","TIMEU","NOTEW"].includes(x.cat)||x.key==="دوره")continue;
    if(x.k==="N"&&halls.length&&/^\d$/.test(x.t)&&L[i-1]&&(L[i-1].key==="و"||(L[i-1].k==="PU"&&/[،,]/.test(L[i-1].t)))){halls.push(+x.t-1);continue;}
    if(x.k==="PO"){name.push(x.t);continue;}
    if(x.k==="PL"||x.cat==="PLUSW"){name.push("+");continue;}
    if(x.k==="N"){if(L[i+1]&&L[i+1].key==="روز"){i++;continue;}name.push(x.t);continue;}
    if(x.k==="PU"){if(/[٪%]/.test(x.t))name.push(x.t);continue;}
    if(x.k==="W")name.push(x.t);
  }
  R.anti.push({mode,name:cleanDrug(name.join(" ")),halls:halls.length?uniq(halls):null,time,date});
}
function processLine(L,carry,carryMode,R,V,NH,ph,s,restore,seqIn){
  const S={topic:carry,feedMode:carryMode,feedType:null,halls:null,sticky:null,seq:seqIn||{},buf:[],bufHalls:null,all:false,allNums:[],lastHall:false,prevDelim:true,hadKw:false,assigned:false,unk:[],run:[]};
  const lineFeed=[];
  const firstN=L.findIndex((x,k)=>x.k==="N"&&!(L[k-1]&&L[k-1].cat==="HALL")&&!(L[k-2]&&L[k-2].cat==="HALL"&&L[k-1].k==="PO")),firstK=L.findIndex(x=>x.cat==="TAL"||x.cat==="HAZF");S.postfix=firstN>=0&&firstK>firstN;
  const PERH=new Set(["TAL","HAZF","WEIGHT","WATER"]);
  const inDrug=()=>S.topic==="DARU"||S.topic==="VACC";
  const flushRun=()=>{if(S.run.length){const t=S.run.join(" ").trim();if(t)S.unk.push(toFa(t));S.run=[];}};
  const flush=()=>{
    if(!S.buf.length)return;
    const txt=cleanDrug(S.buf.join(" "));S.buf=[];const wasT=S.trailing;S.trailing=false;
    const hs=S.bufHalls&&S.bufHalls.length?S.bufHalls:V;const tgt=S.topic==="VACC"?R.vacc:R.daru;
    if(wasT){S.bufHalls=null;S.sticky=null;}
    if(!txt)return;
    hs.forEach(h=>{if(h<MAXH)tgt[h]=tgt[h]?tgt[h]+"، "+txt:txt;});S.assigned=true;
  };
  const finAll=()=>{if(S.all&&S.allNums.length===1){const a=S.allNums[0];V.forEach(h=>setVal(a.cat,h,a.v));}S.all=false;S.allNums=[];};
  function setVal(cat,h,v){
    if(cat==="TAL")R.tal[h]=v;else if(cat==="HAZF")R.hazf[h]=v;else if(cat==="WEIGHT")R.avgW[h]=v;else if(cat==="WATER")R.water[h]=String(v);
  }
  function nextSeq(cat){const i=S.seq[cat]||0;S.seq[cat]=i+1;return V[i]!==undefined?[V[i]]:null;}
  function assign(cat,v){
    let hs=S.halls&&S.halls.length?S.halls:null;
    if(!hs&&S.sticky&&S.sticky.length===1&&!S.all&&!(S.seq[cat])&&S.stickyFrom!==cat){hs=S.sticky;S.stickyFrom=cat;}
    if(!hs){hs=nextSeq(cat);if(S.all)S.allNums.push({cat,v});}
    if(!hs){S.unk.push(toFa(String(v)));return;}
    hs.forEach(h=>setVal(cat,h,v));S.halls=null;S.assigned=true;
  }
  function assignInt(cat,v,raw){
    if(raw&&/[،,]/.test(raw)&&!/^\d{1,3}([،,]\d{3})+$/.test(raw)){raw.split(/[،,]/).forEach(p=>{if(p!=="")assign(cat,parseInt(p,10));});return;}
    assign(cat,Math.round(v));
  }
  const wconv=(v,unit)=>{let w=v;if(unit==="GR"||w>20)w=w/1000;return Math.round(w*1000)/1000;};
  function feedPush(kg,type){
    const f={kg,type:type||S.feedType||null,mode:S.feedMode||null};R.feed.push(f);lineFeed.push(f);S.assigned=true;if(type)S.feedType=type;
    if(S.topic!=="FEED"){if(inDrug())flush();S.topic="FEED";}
  }
  function nextIdx(i){let j=i+1;while(j<L.length&&(L[j].k==="PO"||(L[j].k==="PU"&&/[:\-]/.test(L[j].t))))j++;return j;}
  function setTopic(cat){if(inDrug())flush();finAll();S.topic=cat;S.hadKw=true;S.seq[cat]=S.seq[cat]||0;}
  function hallRef(h,i){
    if(inDrug()){
      // اگر بعد از سالن عدد آمد ← تلفات
      const j=nextIdx(i);const nx=L[j];
      if(nx&&nx.k==="N"&&!(L[nextIdx(j)]&&["TON","KG","LIT","GR","TIMEU","DEG","MEALSW"].includes(L[nextIdx(j)].cat))){flush();S.topic=null;S.halls=[h];S.sticky=[h];S.bufHalls=null;return;}
      if(S.lastHall&&(!S.buf.length||S.trailing)){S.bufHalls=uniq((S.bufHalls||[]).concat(h));}
      else if(S.buf.length&&!S.bufHalls){S.bufHalls=[h];S.trailing=true;}
      else{flush();S.bufHalls=[h];S.trailing=false;}
      S.sticky=S.bufHalls;
    }else{
      S.halls=S.lastHall&&S.halls?uniq(S.halls.concat(h)):[h];S.sticky=S.halls;
    }
  }
  function handleNum(i){
    const it=L[i];const v=it.v,raw=it.t;
    if(S.lastHall&&/^\d$/.test(raw)&&v>=1&&v<=MAXH&&L[i-1]&&((L[i-1].cat==="FILL"&&L[i-1].key==="و")||(L[i-1].k==="PU"&&/[،,]/.test(L[i-1].t)))){
      const nx2=L[nextIdx(i)];
      if(!nx2||(nx2.k==="W"&&!["TON","KG","GR","LIT","TIMEU","DEG","MEALSW","TAL","HAZF"].includes(nx2.cat))||nx2.cat==="HALL"){hallRef(v-1,i);S.lastHall=true;return i;}
    }
    if(inDrug()&&!(S.lastHall)){
      // عدد درون نام دارو (مثل «۲ لیتر») مگر اینکه واحد خاموشی/دما باشد
      const j=nextIdx(i),nx=L[j];
      if(!(nx&&["TIMEU","DEG","MEALSW"].includes(nx.cat))){S.buf.push(raw);return i;}
    }
    let j=nextIdx(i),nx=L[j];const nc=nx&&nx.cat;
    if(nc==="TON"||nc==="KG"){
      let kg=nc==="TON"?v*1000:v;
      if(nc==="KG"&&(S.topic==="WEIGHT"||(!S.topic&&S.halls&&v<10&&!S.feedMode))){assign("WEIGHT",wconv(v,"KG"));return j;}
      let k=nextIdx(j),ty=null;if(L[k]&&L[k].cat==="FEED"){k=nextIdx(k);}
      if(L[k]&&L[k].cat==="FTYPE"){ty=L[k].val;j=k;}
      feedPush(kg,ty);return j;
    }
    if(nc==="GR"){assign("WEIGHT",wconv(v,"GR"));return j;}
    if(nc==="MEALSW"||(nc==="FIN"&&nx.key==="بار"&&(S.topic==="MEALS"||S.topic==="FEED"&&false))){R.meals=Math.round(v);S.assigned=true;return j;}
    if(nc==="TIMEU"){R.khamooshi=v===0?"صفر":toFa(String(v).replace(".","٫"))+" ساعت";S.assigned=true;return j;}
    if(nc==="DEG"){R.dama=v;S.assigned=true;return j;}
    if(nc==="LIT"){assign("WATER",toFa(raw)+" لیتر");return j;}
    if(nc==="FTYPE"){feedPush(v,nx.val);return j;}
    if(nc==="FEED"){const k=nextIdx(j);if(L[k]&&L[k].cat==="FTYPE"){feedPush(v,L[k].val);return k;}}
    if((nc==="TAL"||nc==="HAZF")&&S.postfix&&!["FEED","KHAM","DAMA","MEALS"].includes(S.topic)){
      if(S.topic!==nc){finAll();S.topic=nc;S.hadKw=true;}
      assignInt(nc,v,raw);return j;
    }
    switch(S.topic){
      case "TAL":case "HAZF":assignInt(S.topic,v,raw);return i;
      case "WEIGHT":assign("WEIGHT",wconv(v));return i;
      case "WATER":assign("WATER",toFa(raw));return i;
      case "FEED":feedPush(v,null);return i;
      case "KHAM":R.khamooshi=v===0?"صفر":toFa(String(v).replace(".","٫"))+" ساعت";S.assigned=true;return i;
      case "DAMA":R.dama=v;S.assigned=true;return i;
      case "MEALS":R.meals=Math.round(v);S.assigned=true;return i;
    }
    if(S.halls){assignInt("TAL",v,raw);return i;}
    if(S.feedType||S.feedMode){feedPush(v,null);return i;}
    S.unk.push(toFa(raw));return i;
  }
  for(let i=0;i<L.length;i++){
    const x=L[i];const cat=x.cat;
    const isSep=(x.k==="PU"&&/[،,;؛\-]/.test(x.t))||(cat==="FILL"&&x.key==="و");
    if(x.k!=="W"||cat||x.latin)flushRun();
    if(x.k==="D"){continue;}
    if(x.k==="T"){
      const t=ph[x.n].data;
      if(S.topic==="KHAM"){R.khamooshi="تا "+fmtTime(t);S.assigned=true;}
      else if(inDrug())S.buf.push(fmtTime(t));
      else S.unk.push("ساعت "+fmtTime(t));
      continue;
    }
    if(x.k==="PO"){if(inDrug())S.buf.push(x.t);continue;}
    if(x.k==="PL"){if(inDrug())S.buf.push("+");continue;}
    if(x.k==="PU"){
      if(/[٪%]/.test(x.t)&&inDrug()){S.buf.push(x.t);continue;}
      if(/[،,;؛]/.test(x.t)&&inDrug()){flush();}
      if(isSep)S.prevDelim=true;
      continue;
    }
    if(x.k==="N"){i=handleNum(i);S.lastHall=false;S.prevDelim=false;continue;}
    // واژه‌ها
    switch(cat){
      case "HALL":{
        const r=hallFrom(L,i);
        if(!r){S.lastHall=false;break;}
        if(r.extra!==null){L.splice(r.j+1,0,{k:"N",t:r.extra,v:parseInt(r.extra,10)});}
        hallRef(r.h,r.j);i=r.j;S.lastHall=true;S.prevDelim=false;continue;
      }
      case "ALLH":{
        if(inDrug()){flush();S.bufHalls=V.slice();S.sticky=V.slice();}
        else{S.halls=null;S.all=true;S.allNums=[];if(S.topic)S.seq[S.topic]=0;S.sticky=V.slice();}
        S.lastHall=true;continue;
      }
      case "HALLW":{
        const nxN=L[nextIdx(i)]&&L[nextIdx(i)].k==="N";
        if(S.lastHall||PERH.has(S.topic)||(inDrug()&&S.prevDelim)||(!S.topic&&nxN)){
          if(!S.lastHall&&!S.topic&&nxN&&!S.halls){/* «یک ۱۲ دو ۹» بدون موضوع ← تلفات */}
          hallRef(x.val,i);S.lastHall=true;S.prevDelim=false;continue;
        }
        if(["FEED","KHAM","DAMA","MEALS"].includes(S.topic)){const nv=x.val+1;L.splice(i+1,0,{k:"N",t:String(nv),v:nv});S.lastHall=false;continue;}
        if(inDrug()){S.buf.push(x.t);continue;}
        break;
      }
      case "NUMW":{
        if(inDrug()){S.buf.push(x.t);continue;}
        // «دو و نیم تن»
        const prevN=R.feed.length&&L[i-1]&&L[i-2]&&L[i-2].k==="N";
        L.splice(i+1,0,{k:"N",t:String(x.val),v:x.val});continue;
      }
      case "ZERO":{
        if(S.topic==="KHAM"){R.khamooshi="صفر";S.assigned=true;continue;}
        if(S.topic==="TAL"||S.topic==="HAZF"){if(S.halls){assign(S.topic,0);}else if(!S.assigned){V.forEach(h=>setVal(S.topic,h,0));S.assigned=true;}continue;}
        if(inDrug()){S.buf.push(x.t);continue;}
        continue;
      }
      case "NOKHAM":R.khamooshi="صفر";S.assigned=true;continue;
      case "TAL":case "HAZF":case "WEIGHT":case "WATER":case "DAMA":case "MEALS":case "KHAM":
        if(S.topic===cat&&cat!=="WEIGHT"){S.lastHall=false;continue;}
        setTopic(cat);S.lastHall=false;continue;
      case "FEED":
        if(S.topic!=="FEED")setTopic("FEED");continue;
      case "FIN":case "FTZ":{
        const m=cat==="FIN"?"in":"tozin";
        if(S.topic!=="FEED")setTopic("FEED");S.feedMode=m;
        lineFeed.forEach(f=>{if(!f.mode)f.mode=m;});continue;
      }
      case "FTYPE":{
        const lf=lineFeed[lineFeed.length-1];
        if(lf&&!lf.type&&L[i-1]&&(L[i-1].k==="N"||L[i-1].cat==="KG"||L[i-1].cat==="TON")){lf.type=x.val;}
        S.feedType=x.val;if(S.topic!=="FEED")setTopic("FEED");continue;
      }
      case "MEALSW":setTopic("MEALS");continue;
      case "TON":case "KG":case "GR":case "LIT":case "DEG":case "TIMEU":continue;
      case "DARUG":setTopic("DARU");S.bufHalls=S.sticky?S.sticky.slice():null;S.lastHall=false;continue;
      case "VACCG":setTopic("VACC");S.bufHalls=S.sticky?S.sticky.slice():null;S.lastHall=false;continue;
      case "DARU":case "VACC":case "ANTI":{
        const want=cat==="VACC"?"VACC":(S.topic==="VACC"&&cat==="ANTI"?"VACC":"DARU");
        if(S.topic!==want){const keep=S.sticky?S.sticky.slice():null;setTopic(want);S.bufHalls=keep;}
        if(S.trailing){flush();S.bufHalls=null;}
        S.buf.push(x.fz||x.t);S.lastHall=false;S.prevDelim=false;continue;
      }
      case "PLUSW":if(inDrug())S.buf.push("+");continue;
      case "NOTES":case "ITEMS":{
        flush();
        const last=L[L.length-1];let txt=s.slice(x.end,last.end);
        txt=restore(txt).replace(/^[\s:：\-–،,]+/,"").trim();
        txt=toFa(txt);
        if(txt){if(cat==="NOTES")R.notes=R.notes?R.notes+"، "+txt:txt;else R.items=R.items?R.items+"، "+txt:txt;}
        S.assigned=true;i=L.length;S.topic=null;continue;
      }
      case "NOTEW":{flushRun();R.notes=R.notes?R.notes+"، "+x.t:x.t;S.assigned=true;continue;}
      case "START":case "END":case "CONT":
        if(inDrug()){S.buf.push(x.t);continue;}
        S.unk.push(x.t);continue;
      case "FILL":
        if(inDrug()&&x.key==="و"){if(S.lastHall)continue;S.buf.push(x.t);continue;}
        if(inDrug()&&!["سلام","ها","های"].includes(x.key)&&S.buf.length){S.buf.push(x.t);continue;}
        if(x.key==="و"){continue;}
        S.lastHall=false;continue;
      default:
        if(inDrug()){S.buf.push(x.t);S.lastHall=false;S.prevDelim=false;continue;}
        S.run.push(x.t);S.lastHall=false;continue;
    }
    S.lastHall=false;
  }
  flushRun();flush();finAll();
  return {unk:S.unk,topic:S.topic,feedMode:S.feedMode,headerOnly:S.hadKw&&!S.assigned&&S.topic&&S.topic!=="NOTES",continued:!!carry&&!S.hadKw&&S.assigned,seq:S.seq};
}

/* ================= فرمان حذف ================= */
function detectCommand(raw){
  const text=normText(raw).replace(/‌/g," ");
  if(!/(پاک\s*کن|پاکش\s*کن|پاک\s*کنید|پاک\s*شود|پاک\s*بشه|حذف\s*کن|حذفش\s*کن|حذف\s*کنید|حذف\s*شود|حذف\s*بشه|برش\s*دار|بردار|برداشته\s*شود|خالی\s*کن)/.test(text))return {type:"data"};
  const pp=prepass(text);const date=bestDate(pp.ph)||"";
  const t=pp.s;let field=null;
  const F=[["tal",/تلف/],["hazf",/حذفی|کشتار/],["feedIn",/ورودی|تخلیه|بار دان/],["tozin",/توزین|مصرف دان|دان مصرف/],["meals",/وعده|دانخوری/],["avgW",/وزن/],["water",/آب/],["dama",/دما/],["khamooshi",/خاموشی/],["vacc",/واکسن/],["daru",/دارو|ویتامین|مکمل/],["notes",/توضیح/],["items",/اقلام/]];
  for(const [f,re] of F){if(re.test(t)){field=f;break;}}
  const hm=t.replace(/سالن\s*(یک|اول)/g,"سالن 1").replace(/سالن\s*(دو|دوم)/g,"سالن 2").replace(/سالن\s*(سه|سوم)/g,"سالن 3").replace(/سالن\s*(چهار|چهارم)/g,"سالن 4").replace(/سالن\s*(پنج|پنجم)/g,"سالن 5").replace(/سالن\s*(شش|ششم)/g,"سالن 6").match(/سالن\s*(\d)/);
  return {type:"delete",date,wholeDay:field===null,field,salon:hm?+hm[1]-1:null};
}
const FIELD_LABELS={tal:"تلفات",hazf:"حذفی",feedIn:"دان ورودی",tozin:"توزین دان",meals:"وعده",dama:"دما",khamooshi:"خاموشی",avgW:"میانگین وزن",water:"آب",vacc:"واکسن",daru:"دارو",notes:"توضیحات",items:"اقلام"};

/* ================= ثبت چندروزه ================= */
const DSTART=/^[\s\-–•*]*(?:(?:سلام|آمار|امار|تاریخ|گزارش|روزانه|وقت\s*بخیر|صبح\s*بخیر)[\s:،,\-]*)*@@D\d+@@/;
function splitDays(raw){
  const lines=String(raw).split(/\n/);const segs=[];let cur=[];
  lines.forEach(l=>{
    const n=normText(l).replace(/\u200c/g," ");
    const isStart=n.trim()&&DSTART.test(prepass(n).s);
    if(isStart&&cur.some(x=>/@@D\d+@@/.test(prepass(normText(x).replace(/\u200c/g," ")).s))){segs.push(cur.join("\n"));cur=[];}
    cur.push(l);
  });
  if(cur.length)segs.push(cur.join("\n"));
  return segs.filter(x=>x.trim());
}
function parseMulti(raw){
  const segs=splitDays(raw);
  if(segs.length<2)return [parseEntry(raw)];
  const ps=segs.map(parseEntry);
  // اگر همه یک تاریخ شدند، یکجا
  if(uniq(ps.map(p=>p.date)).length<2)return [parseEntry(raw)];
  return ps;
}
