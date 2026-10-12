# تست سرتاسری با مرورگر: python3 tests/e2e.py
import os,sys,json,base64
from playwright.sync_api import sync_playwright
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OLD="/mnt/user-data/outputs/salemparvar-app/index.html"
out=sys.argv[1] if len(sys.argv)>1 else "/tmp"
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":390,"height":844},device_scale_factor=2)
    pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    # ۱) نسخه‌ی قبلی: داده ثبت کن
    pg.goto("file://"+OLD);pg.wait_for_timeout(400)
    pg.evaluate("state.settings.todayOv='1405/07/12';state.settings.todayOvOn=phoneToday();saveSet();render()")
    pg.fill("#composerInput","۸ مهر سالن ۱ (۲۲) سالن ۲ (۱۸) سالن ۳ (۳۰)\nتوزین ۲ تن پیش دان");pg.click("#submitBtn");pg.wait_for_timeout(150)
    pg.fill("#composerInput","انتی ۹ مهر ساعت ۱۲،۰۰ استارت کلی استاپ بعلاوه TS");pg.click("#submitBtn");pg.wait_for_timeout(150)
    before=pg.evaluate("JSON.stringify({n:state.entries.length,c:state.courses.length,live:compute().slice(-1)[0].liveTotal})")
    # ۲) نسخه‌ی جدید روی همان آدرس (file:// یکسان)
    pg.goto("file://"+os.path.join(R,"docs/index.html"));pg.wait_for_timeout(500)
    after=pg.evaluate("JSON.stringify({n:state.entries.length,c:state.courses.length,live:compute().slice(-1)[0].liveTotal})")
    print("حفظ داده:",before,"→",after,"OK" if before==after else "FAIL")
    pg.screenshot(path=out+"/m_home.png")
    # ثبت چندروزه
    pg.click(".nb.plus");pg.wait_for_timeout(150)
    pg.fill("#composerInput","۱۰ مهر  سالن ۱ (۱۵) سالن ۲ (۱۴) سالن ۳ (۲۰)\n۱۱ مهر  سالن ۱ (۱۲) سالن ۲ (۱۱) سالن ۳ (۱۹)\nسالن یک ویتامین سی، دو ای سلنیوم\nگله پخ دارد");pg.wait_for_timeout(150)
    print("پیش‌نمایش:",pg.inner_text("#pvHolder").replace("\n"," | ")[:300])
    pg.screenshot(path=out+"/m_add.png")
    pg.click("#submitBtn");pg.wait_for_timeout(250)
    print("نمای فعلی:",pg.evaluate("state.view"),pg.evaluate("state.selDay"))
    pg.screenshot(path=out+"/m_report.png",full_page=False)
    print("چک‌لیست:",pg.inner_text(".cklist").replace("\n"," "))
    print("وضعیت:",pg.inner_text(".sbar"))
    # علامت ارسال و تغییر بعدی
    pg.evaluate("markSent('1405/07/11');render()")
    print("پس از علامت:",pg.evaluate("sentStatus('1405/07/11')"))
    # جدول: ویرایش سلولی
    pg.click(".nb >> text=جدول");pg.wait_for_timeout(200)
    pg.evaluate("openCell('1405/07/11','hazf',0)");pg.fill("#cellIn","۵");pg.evaluate("state.cellNext=false;saveCell()")
    print("حذفی س۱:",pg.evaluate("state.entries.find(e=>e.date==='1405/07/11').hazf[0]"),"وضعیت ارسال:",pg.evaluate("sentStatus('1405/07/11')"))
    pg.evaluate("openCell('1405/07/11','tozin',null)");pg.fill("#cellF1","۱۵۰۰");pg.evaluate("saveCell()")
    print("توزین:",pg.evaluate("JSON.stringify(state.entries.find(e=>e.date==='1405/07/11').tozin)"))
    pg.evaluate("openCell('1405/07/11','tal',0)");pg.wait_for_timeout(100);pg.screenshot(path=out+"/m_cell.png")
    pg.evaluate("state.cellEdit=null;renderModal()")
    pg.screenshot(path=out+"/m_table.png")
    # خروجی
    pg.evaluate("state.selDay='1405/07/11'")
    r=pg.evaluate("""async()=>{const {blob,name}=await makeDayJpg('1405/07/11');const b=new Uint8Array(await blob.arrayBuffer());let s='';for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode.apply(null,b.subarray(i,i+8192));return [name,btoa(s)];}""")
    open(out+"/day.jpg","wb").write(base64.b64decode(r[1]));print("JPG:",r[0])
    r=pg.evaluate("""async()=>{const {blob,name}=await makeAggPdf();return [name,blob.size];}""");print("PDF:",r)
    pg.click(".nb >> text=تنظیمات");pg.wait_for_timeout(150);pg.screenshot(path=out+"/m_settings.png")
    # دسکتاپ
    pg.set_viewport_size({"width":1280,"height":860});pg.click(".nb >> text=خانه");pg.wait_for_timeout(200);pg.screenshot(path=out+"/d_home.png")
    print("خطاها:",errs)
    b.close()
