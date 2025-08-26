# คู่มือการ Deploy ไปยัง Vercel

## วิธีการ Deploy

### 1. ผ่าน Vercel CLI (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy
vercel

# Deploy สำหรับ production
vercel --prod
```

### 2. ผ่าน GitHub Integration

1. Push code ไปยัง GitHub repository
2. เข้าไปที่ [vercel.com](https://vercel.com)
3. เชื่อมต่อกับ GitHub
4. เลือก repository `home-rental`
5. กด Deploy

## การตั้งค่า Environment Variables

ใน Vercel Dashboard > Project Settings > Environment Variables:

### Production Environment Variables:
- `SUPABASE_URL`: https://your-project.supabase.co
- `SUPABASE_ANON_KEY`: your_anon_key_here
- `RESEND_API_KEY`: your_resend_api_key

### Development Environment Variables (Optional):
- `NODE_ENV`: development

## การตั้งค่า Custom Domain

1. ใน Vercel Dashboard > Project > Settings > Domains
2. เพิ่ม custom domain ของคุณ
3. ตั้งค่า DNS records ตามที่ Vercel แนะนำ

## Build Settings

Vercel จะใช้การตั้งค่าจากไฟล์ `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "public"
}
```

## การอัปเดต Supabase Configuration

หลังจาก deploy แล้ว:

1. อัปเดต Site URL ใน Supabase Dashboard:
   - ไปที่ Authentication > Settings
   - เปลี่ยน Site URL เป็น: `https://your-vercel-domain.vercel.app`

2. เพิ่ม Redirect URLs:
   - `https://your-vercel-domain.vercel.app`
   - `https://your-custom-domain.com` (ถ้ามี)

## การแก้ไขปัญหา

### ปัญหา: "No Output Directory found"
- ตรวจสอบว่ามี `vercel.json` และ build script ใน `package.json`
- รัน `npm run build` locally เพื่อทดสอบ

### ปัญหา: "Supabase connection failed"
- ตรวจสอบ Environment Variables ใน Vercel Dashboard
- ตรวจสอบ CORS settings ใน Supabase

### ปัญหา: "Function timeout"
- ตรวจสอบ Supabase Edge Functions
- ตรวจสอบ API keys

## การ Monitor และ Analytics

1. ใน Vercel Dashboard > Analytics
2. ตรวจสอบ performance metrics
3. ดู error logs ใน Functions tab

## การตั้งค่า Security Headers

ไฟล์ `vercel.json` มี security headers พื้นฐาน:
- X-Content-Type-Options
- X-Frame-Options  
- X-XSS-Protection

## การ Optimize Performance

1. **Image Optimization**: Vercel จะ optimize รูปภาพอัตโนมัติ
2. **Caching**: Static assets จะถูก cache เป็นเวลา 1 ปี
3. **CDN**: Vercel ใช้ global CDN

## Commands สำหรับการ Deploy

```bash
# Development
npm run dev

# Build locally
npm run build

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# View project info
vercel ls
```

## Post-Deployment Checklist

- [ ] ทดสอบการโหลดหน้าเว็บ
- [ ] ทดสอบการสมัครสมาชิก
- [ ] ทดสอบการเข้าสู่ระบบ
- [ ] ทดสอบการส่งข้อความ
- [ ] ตรวจสอบอีเมลแจ้งเตือน
- [ ] ทดสอบ responsive design
- [ ] ตรวจสอบ performance ด้วย Lighthouse

## Support

หากมีปัญหาในการ deploy:
1. ตรวจสอบ Vercel build logs
2. ตรวจสอบ browser console
3. ตรวจสอบ Supabase logs
4. ดู [Vercel Documentation](https://vercel.com/docs)
