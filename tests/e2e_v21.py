# تست نسخه ۲.۱: python3 tests/e2e_v21.py OUTDIR OLD_HTML NEW_HTML
import sys,base64,json
from playwright.sync_api import sync_playwright
out,OLD,NEW=sys.argv[1],sys.argv[2],sys.argv[3]
R="/home/claude/salemparvar-farm"
def blob(pg,expr):
    r=pg.evaluate("""async()=>{const {blob,name}=await (%s);const b=new Uint8Array(await blob.arrayBuffer());let s='';for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return [name,btoa(s)];}"""%expr)
    return r[0],base64.b64decode(r[1])
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":390,"height":844},device_scale_factor=2);pg=ctx.new_page()
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    # ۱) نسخه‌ی فعلی کاربر (۲.۰): داده‌ی ۳۵ روزه با توزین نوع‌دار + علامت ارسال
    pg.goto("file://"+OLD);pg.wait_for_timeout(400);pg.add_script_tag(path=R+"/tests/sample35.js")
    pg.evaluate("state.entries=SAMPLE35;state.entries[5].tozin={'پیش‌دان':1000,'استارتر':500};state.settings.todayOv='1405/08/08';state.settings.todayOvOn=phoneToday();save();markSent('1405/07/09');markSent('1405/07/10');render()")
    old=pg.evaluate("(()=>{const l=compute().slice(-1)[0];return {stock:l.stock,tz:l.cumTzTot,inn:l.cumInTot,live:l.liveTotal,s9:sentStatus('1405/07/09')}})()")
    # ۲) نسخه‌ی جدید روی همان آدرس
    pg.goto("file://"+NEW);pg.wait_for_timeout(500)
    new=pg.evaluate("(()=>{const l=compute().slice(-1)[0];return {stock:l.stock,tz:l.cumTzTot,inn:l.cumInTot,live:l.liveTotal,s9:sentStatus('1405/07/09'),tz9:state.entries.find(e=>e.date==='1405/07/09').tozin}})()")
    print("ارتقا:",old,"→",new)
    # ۳) PDF تجمیعی
    n,d=blob(pg,"makeAggPdf()");open(out+"/agg.pdf","wb").write(d);print("PDF:",n,len(d))
    # ۴) فرم روزانه خاکستری
    n,d=blob(pg,"makeDayJpg('1405/07/09')");open(out+"/day.jpg","wb").write(d);print("JPG:",n)
    # ۵) کادر روز در جدول
    pg.evaluate("go('table')");pg.wait_for_timeout(150)
    pg.evaluate("toggleDayBox('1405/07/12')");pg.wait_for_timeout(150)
    pg.fill("#dayBoxIn","سالن ۲ (۲۵)\nتوزین ۳۰۰۰\nدارو سالن ۱ ویتامین سی");pg.wait_for_timeout(150)
    print("پیش‌نمایش کادر روز:",pg.inner_text("#dayBoxPv").replace("\n"," | "))
    pg.screenshot(path=out+"/daybox.png")
    pg.evaluate("dayBoxSubmit()");pg.wait_for_timeout(150)
    e=pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/12'))");ej=json.loads(e)
    print("روز ۰۷/۱۲:","tal",ej["tal"][:3],"tozin",ej["tozin"],"daru",ej["daru"][:3])
    pg.fill("#dayBoxIn","توزین ۱۵۰۰");pg.evaluate("dayBoxSubmit()")
    print("توزین پس از اصلاح (جایگزین):",pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/12').tozin)"))
    # ۶) دارو با «همه» در ویرایش خانه
    pg.evaluate("openCell('1405/07/13','daru',1)");pg.fill("#cellIn","انرژی پلاس همه");pg.evaluate("state.cellNext=false;saveCell()")
    print("دارو همه:",pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/13').daru.slice(0,3))"))
    pg.evaluate("openCell('1405/07/14','daru',2)");pg.fill("#cellIn","AD3e");pg.evaluate("state.cellNext=false;saveCell()")
    print("دارو یک سالن:",pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/14').daru.slice(0,3))"))
    pg.evaluate("openCell('1405/07/15','tozin',null)");pg.fill("#cellIn","۲۲۰۰");pg.evaluate("saveCell()")
    print("خانه توزین:",pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/15').tozin)"))
    # ۷) ارسال گروهی (در این مرورگر اشتراک نیست → دانلود + تأیید علامت)
    pg.evaluate("go('report')");pg.wait_for_timeout(150);pg.evaluate("batchSelect('unsent')")
    print("انتخاب‌شده:",pg.evaluate("batchDates().length"))
    pg.evaluate("state.batch={};['1405/07/16','1405/07/17','1405/07/18'].forEach(d=>state.batch[d]=1);render()")
    with pg.expect_download() as dl: pg.evaluate("batchSend(true)")
    pg.wait_for_timeout(2500)
    if pg.query_selector(".modalWrap .btn.primary"): pg.click(".modalWrap .btn.primary")
    print("پس از ارسال گروهی:",pg.evaluate("['1405/07/16','1405/07/17','1405/07/18'].map(sentStatus)"))
    pg.screenshot(path=out+"/report.png",full_page=True)
    pg.evaluate("go('table')");pg.wait_for_timeout(150);pg.screenshot(path=out+"/table.png")
    pg.set_viewport_size({"width":1280,"height":860});pg.evaluate("toggleDayBox('1405/07/20')");pg.wait_for_timeout(200);pg.screenshot(path=out+"/table_desk.png")
    print("خطاها:",errs)
    b.close()
