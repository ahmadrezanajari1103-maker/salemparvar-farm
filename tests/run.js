// اجرای تست کادر هوشمند: node tests/run.js
const fs=require('fs'),path=require('path');
global.localStorage={_:{},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=v}};
const src=p=>fs.readFileSync(path.join(__dirname,'..','src',p),'utf8');
eval(src('core.js')+src('parser.js')+`;state.settings.todayOv="1405/07/10";state.settings.todayOvOn=phoneToday();global.P=parseEntry;global.PM=parseMulti;`);
const fmtR=r=>{const o={d:r.date+(r.dateDefault?"*":"")};const nz=a=>a.slice(0,4).some(x=>x!=null&&x!=="")?a.slice(0,4):undefined;
 ["tal","hazf","avgW","water","daru","vacc"].forEach(k=>{const v=nz(r[k]);if(v)o[k]=v});
 ["dama","khamooshi","meals","notes","items"].forEach(k=>{if(r[k]!==null&&r[k]!=="")o[k]=r[k]});
 if(r.feed.length)o.feed=r.feed.map(f=>f.mode+":"+(f.type||"?")+":"+f.kg);if(r.anti.length)o.anti=r.anti;if(r.unknown.length)o.unk=r.unknown;if(r.warn.length)o.warn=r.warn;if(r.replace)o.replace=1;if(r.copyDaru)o.copy=1;return JSON.stringify(o);};
const cases=fs.readFileSync(path.join(__dirname,'parser-cases.txt'),'utf8').split(/\n===\n/).map(t=>t.trim()).filter(Boolean);
const expF=path.join(__dirname,'expected.json');const exp=fs.existsSync(expF)?JSON.parse(fs.readFileSync(expF,'utf8')):null;
const out={};let fail=0;
cases.forEach(t=>{const ps=PM(t);const v=ps.map(fmtR).join(" ‖ ");out[t]=v;if(exp&&exp[t]!==undefined&&exp[t]!==v){fail++;console.log("✗ "+t.replace(/\n/g," ⏎ ")+"\n  انتظار: "+exp[t]+"\n  نتیجه : "+v);}});
if(process.argv.includes("--update")||!exp){fs.writeFileSync(expF,JSON.stringify(out,null,1));console.log("expected.json نوشته شد ("+cases.length+" مورد)");}
else console.log(cases.length+" مورد، "+fail+" خطا");
process.exit(fail?1:0);
