# Aetherium Manifest

## Quick Navigation
- [English Documentation](#english-documentation)
- [เอกสารภาษาไทย](#เอกสารภาษาไทย)
- [Extension Ideas](#extension-ideas)

## English Documentation

### Overview
Aetherium Manifest is the frontend expression layer of the Aetherium ecosystem. It visualizes AI intent, confidence, and runtime state through light, motion, and abstract form.

### Architecture
- **AETHERIUM-GENESIS (Backend):** reasoning core, intent generation, telemetry interpretation.
- **Aetherium Manifest (Frontend):** visual embodiment and interaction runtime.
- **Transport:** API/WebSocket contract over AetherBus.

### Current Runtime Capabilities
- Real-time particle/shape rendering mapped from intent vectors.
- Voice interaction pipeline (VAD mock + STT mock + intent mapping).
- Adaptive quality tier and frame-rate management.
- Accessibility-focused controls with visual microphone feedback.
- Window manager for all HUD panels:
  - close (✕) per panel
  - reopen from Settings > Panels
  - drag-to-move and resize
- Settings with 5 tabs: `Display`, `Panels`, `Links`, `Language`, `Voice`.
- External URL analysis entry point in Settings (`Analyze URL`).
- Event-driven command bus + telemetry counters + delta-state patch helper.
- Upgraded to an installable web application (PWA) with manifest, service worker, and core assets.

### API Gateway (Prototype)
The `api_gateway/` folder includes a sample Cognitive DSL gateway:
- `POST /api/v1/cognitive/emit`
- `POST /api/v1/cognitive/validate`
- `GET /health`
- `WS /ws/cognitive-stream`

### AetherBusExtreme Utilities
`api_gateway/aetherbus_extreme.py` includes:
- Zero-copy socket send (`memoryview`) + async-safe send helper (`loop.sock_sendall`)
- Immutable envelope models
- Async queue bus with backpressure
- MsgPack helpers
- NATS async manager
- State convergence processor

### Run Locally
```bash
python3 -m http.server 4173
# open http://localhost:4173
```

### Run Frontend + API Gateway
```bash
# terminal 1
python3 -m http.server 4173

# terminal 2
cd api_gateway
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Frontend: `http://localhost:4173`  
Gateway: `http://localhost:8000` (OpenAPI docs at `/docs`)

### Project Structure
- `index.html`, `service-worker.js`, `app.webmanifest`: PWA frontend runtime.
- `api_gateway/`: FastAPI-based cognitive gateway and websocket streams.
- `tools/contracts/`: schema + payload contract validation utilities.
- `tools/benchmarks/`: latency and stress benchmarking helpers.
- `docs/`: architecture, interfaces, schemas, safety, and roadmap references.

### Validation & Tests
```bash
# API gateway tests
cd api_gateway && pytest -q

# contract checks
python3 tools/contracts/contract_checker.py
```

### Future Function & Development Proposals
- Add **scenario presets** (Presentation / Meditation / Debug / Low-power) that switch multiple visual and voice settings in one click.
- Add **plugin-style intent renderer API** so teams can register custom visual modules without modifying core runtime.
- Add **session replay mode** (timeline scrub + event bookmarks) for debugging intent, telemetry spikes, and UX quality.
- Add **policy-driven link analysis** with per-workspace rules, risk scoring, and exportable audit log.
- Add **hybrid persistence layer**: Redis for real-time state + TimescaleDB/ClickHouse for long-term telemetry analytics.
- Add **collaboration controls** (roles, room permissions, moderation actions) on top of state-sync channels.
- Add **voice quality dashboard** showing WER/latency by language-region and automatic fallback recommendations.
- Add **offline-first runtime packs** (locale + voice + visual profile bundles) for unstable network environments.

---

## เอกสารภาษาไทย

### ภาพรวม
Aetherium Manifest คือเลเยอร์แสดงผลฝั่ง Frontend ของระบบ Aetherium โดยแปลงเจตนาและสถานะของ AI ให้เป็นภาพเคลื่อนไหวเชิงนามธรรม

### โครงสร้างระบบ
- **AETHERIUM-GENESIS (Backend):** คิด วิเคราะห์ และสร้าง intent
- **Aetherium Manifest (Frontend):** แสดงผลและโต้ตอบผู้ใช้
- **การเชื่อมต่อ:** ผ่าน API/WebSocket บน AetherBus

### ความสามารถปัจจุบัน
- ระบบแสดงผลแบบเรียลไทม์ด้วยอนุภาคและรูปทรงตาม intent
- Voice pipeline (VAD/STT แบบ mock) + intent mapping
- ปรับคุณภาพกราฟิกตามเครื่องและจัดการเฟรมเรต
- ปุ่มควบคุมที่เป็นมิตรต่อการเข้าถึง (Accessibility)
- HUD ทุกหน้าต่างมีปุ่มปิด เปิดคืนได้จาก Settings และลาก/ย่อ-ขยายได้
- Settings แบ่ง 5 แท็บ: `Display`, `Panels`, `Links`, `Language`, `Voice`
- มีช่องวิเคราะห์ลิงก์ URL ภายนอก
- มีโครง telemetry + event bus + delta-state สำหรับต่อยอด
- ยกระดับเป็น installable web application (PWA) พร้อม manifest, service worker และ asset แกนหลัก

### API Gateway (ต้นแบบ)
โฟลเดอร์ `api_gateway/` มีตัวอย่าง Cognitive DSL gateway พร้อม endpoint สำหรับ emit/validate/health/websocket

### วิธีรัน Frontend + API Gateway
```bash
# เทอร์มินัล 1
python3 -m http.server 4173

# เทอร์มินัล 2
cd api_gateway
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Frontend: `http://localhost:4173`  
Gateway: `http://localhost:8000` (เอกสาร API ที่ `/docs`)

### โครงสร้างโปรเจกต์โดยย่อ
- `index.html`, `service-worker.js`, `app.webmanifest`: ส่วน frontend และ PWA
- `api_gateway/`: บริการ FastAPI + websocket สำหรับ cognitive stream
- `tools/contracts/`: เครื่องมือตรวจสอบความถูกต้องของ schema/payload
- `tools/benchmarks/`: สคริปต์ benchmark สำหรับ latency และ stress test
- `docs/`: เอกสารสถาปัตยกรรม อินเทอร์เฟซ ความปลอดภัย และ roadmap

### ข้อเสนอฟังก์ชันและแนวทางต่อยอด
- เพิ่ม **Preset การใช้งาน** (Presentation / Meditation / Debug / Low-power) เพื่อสลับค่าการแสดงผลและเสียงหลายรายการในครั้งเดียว
- เพิ่ม **Plugin Renderer API** สำหรับต่อโมดูลภาพแสดงผลใหม่โดยไม่ต้องแก้แกนหลักของระบบ
- เพิ่ม **Session Replay** (timeline + bookmark เหตุการณ์สำคัญ) เพื่อใช้ตรวจสอบบั๊กและวิเคราะห์พฤติกรรม intent ย้อนหลัง
- เพิ่ม **ระบบวิเคราะห์ลิงก์แบบกำหนดนโยบาย** ราย workspace พร้อมคะแนนความเสี่ยงและบันทึก audit export ได้
- เพิ่ม **Hybrid Data Layer** โดยใช้ Redis สำหรับสถานะเรียลไทม์ และ TimescaleDB/ClickHouse สำหรับ telemetry ระยะยาว
- เพิ่ม **ฟีเจอร์ collaboration** เช่น role/permission/moderation บนช่อง state-sync
- เพิ่ม **Voice Quality Dashboard** แสดง WER/latency แยกตามภาษา-ภูมิภาค พร้อมคำแนะนำ fallback อัตโนมัติ
- เพิ่ม **Offline-first Runtime Pack** (ชุด locale + voice + visual profile) สำหรับสภาพแวดล้อมเครือข่ายไม่เสถียร


## Extension Ideas
- Move mutable runtime state to Redis (metrics counters, telemetry cache, ws room membership) for multi-worker consistency.
- Add signed outbound proxy policy (HMAC request intent + per-tenant allowlist) to harden enterprise SSRF controls.
- Build contract-fuzz pipeline: property-based payload generators + mutation corpus for schema regression stress tests.
- Add persisted TSDB backend (InfluxDB/TimescaleDB) with retention + downsampling policies.
- Add proxy allowlist/denylist + content-type and size guardrails for stronger SSRF safety.
- Add locale QA checks (missing key scanner + pseudolocale) in CI.
- Add voice A/B routing and collect WER / latency metrics by language-region cohort.
- Add CRDT merge (Yjs/Automerge) for conflict-free collaborative editing beyond simple delta updates.
