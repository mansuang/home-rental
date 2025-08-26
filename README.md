# บ้านเช่าสวยงาม - Landing Page

เว็บไซต์ Landing Page สำหรับบ้านเช่าในจังหวัดศรีสะเกษ ออกแบบด้วยธีมสีแดงขาวโมเดิร์น

## คุณสมบัติ

- 🏠 **หน้าหลัก** - แสดงข้อมูลบ้านเช่าพร้อมราคา 8,000 บาท/เดือน
- 🖼️ **แกลเลอรี่รูปภาพ** - แสดงรูปภาพห้องต่าง ๆ ในบ้าน
- ✨ **สิ่งอำนวยความสะดวก** - แสดงจุดเด่นของบ้าน (แอร์, เฟอร์นิเจอร์ครบ, บรรยากาศดี)
- 📞 **ข้อมูลติดต่อ** - เบอร์โทร, LINE ID, และแผนที่ตำแหน่ง
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- 🔐 **ระบบสมาชิก** - สมัครสมาชิก/เข้าสู่ระบบด้วย Supabase
- 💬 **ส่งข้อความ** - ลูกค้าสามารถส่งข้อความถึงเจ้าของบ้านได้
- 📧 **แจ้งเตือนอีเมล** - ส่งอีเมลแจ้งเตือนไปยังเจ้าของบ้านอัตโนมัติ

## โครงสร้างไฟล์

```
home-rental/
├── index.html              # หน้าหลัก
├── assets/
│   ├── css/
│   │   └── style.css      # ไฟล์สไตล์
│   ├── js/
│   │   ├── script.js      # ไฟล์ JavaScript หลัก
│   │   ├── auth.js        # ระบบ Authentication
│   │   └── supabase-config.js # การตั้งค่า Supabase
│   └── images/            # รูปภาพทั้งหมด
│       ├── Fb01_0.jpg     # ห้องนอน
│       ├── Fbm01_0.jpg    # ห้องน้ำ
│       ├── Fbm02_0.jpg    # ห้องน้ำ 2
│       ├── FC01_0.jpg     # ห้องรับแขก
│       ├── Fk01_0.jpg     # ห้องครัว
│       ├── Fk02_0.jpg     # ห้องครัว 2
│       ├── Fk03_0.jpg     # ห้องครัว 3
│       ├── Fl01_0.jpg     # ห้องนั่งเล่น
│       ├── Fl02_0.jpg     # ห้องนั่งเล่น 2
│       └── Fl03_0.jpg     # ภายนอก
├── supabase/              # Supabase Configuration
│   ├── functions/
│   │   └── send-email/    # Edge Function สำหรับส่งอีเมล
│   ├── migrations/        # Database Migrations
│   └── config.toml        # Supabase Config
├── package.json           # Dependencies
├── README.md              # คู่มือการใช้งาน
└── SUPABASE_SETUP.md      # คู่มือตั้งค่า Supabase
```

## การใช้งาน

### การรันเว็บไซต์

1. **ติดตั้ง dependencies:**
   ```bash
   npm install
   ```

2. **เริ่มต้น development server:**
   ```bash
   npm start
   ```

3. **หรือเปิดไฟล์โดยตรง:**
   - เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์

### การตั้งค่า Supabase

**สำคัญ!** ก่อนใช้งานระบบสมาชิกและการส่งข้อความ:

1. อ่านคู่มือใน `SUPABASE_SETUP.md`
2. สร้างโปรเจค Supabase
3. แก้ไข `assets/js/supabase-config.js`
4. สร้างตารางฐานข้อมูล
5. Deploy Edge Function

## ข้อมูลบ้านเช่า

- **ค่าเช่า**: 8,000 บาท/เดือน
- **สิ่งอำนวยความสะดวก**: 
  - มีแอร์ทุกห้อง
  - เฟอร์นิเจอร์ครบครัน
  - บรรยากาศดี ด้านหลังเป็นทุ่งนา
  - ทำเลดี ใกล้แหล่งชุมชน

## ข้อมูลติดต่อ

- **โทรศัพท์**: 0868555543
- **LINE ID**: mansuang
- **ที่ตั้ง**: 482C+C45 Mueang Tai, Mueang Si Sa Ket District, Si Sa Ket

## เทคโนโลยีที่ใช้

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Supabase (Authentication & Database)
- Google Fonts (Sarabun)
- Font Awesome Icons
- Google Maps Embed
- Resend API (Email Service)

## Features

- ✅ Responsive Design
- ✅ Mobile Navigation Menu
- ✅ Smooth Scrolling
- ✅ Image Gallery with Modal
- ✅ Contact Information with Click-to-Call
- ✅ Modern Red & White Theme
- ✅ Loading Animation
- ✅ Parallax Effects
- ✅ Interactive Hover Effects
- ✅ User Authentication (Sign Up/Sign In)
- ✅ Message System
- ✅ Email Notifications
- ✅ Database Integration

## การปรับแต่ง

### เปลี่ยนสีธีม
แก้ไขในไฟล์ `assets/css/style.css` ที่ตัวแปร CSS:
```css
:root {
    --primary-color: #dc3545; /* สีแดงหลัก */
    --secondary-color: #ffffff; /* สีขาว */
}
```

### เปลี่ยนข้อมูลติดต่อ
แก้ไขในไฟล์ `index.html` ในส่วน Contact Section

### เพิ่ม/ลดรูปภาพ
- เพิ่มรูปภาพในโฟลเดอร์ `assets/images/`
- แก้ไข HTML ในส่วน Gallery Section

## License

© 2024 บ้านเช่าสวยงาม ศรีสะเกษ. สงวนลิขสิทธิ์.
