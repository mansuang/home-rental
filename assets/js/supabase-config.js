// Supabase Configuration
// คุณจะต้องแทนที่ URL และ API Key ด้วยค่าจริงจาก Supabase Dashboard

const SUPABASE_URL = 'https://ssyqiyozbopsyzeiaald.supabase.co'; // เช่น 'https://xyzcompany.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeXFpeW96Ym9wc3l6ZWlhYWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxOTI5NjIsImV4cCI6MjA3MTc2ODk2Mn0.GkKyEUqw4Oo49qKujB6SceF8ivClPGs_iTjCYtz1OSM'; // API Key จาก Project Settings

// สร้าง Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export สำหรับใช้ในไฟล์อื่น
window.supabaseClient = supabase;

// ตัวแปรสำหรับเก็บ user session
window.currentUser = null;

// ฟังก์ชันตรวจสอบ authentication state
window.checkAuthState = async function () {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        window.currentUser = user;
        updateUIBasedOnAuth();
        return user;
    } catch (error) {
        console.error('Error checking auth state:', error);
        return null;
    }
};

// ฟังก์ชันอัปเดต UI ตาม authentication state
function updateUIBasedOnAuth() {
    const authSection = document.getElementById('auth-section');
    const messageSection = document.getElementById('message-section');
    const userInfo = document.getElementById('user-info');

    if (window.currentUser) {
        // ผู้ใช้ล็อกอินแล้ว
        if (authSection) authSection.style.display = 'none';
        if (messageSection) messageSection.style.display = 'block';
        if (userInfo) {
            userInfo.innerHTML = `
                <div class="user-welcome">
                    <span>ยินดีต้อนรับ, ${window.currentUser.email}</span>
                    <button onclick="logout()" class="btn btn-secondary btn-sm">ออกจากระบบ</button>
                </div>
            `;
        }
    } else {
        // ผู้ใช้ยังไม่ล็อกอิน
        if (authSection) authSection.style.display = 'block';
        if (messageSection) messageSection.style.display = 'none';
        if (userInfo) userInfo.innerHTML = '';
    }
}

// ฟังก์ชัน Sign Up
window.signUp = async function (email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) throw error;

        alert('กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัครสมาชิก');
        return { success: true, data };
    } catch (error) {
        console.error('Error signing up:', error);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก: ' + error.message);
        return { success: false, error };
    }
};

// ฟังก์ชัน Sign In
window.signIn = async function (email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        window.currentUser = data.user;
        updateUIBasedOnAuth();
        alert('เข้าสู่ระบบสำเร็จ!');
        return { success: true, data };
    } catch (error) {
        console.error('Error signing in:', error);
        alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + error.message);
        return { success: false, error };
    }
};

// ฟังก์ชัน Logout
window.logout = async function () {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        window.currentUser = null;
        updateUIBasedOnAuth();
        alert('ออกจากระบบสำเร็จ');
    } catch (error) {
        console.error('Error signing out:', error);
        alert('เกิดข้อผิดพลาดในการออกจากระบบ: ' + error.message);
    }
};

// ฟังก์ชันส่งข้อความ
window.sendMessage = async function (subject, message) {
    try {
        if (!window.currentUser) {
            alert('กรุณาเข้าสู่ระบบก่อน');
            return { success: false };
        }

        // บันทึกข้อความลงฐานข้อมูล
        const { data, error } = await supabase
            .from('messages')
            .insert([
                {
                    user_id: window.currentUser.id,
                    user_email: window.currentUser.email,
                    subject: subject,
                    message: message,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;

        // เรียกใช้ Edge Function เพื่อส่งอีเมล
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email', {
            body: {
                to: 'mansuang@gmail.com',
                subject: `ข้อความจากลูกค้า: ${subject}`,
                message: `
                    จาก: ${window.currentUser.email}
                    หัวข้อ: ${subject}
                    
                    ข้อความ:
                    ${message}
                    
                    ส่งเมื่อ: ${new Date().toLocaleString('th-TH')}
                `
            }
        });

        if (emailError) {
            console.warn('Email sending failed:', emailError);
            // ไม่ให้ fail ทั้งหมดถ้าส่งอีเมลไม่สำเร็จ
        }

        alert('ส่งข้อความสำเร็จ! เจ้าของบ้านจะได้รับอีเมลแจ้งเตือน');
        return { success: true, data };
    } catch (error) {
        console.error('Error sending message:', error);
        alert('เกิดข้อผิดพลาดในการส่งข้อความ: ' + error.message);
        return { success: false, error };
    }
};

// เริ่มต้นตรวจสอบ auth state เมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', function () {
    // รอให้ Supabase library โหลดเสร็จก่อน
    if (window.supabase) {
        checkAuthState();
    } else {
        // รอ Supabase library โหลดเสร็จ
        setTimeout(() => {
            if (window.supabase) {
                checkAuthState();
            }
        }, 1000);
    }
});
