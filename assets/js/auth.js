// Authentication UI and Logic

// ฟังก์ชันสลับ Tab ระหว่าง Login และ Register
window.switchTab = function (tabName) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTabs = document.querySelectorAll('.auth-tab');

    // ลบ active class จากทุก tab
    authTabs.forEach(tab => tab.classList.remove('active'));

    if (tabName === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        authTabs[0].classList.add('active');
    } else if (tabName === 'register') {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        authTabs[1].classList.add('active');
    }
};

// ฟังก์ชันจัดการ Login Form
window.handleLogin = async function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // แสดง loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'กำลังเข้าสู่ระบบ...';
    submitBtn.disabled = true;

    try {
        const result = await window.signIn(email, password);

        if (result.success) {
            // รีเซ็ตฟอร์ม
            event.target.reset();
        }
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        // คืนค่าปุ่ม
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
};

// ฟังก์ชันจัดการ Register Form
window.handleRegister = async function (event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // ตรวจสอบรหัสผ่าน
    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    if (password.length < 6) {
        alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        return;
    }

    // แสดง loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'กำลังสมัครสมาชิก...';
    submitBtn.disabled = true;

    try {
        const result = await window.signUp(email, password);

        if (result.success) {
            // รีเซ็ตฟอร์ม
            event.target.reset();
            // เปลี่ยนไปที่ tab login
            switchTab('login');
        }
    } catch (error) {
        console.error('Register error:', error);
    } finally {
        // คืนค่าปุ่ม
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
};

// ฟังก์ชันจัดการส่งข้อความ
window.handleSendMessage = async function (event) {
    event.preventDefault();

    const subject = document.getElementById('message-subject').value;
    const message = document.getElementById('message-content').value;

    if (!subject.trim() || !message.trim()) {
        alert('กรุณากรอกหัวข้อและข้อความ');
        return;
    }

    // แสดง loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'กำลังส่งข้อความ...';
    submitBtn.disabled = true;

    try {
        const result = await window.sendMessage(subject, message);

        if (result.success) {
            // รีเซ็ตฟอร์ม
            event.target.reset();
        }
    } catch (error) {
        console.error('Send message error:', error);
    } finally {
        // คืนค่าปุ่ม
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
};

// ฟังก์ชันแสดงข้อความแจ้งเตือนแบบสวยงาม
window.showNotification = function (message, type = 'info') {
    // สร้าง notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // เพิ่ม styles ถ้ายังไม่มี
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
            }
            
            .notification-info {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
                color: #1565c0;
            }
            
            .notification-success {
                background: #e8f5e8;
                border-left: 4px solid #4caf50;
                color: #2e7d32;
            }
            
            .notification-error {
                background: #ffebee;
                border-left: 4px solid #f44336;
                color: #c62828;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // เพิ่มลงในหน้าเว็บ
    document.body.appendChild(notification);

    // ลบอัตโนมัติหลัง 5 วินาที
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
};

// ฟังก์ชันตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
window.isLoggedIn = function () {
    return window.currentUser !== null;
};

// ฟังก์ชันรีเฟรช UI เมื่อมีการเปลี่ยนแปลง auth state
window.refreshAuthUI = function () {
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
                    <div class="user-info-content">
                        <span class="welcome-text">ยินดีต้อนรับ, ${window.currentUser.email}</span>
                        <button onclick="logout()" class="btn btn-secondary btn-sm">ออกจากระบบ</button>
                    </div>
                </div>
            `;
        }
    } else {
        // ผู้ใช้ยังไม่ล็อกอิน
        if (authSection) authSection.style.display = 'block';
        if (messageSection) messageSection.style.display = 'none';
        if (userInfo) userInfo.innerHTML = '';
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // ตรวจสอบ auth state เมื่อโหลดหน้าเว็บ
    setTimeout(() => {
        if (window.checkAuthState) {
            window.checkAuthState();
        }
    }, 1000);

    // เพิ่ม event listener สำหรับ Enter key ในฟอร์ม
    const forms = document.querySelectorAll('.auth-form form, .message-section form');
    forms.forEach(form => {
        form.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
        });
    });
});
