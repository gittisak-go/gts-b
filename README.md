# 🚔 Portfolio Website - พ.ต.ต. กิจติศักดิ์ วรรณคีรี

Portfolio website สำหรับ **พ.ต.ต. กิจติศักดิ์ วรรณคีรี** หัวหน้านายปราบปรามเมืองเอก กองกำกับการ 1 บก.ปส.3  
กองบัญชาการตำรวจปราบปรามยาเสพติด (บก.ปส.)

## 🌟 Features

### 📰 ข่าวสารและเรื่องเล่า (News Section)

- **2 แถว Carousel** สำหรับแสดงข่าวและเรื่องเล่าจากพื้นที่ปฏิบัติการ
- ข่าวเด่น: ปฏิบัติการสำคัญ, การบูรณาการข้อมูล
- เรื่องเล่าจากพื้นที่: เบื้องหลังภารกิจ, ความร่วมมือกับประชาชน
- Badge หมวดหมู่สีกรมท่าม่วงตามอัตลักษณ์หน่วยงาน
- ปุ่ม Carousel สีแดงตามสีประจำหน่วย บก.ปส.

### 📖 เรื่องราวและผลงาน (Stories & Timeline)

- **Timeline** แสดงผลงานสำคัญรอบ 10-20 ปี (2555-2565)
- 4 Core Values: Citizen-Centric, Data-Driven, Collaboration, Innovation
- ไฮไลท์ปฏิบัติการพิเศษ: Operation Kunzio (2565)
- บันทึกส่วนตัวจาก พ.ต.ต. กิจติศักดิ์

### 💬 ระบบแจ้งเบาะแส (Chat Widget)

- **ปุ่มลอยขวาล่าง** สำหรับแจ้งเบาะแสหรือร้องเรียน
- รองรับ 2 ประเภท: 🔍 แจ้งเบาะแส / 📢 ร้องเรียน
- **โหมดไม่ระบุตัวตน** (Anonymous Mode)
- ฟิลด์: ชื่อ, โทรศัพท์, สถานที่เกิดเหตุ, รายละเอียด
- การันตีความลับอย่างเคร่งครัด

### 👤 เกี่ยวกับ (About)

- Card แสดงปฏิบัติการสำคัญพร้อม Badge สีกรมท่าม่วง
- ข้อมูลปฏิบัติการ "กุนซือเมืองสิงห์" (1-7 มิ.ย. 2565)
- ผลสำเร็จ: 8 ผู้ต้องหา, 50 กก. ไอซ์, 50 ล้านบาท
- สถิติผลงาน: 10+ จังหวัด, 50 ล้านบาท, 8 จับกุม

### 🗺️ แผนที่ (Location)

- Google Maps แสดงที่ตั้ง กองบัญชาการตำรวจปราบปรามยาเสพติด
- ขนาดกะทัดรัด responsive design

## 🎨 Design System

### สีหลัก (Primary Colors)

- **สีแดง** (Red 600-700): ปุ่ม Carousel - สีประจำหน่วย บก.ปส.
- **สีกรมท่าม่วง** (Indigo 900 - Purple 900): Badge หมวดหมู่, Header Card
- **สีชมพู/ฟ้า** (Primary/PrimaryDark): Accent colors
- **Dark Mode Support**: รองรับโหมดมืดทั้งเว็บไซต์

### Typography

- **Font**: Montserrat (100-900 weight)
- **Responsive**: ปรับขนาดตัวอักษรตาม breakpoint

### Components

- **Carousel**: Embla Carousel React พร้อมปุ่มเลื่อนสีแดง
- **Cards**: Border, Shadow, Gradient backgrounds
- **Timeline**: Vertical timeline พร้อม highlight special events
- **Forms**: Input fields, Checkbox, Textarea responsive

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.10 (Pages Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4.0
- **Animation**: Framer Motion 10.6.0
- **Carousel**: Embla Carousel React
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/gittisak-go/gts-b.git
cd gts-b

# Install dependencies
npm install

# Run development server
npm run dev
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
├── public/
│   ├── images/          # รูปภาพ profile, projects, articles
│   ├── All-Texts/       # ไฟล์ข้อความต้นฉบับ
│   └── sample-news-data.json
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   └── ChatWidget.js       # Widget แจ้งเบาะแส
│   │   ├── news/
│   │   │   └── NewsCard.js         # Card แสดงข่าว
│   │   ├── ui/
│   │   │   └── carousel.js         # Carousel component
│   │   ├── AnimatedText.js
│   │   ├── NavBar.js               # Menu พร้อม Dropdown
│   │   ├── Skills.js               # แผนที่สถานที่ตั้ง
│   │   ├── Experience.js
│   │   └── Education.js
│   ├── pages/
│   │   ├── index.js                # หน้าแรก
│   │   ├── about.js                # เกี่ยวกับ
│   │   ├── news.js                 # ข่าวอัพเดท (2 แถว carousel)
│   │   ├── stories.js              # เรื่องราวและ timeline
│   │   ├── projects.js
│   │   ├── articles.js
│   │   └── _app.js                 # Global wrapper + ChatWidget
│   └── styles/
│       └── globals.css
└── CHATBOT_GUIDE.md                # คู่มือสำหรับ Chatbot System
```

## 🚀 Deployment

### Vercel (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# สร้าง build
npm run build

# Deploy โฟลเดอร์ .next
```

### การตั้งค่า Environment Variables

ไม่จำเป็นสำหรับเวอร์ชันปัจจุบัน (ยังไม่มี Backend API)

## 📝 คำแนะนำสำหรับการพัฒนาต่อ

### 1. ระบบ Backend สำหรับแจ้งเบาะแส

- สร้าง API Route: `/api/submit-tip`
- เชื่อมต่อฐานข้อมูล: PostgreSQL หรือ MongoDB
- เก็บข้อมูล: type, name, phone, location, message, anonymous, timestamp

### 2. ระบบ Chatbot (ดู `CHATBOT_GUIDE.md`)

- Local LLM: Phi-2, TinyLlama, MobileLLM
- RAG Stack: LangChain + Ollama + ChromaDB + FastAPI
- Alternative: OpenAI GPT-4o-mini, Claude, Gemini Flash

### 3. ระบบจัดการข่าว (CMS)

- Headless CMS: Sanity.io, Contentful, Strapi
- หรือสร้าง Admin Panel ด้วย Next.js API Routes

## 🔐 Security Notes

- **ChatWidget**: ยังไม่ได้เชื่อมต่อ Backend (ใช้ alert placeholder)
- **Anonymous Mode**: จำเป็นต้องมี Backend encryption
- **Rate Limiting**: ควรเพิ่มเมื่อมี Backend API

## 📞 Contact

- **GitHub**: https://github.com/gittisak-go/gts-b
- **Organization**: กองบัญชาการตำรวจปราบปรามยาเสพติด (บก.ปส.)

## 📄 License

สงวนลิขสิทธิ์ © 2025 พ.ต.ต. กิจติศักดิ์ วรรณคีรี

---

**Built with ❤️ for public service** | สร้างด้วยความตั้งใจเพื่อรับใช้ประชาชน
