# 📝 สรุปการพัฒนาเว็บไซต์ พ.ต.ต. กิจติศักดิ์ วรรณคีรี

## ✅ สิ่งที่ทำเสร็จแล้ว

### 1. **หน้าข่าวอัพเดท** (`/news`)

- แสดงข่าวสารจากภารกิจงาน กก.ปส.
- โทนการเขียน: ไม่เป็นทางการ, เข้าถึงง่าย, บอกเล่าความจริง
- มี Carousel สำหรับข่าวเด่น
- มีข่าวตัวอย่าง 4 ข่าว:
  1. ปฏิบัติการทลายแก๊งกุนซือเมืองสิงห์
  2. Data-Driven Policing
  3. Behind the Scene: ภารกิจกลางคืน
  4. Citizen-Centric: ประชาชนเป็นหูเป็นตา

### 2. **หน้าเรื่องราว & งานเขียน** (`/stories`)

- Timeline ผลงานสำคัญรอบ 10-20 ปี
- 4 Core Values:
  - 🎯 Citizen-Centric
  - 📊 Data-Driven
  - 🤝 Collaboration
  - 💡 Innovation
- Timeline 5 ช่วงเวลา (2555-2565)
- บันทึกส่วนตัวจาก พ.ต.ต. กิจติศักดิ์

### 3. **NavBar พร้อม Dropdown Menu**

- เมนู "ข่าวสาร" แบบ dropdown
- 2 หน้าย่อย:
  - 📰 ข่าวอัพเดท
  - 📖 เรื่องราว & งานเขียน
- รองรับ Mobile (hamburger menu)

### 4. **ChatWidget - ระบบแจ้งเบาะแส/ร้องเรียน** 🆕

- ปุ่มลอยขวาล่าง (Fixed Bottom Right)
- ฟอร์ม 2 ประเภท:
  1. 🔍 แจ้งเบาะแส
  2. 📢 ร้องเรียน
- รองรับ **ไม่ระบุตัวตน** (Anonymous)
- ฟิลด์:
  - ชื่อ-นามสกุล (ถ้าไม่ anonymous)
  - เบอร์โทร (ถ้าไม่ anonymous)
  - สถานที่เกิดเหตุ (required)
  - รายละเอียด (required)
- UI สวยงาม responsive พร้อม dark mode

---

## 📂 โครงสร้างไฟล์ใหม่

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.js          # 🆕 Widget สำหรับแจ้งเบาะแส
│   ├── news/
│   │   └── NewsCard.js            # 🆕 Card สำหรับข่าว
│   ├── ui/
│   │   └── carousel.js            # Carousel component
│   └── NavBar.js                   # ✏️ เพิ่ม dropdown menu
│
├── pages/
│   ├── news.js                     # 🆕 หน้าข่าวอัพเดท
│   ├── stories.js                  # 🆕 หน้าเรื่องราว/งานเขียน
│   ├── _app.js                     # ✏️ เพิ่ม ChatWidget
│   ├── index.js                    # หน้าแรก
│   ├── about.js                    # ผลงาน
│   ├── projects.js                 # โปรเจกต์
│   └── articles.js                 # บทความ
```

---

## 🚀 การใช้งาน

### 1. รัน Dev Server

\`\`\`bash
npm run dev
\`\`\`

### 2. ทดสอบหน้าใหม่

- **ข่าวอัพเดท**: http://localhost:3000/news
- **เรื่องราว**: http://localhost:3000/stories
- **ChatWidget**: คลิกปุ่ม 💬 ขวาล่างทุกหน้า

---

## 🤖 แผน Chatbot System (ยังไม่ได้ทำ)

### ความต้องการ:

- ไม่มีแชทสดจริง (ไม่มีเจ้าหน้าที่ตอบ real-time)
- ใช้ **Local LLM ขนาดเล็ก** (<100MB)
- ฝึกจาก **เอกสารที่อัปโหลด** (RAG - Retrieval-Augmented Generation)
- ตอบคำถาม + รับเรื่องร้องเรียน/แจ้งเบาะแส

### แนะนำเทคโนโลยี:

#### 1. **Local LLM ที่เหมาะสม**

| โมเดล                  | ขนาด   | ข้อดี            | ข้อเสีย             |
| ---------------------- | ------ | ---------------- | ------------------- |
| **Phi-2** (Microsoft)  | ~2.7GB | เร็ว, ตอบได้ดี   | ใหญ่กว่า 100MB      |
| **TinyLlama 1.1B**     | ~600MB | เล็ก, เร็ว       | คุณภาพต่ำกว่า       |
| **MobileLLM**          | <500MB | เหมาะกับ mobile  | ใหม่, ยังไม่ stable |
| **DistilBERT + GPT-2** | ~300MB | เล็ก, ใช้ได้จริง | จำกัดความสามารถ     |

**แนะนำ**: **Phi-2** (quantized เป็น 4-bit → ~700MB) + **ollama** สำหรับรัน local

#### 2. **RAG Stack**

\`\`\`bash

# Backend

- LangChain (Python)
- Ollama (รัน LLM local)
- ChromaDB / Qdrant (Vector Database)
- FastAPI (API Server)

# Frontend (เชื่อมกับ Next.js)

- Socket.io (real-time chat)
- REST API calls
  \`\`\`

#### 3. **โครงสร้าง API แนะนำ**

\`\`\`
src/
├── pages/
│ └── api/
│ ├── chat.js # API endpoint สำหรับ chat
│ ├── submit-tip.js # API รับเบาะแส (บันทึก DB)
│ └── upload-docs.js # API อัปโหลดเอกสารเพื่อฝึก
│
├── server/ # Python Backend (แยกต่างหาก)
│ ├── main.py # FastAPI server
│ ├── models/
│ │ └── phi2_local.py # Load Phi-2 model
│ ├── rag/
│ │ ├── embeddings.py # สร้าง embeddings
│ │ ├── retriever.py # ดึงข้อมูลจาก vector DB
│ │ └── chain.py # LangChain RAG pipeline
│ └── data/
│ ├── documents/ # เอกสารที่อัปโหลด
│ └── vectorstore/ # ChromaDB storage
\`\`\`

#### 4. **ขั้นตอนการทำ Chatbot**

**Step 1: ติดตั้ง Ollama + Phi-2**
\`\`\`bash

# ติดตั้ง Ollama (https://ollama.ai)

curl https://ollama.ai/install.sh | sh

# ดาวน์โหลด Phi-2

ollama pull phi2
\`\`\`

**Step 2: สร้าง Python Backend**
\`\`\`bash
pip install langchain chromadb fastapi uvicorn ollama
\`\`\`

**Step 3: สร้าง RAG Pipeline**
\`\`\`python

# server/rag/chain.py

from langchain.llms import Ollama
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

llm = Ollama(model="phi2")
embeddings = OllamaEmbeddings(model="phi2")

# Load documents

vectorstore = Chroma(
persist_directory="./data/vectorstore",
embedding_function=embeddings
)

qa_chain = RetrievalQA.from_chain_type(
llm=llm,
retriever=vectorstore.as_retriever(),
chain_type="stuff"
)
\`\`\`

**Step 4: สร้าง API Endpoint**
\`\`\`python

# server/main.py

from fastapi import FastAPI
from rag.chain import qa_chain

app = FastAPI()

@app.post("/api/chat")
async def chat(message: str):
response = qa_chain.run(message)
return {"reply": response}
\`\`\`

**Step 5: เชื่อม Next.js กับ Backend**
\`\`\`javascript
// src/pages/api/chat.js
export default async function handler(req, res) {
const { message } = req.body;

const response = await fetch('http://localhost:8000/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message })
});

const data = await response.json();
res.status(200).json(data);
}
\`\`\`

---

## 💡 ทางเลือกอื่นๆ สำหรับ Chatbot

### ตัวเลือก 1: **ใช้ Cloud API แทน Local**

- **OpenAI GPT-4o-mini** (~$0.15/1M tokens) - ราคาถูก, คุณภาพดี
- **Anthropic Claude** - ปลอดภัยกว่า, GDPR compliant
- **Google Gemini Flash** - ฟรี (มีข้อจำกัด), รองรับภาษาไทย

**ข้อดี**: ไม่ต้องรัน server, ใช้งานง่าย
**ข้อเสีย**: มีค่าใช้จ่าย, ข้อมูลผ่าน cloud

### ตัวเลือก 2: **Hybrid Approach**

- ใช้ **Local LLM** สำหรับคำถามทั่วไป
- ใช้ **Cloud API** สำหรับคำถามซับซ้อน
- บันทึกเรื่องร้องเรียน/เบาะแสใน **Database** (ไม่ผ่าน AI)

---

## 📊 ตัวอย่างข้อมูลสำหรับฝึก Chatbot

สร้างไฟล์ `server/data/documents/faq.md`:

\`\`\`markdown

# คำถามที่พบบ่อย (FAQ)

## Q: จะแจ้งเบาะแสยาเสพติดได้อย่างไร?

A: สามารถแจ้งผ่านเว็บไซต์นี้ โดยคลิกปุ่ม 💬 ขวาล่าง เลือก "แจ้งเบาะแส" และกรอกข้อมูล เราจะเก็บรักษาความลับอย่างเคร่งครัด

## Q: ข้อมูลของฉันปลอดภัยไหม?

A: ปลอดภัย 100% เราเก็บรักษาข้อมูลตามมาตรฐาน PDPA และจะไม่เปิดเผยตัวผู้แจ้งเบาะแส

## Q: ตำรวจจะติดตามเรื่องอย่างไร?

A: หลังจากได้รับเบาะแส เราจะตรวจสอบข้อมูล วิเคราะห์ และดำเนินการตามขั้นตอน คาดว่าจะมีการติดต่อกลับภายใน 24-48 ชั่วโมง

## Q: พ.ต.ต. กิจติศักดิ์ เป็นใคร?

A: พันตำรวจโท กิจติศักดิ์ วรรณคีรี เป็นหัวหน้านายปราบปรามเมืองเอก กก.1 บก.ปส.3 มีประสบการณ์การทำงานกว่า 10 ปี เชี่ยวชาญด้าน Data-Driven Policing
\`\`\`

---

## 🎯 สรุป Next Steps

### ระยะสั้น (1-2 สัปดาห์)

1. ✅ ทดสอบ News & Stories pages
2. ✅ ทดสอบ ChatWidget UI
3. ⬜ สร้าง Database สำหรับเก็บเบาะแส (PostgreSQL / MongoDB)
4. ⬜ สร้าง API `/api/submit-tip` บันทึกข้อมูล

### ระยะกลาง (1 เดือน)

5. ⬜ ติดตั้ง Ollama + Phi-2 Local
6. ⬜ สร้าง RAG Pipeline พร้อม Vector DB
7. ⬜ เชื่อม Chatbot เข้ากับ ChatWidget
8. ⬜ ทดสอบการตอบคำถาม

### ระยะยาว (2-3 เดือน)

9. ⬜ อัปโหลดเอกสารจริง + Fine-tune model
10. ⬜ เพิ่ม Analytics Dashboard (ดูสถิติเบาะแส)
11. ⬜ Deploy production (Vercel + Railway/Render สำหรับ backend)

---

## 📞 ติดต่อ

หากมีคำถามเพิ่มเติมเกี่ยวกับการพัฒนา Chatbot หรือต้องการความช่วยเหลือ:

- **GitHub**: @gtsalpha
- **Email**: [ระบุ email]

---

**สร้างโดย GitHub Copilot**  
วันที่: 23 พฤศจิกายน 2568
