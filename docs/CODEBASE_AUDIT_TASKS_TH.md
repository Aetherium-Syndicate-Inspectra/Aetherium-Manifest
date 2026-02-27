# Codebase Audit: ข้อเสนอแผนงานแก้ไข (Thai)

เอกสารนี้สรุปผลการตรวจสอบโค้ดล่าสุด และเสนอ "งานแก้ไข" อย่างละ 1 งานตามหมวดที่ร้องขอ

## 1) งานแก้ไขข้อความพิมพ์ผิด (Typo Fix)

**ปัญหาที่พบ**
- ใน `api_gateway/README.md` มีประโยคภาษาอังกฤษผิดหลักไวยากรณ์/พิมพ์ตกคำ:
  - `For an environment that closer resembles production, ...`
- คำว่า `that closer` ควรเป็น `that is closer` ทำให้ข้อความอ่านสะดุดและดูไม่เป็นทางการ

**หลักฐานอ้างอิง**
- `api_gateway/README.md` หัวข้อ `Run (Production-like)`

**งานที่เสนอ**
- แก้ประโยคเป็น:
  - `For an environment that is closer to production, use the provided shell script.`
- ตรวจทานทั้งหัวข้อภาษาอังกฤษ/ไทยในไฟล์เดียวกันอีกหนึ่งรอบ เพื่อแก้คำตกหล่นลักษณะเดียวกัน

---

## 2) งานแก้ไขบั๊ก (Bug Fix)

**ปัญหาที่พบ**
- ตัวแอปใน `api_gateway/main.py` ใช้ตัวแปร `GEMINI_API_KEY` สำหรับ provider Google
- แต่สคริปต์สตาร์ต `api_gateway/start_cognitive_api.sh` ตรวจ `GOOGLE_API_KEY` แทน
- ส่งผลให้สคริปต์ผ่านการตรวจ env ได้ แต่ runtime ยัง error ว่า `GEMINI_API_KEY is not set` เมื่อเรียกโมเดล Google

**หลักฐานอ้างอิง**
- `api_gateway/main.py` ฟังก์ชัน `invoke_generative_model(...)`
- `api_gateway/start_cognitive_api.sh` เงื่อนไขตรวจ API key

**งานที่เสนอ**
- ปรับให้ชื่อ env สอดคล้องกันทั้งระบบ (แนะนำใช้ `GEMINI_API_KEY` ตรงตามโค้ด runtime)
- หรือรองรับ alias ชั่วคราว (`GOOGLE_API_KEY` -> fallback) พร้อม deprecation note
- เพิ่ม unit test สำหรับกรณี Google provider ไม่มี key เพื่อกัน regression

---

## 3) งานแก้ความคลาดเคลื่อนของเอกสาร (Documentation Discrepancy)

**ปัญหาที่พบ**
- `api_gateway/README.md` ระบุว่า endpoint `POST /api/v1/cognitive/emit` ต้องมี header `X-Model-Provider` และ `X-Model-Version`
- แต่ใน implementation (`api_gateway/main.py`) ไม่มีการอ่านหรือบังคับ header ทั้งสองตัว
- ทำให้สัญญาเอกสารกับพฤติกรรมจริงไม่ตรงกัน

**หลักฐานอ้างอิง**
- `api_gateway/README.md` หัวข้อ `Required Headers`
- `api_gateway/main.py` endpoint `emit_cognitive_dsl(...)`

**งานที่เสนอ**
- เลือกแนวทางให้ชัดเจน 1 ทาง:
  1) ถ้าต้องการบังคับจริง: เพิ่มการ validate header ใน endpoint
  2) ถ้าไม่ต้องการ: ลบออกจาก README
- อัปเดตตัวอย่าง `curl` ให้สะท้อน header ที่จำเป็นจริง

---

## 4) งานปรับปรุงการทดสอบ (Test Improvement)

**ปัญหาที่พบ**
- การรัน `pytest -q` จาก root ล้มเหลวตั้งแต่ช่วงเก็บเทสต์ เนื่องจาก import path ของ `api_gateway` ไม่ถูกตั้งค่าเป็น package
- ทำให้เทสต์ไม่ได้รัน logic จริง (หยุดที่ collection error)

**หลักฐานอ้างอิง**
- ผลลัพธ์จากคำสั่ง `pytest -q`
  - `ModuleNotFoundError: No module named 'api_gateway'`
  - `ImportError: attempted relative import with no known parent package`

**งานที่เสนอ**
- ทำให้โครงสร้างเทสต์รันได้จาก root โดยตรง เช่น:
  - เพิ่ม `api_gateway/__init__.py`
  - หรือเพิ่ม `pytest.ini`/`pyproject.toml` ให้กำหนด `pythonpath`
- หลังแก้ collection แล้ว เพิ่ม smoke test CI step (`pytest -q`) เพื่อป้องกัน regression ด้าน test discovery
