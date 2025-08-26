# คู่มือการตั้งค่า Supabase สำหรับบ้านเช่าสวยงาม

## 1. สร้างโปรเจค Supabase

1. ไปที่ [https://supabase.com](https://supabase.com)
2. สมัครสมาชิกหรือเข้าสู่ระบบ
3. คลิก "New Project"
4. ใส่ชื่อโปรเจค เช่น "home-rental"
5. เลือก Organization และ Region
6. ตั้งรหัสผ่านฐานข้อมูล (จดไว้ด้วย!)
7. คลิก "Create new project"

## 2. ได้รับข้อมูล API Keys

หลังจากโปรเจคสร้างเสร็จ:

1. ไปที่ Settings > API
2. คัดลอกข้อมูลต่อไปนี้:
   - **Project URL** (เช่น `https://xyzabc123.supabase.co`)
   - **anon public** key
   - **service_role** key (ระวัง! ห้ามแชร์)

## 3. แก้ไขไฟล์ Configuration

แก้ไขไฟล์ `assets/js/supabase-config.js`:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

## 4. สร้างตารางฐานข้อมูล

ไปที่ SQL Editor ใน Supabase Dashboard และรันคำสั่ง:

```sql
-- คัดลอกเนื้อหาจากไฟล์ supabase/migrations/001_create_messages_table.sql
-- และ paste ที่นี่แล้วกด RUN
```

หรือใช้ไฟล์ migration:
1. ติดตั้ง Supabase CLI: `npm install -g supabase`
2. รัน: `supabase db push`

## 5. ตั้งค่า Authentication

ใน Supabase Dashboard:

1. ไปที่ Authentication > Settings
2. ตั้งค่า Site URL เป็น: `http://localhost:3000` (สำหรับ development)
3. เพิ่ม Redirect URLs สำหรับ production
4. เปิดใช้งาน Email confirmations (ถ้าต้องการ)

## 6. ตั้งค่าการส่งอีเมล

### วิธีที่ 1: ใช้ Resend (แนะนำ)

1. สมัครที่ [https://resend.com](https://resend.com)
2. สร้าง API Key
3. ใน Supabase Dashboard > Project Settings > Environment Variables
4. เพิ่มตัวแปร: `RESEND_API_KEY` = `your_resend_api_key`

### วิธีที่ 2: ใช้ SMTP อื่น ๆ

แก้ไขไฟล์ `supabase/functions/send-email/index.ts` ให้ใช้ SMTP service ที่คุณต้องการ

## 7. Deploy Edge Function

```bash
# ติดตั้ง Supabase CLI (ถ้ายังไม่ได้ติดตั้ง)
npm install -g supabase

# เข้าสู่ระบบ
supabase login

# Link โปรเจค
supabase link --project-ref YOUR_PROJECT_ID

# Deploy function
supabase functions deploy send-email
```

## 8. ทดสอบระบบ

1. เปิดเว็บไซต์: `npm start`
2. ลองสมัครสมาชิกใหม่
3. ยืนยันอีเมล (ถ้าเปิดใช้งาน email confirmation)
4. เข้าสู่ระบบ
5. ส่งข้อความทดสอบ
6. ตรวจสอบอีเมลที่ mansuang@gmail.com

## 9. การตั้งค่าสำหรับ Production

### Environment Variables ที่ต้องตั้งค่า:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY`

### ใน Supabase Dashboard:
1. ไปที่ Authentication > Settings
2. อัปเดต Site URL เป็น domain จริง
3. เพิ่ม production URLs ใน Redirect URLs
4. ตั้งค่า Custom SMTP (ถ้าต้องการ)

## 10. Security Checklist

- ✅ ใช้ HTTPS ใน production
- ✅ ตั้งค่า CORS อย่างถูกต้อง
- ✅ ใช้ Row Level Security (RLS)
- ✅ ไม่เปิดเผย service_role key
- ✅ ตั้งค่า rate limiting
- ✅ ตรวจสอบ database policies

## 11. Troubleshooting

### ปัญหาที่พบบ่อย:

1. **"Invalid API key"**
   - ตรวจสอบว่า API key ถูกต้อง
   - ตรวจสอบว่า Project URL ถูกต้อง

2. **"User not authenticated"**
   - ตรวจสอบว่าผู้ใช้ล็อกอินแล้ว
   - ตรวจสอบ JWT token

3. **"Permission denied"**
   - ตรวจสอบ RLS policies
   - ตรวจสอบสิทธิ์ของผู้ใช้

4. **"Email not sent"**
   - ตรวจสอบ RESEND_API_KEY
   - ตรวจสอบ Edge Function logs

### การดู Logs:

```bash
# ดู function logs
supabase functions logs send-email

# ดู database logs
supabase logs db
```

## 12. ข้อมูลเพิ่มเติม

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Authentication Guide](https://supabase.com/docs/guides/auth)

## 13. Support

หากพบปัญหาในการตั้งค่า:
- ตรวจสอบ Console ของเบราว์เซอร์
- ดู Network tab ใน Developer Tools
- ตรวจสอบ Supabase Dashboard > Logs
