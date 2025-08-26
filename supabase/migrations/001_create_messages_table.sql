-- สร้างตาราง messages สำหรับเก็บข้อความจากลูกค้า
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- สร้าง index สำหรับการค้นหา
CREATE INDEX messages_user_id_idx ON messages(user_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);
CREATE INDEX messages_user_email_idx ON messages(user_email);

-- เปิดใช้งาน Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- สร้าง policy สำหรับให้ผู้ใช้เห็นเฉพาะข้อความของตัวเอง
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (auth.uid() = user_id);

-- สร้าง policy สำหรับให้ผู้ใช้สร้างข้อความได้
CREATE POLICY "Users can insert their own messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- สร้าง policy สำหรับ admin ให้ดูข้อความทั้งหมดได้
-- (สำหรับเจ้าของบ้าน - จะต้องสร้าง user role เพิ่มเติม)
CREATE POLICY "Admin can view all messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email = 'mansuang@gmail.com'
        )
    );

-- สร้าง function สำหรับอัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง trigger สำหรับอัปเดต updated_at
CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- เพิ่มข้อมูลตัวอย่าง (optional)
-- INSERT INTO messages (user_id, user_email, subject, message) VALUES
-- (auth.uid(), 'test@example.com', 'ทดสอบข้อความ', 'นี่คือข้อความทดสอบ');
