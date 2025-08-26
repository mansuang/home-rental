# บ้านเช่าสวยงาม - Landing Page

เว็บไซต์ Landing Page สำหรับบ้านเช่าในจังหวัดศรีสะเกษ ออกแบบด้วยธีมสีแดงขาวโมเดิร์น

## คุณสมบัติ

- 🏠 **หน้าหลัก** - แสดงข้อมูลบ้านเช่าพร้อมราคา 8,000 บาท/เดือน
- 🖼️ **แกลเลอรี่รูปภาพ** - แสดงรูปภาพห้องต่าง ๆ ในบ้าน
- ✨ **สิ่งอำนวยความสะดวก** - แสดงจุดเด่นของบ้าน (แอร์, เฟอร์นิเจอร์ครบ, บรรยากาศดี)
- 📞 **ข้อมูลติดต่อ** - เบอร์โทร, LINE ID, และแผนที่ตำแหน่ง
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ

## โครงสร้างไฟล์

```
home-rental/
├── index.html              # หน้าหลัก
├── assets/
│   ├── css/
│   │   └── style.css      # ไฟล์สไตล์
│   ├── js/
│   │   └── script.js      # ไฟล์ JavaScript
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
└── README.md              # คู่มือการใช้งาน
```

## การใช้งาน

1. เปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์
2. หรือใช้ Local Server เช่น Live Server ใน VS Code

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
- Google Fonts (Sarabun)
- Font Awesome Icons
- Google Maps Embed

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
