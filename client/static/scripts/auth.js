/**
 * ฟังก์ชันหลักสำหรับตั้งค่าการทำงานของฟอร์ม Login/Register
 * @param {string} formId - ID ของฟอร์ม (เช่น 'loginForm' หรือ 'registerForm')
 * @param {string} messageId - ID ของ element ที่ใช้แสดงข้อความแจ้งเตือน
 * @param {string} apiUrl - Endpoint API ที่จะส่งข้อมูลไป (เช่น '/api/login' หรือ '/api/register')
 */
function initializeAuthForm(formId, messageId, apiUrl) {
    const form = document.getElementById(formId);
    const messageElement = document.getElementById(messageId);
    const submitButton = form.querySelector('button[type="submit"]');

    if (!form || !messageElement || !submitButton) {
        console.error(`Error: One or more elements not found for form ID: ${formId}`);
        return;
    }

    // ฟังก์ชันสำหรับแสดงข้อความ
    const displayMessage = (message, isSuccess = false) => {
        messageElement.textContent = message;
        messageElement.className = isSuccess ? 'success-message' : 'error-message';
        messageElement.style.display = 'block';
        
        // ซ่อนข้อความอัตโนมัติหลังจาก 5 วินาที
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, isSuccess ? 3000 : 5000); // ข้อความสำเร็จแสดงสั้นกว่า
    };

    // ฟังก์ชันสำหรับส่งข้อมูล
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // ซ่อนข้อความเดิม
        messageElement.style.display = 'none';

        // ปิดปุ่มระหว่างรอการตอบกลับ
        submitButton.disabled = true;
        submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                displayMessage(result.message, true);
                
                // หาก Login สำเร็จ ให้บันทึกข้อมูลและเปลี่ยนหน้าไปที่ Welcome (/)
                if (apiUrl.includes('/api/login')) {
                    // **[สำคัญ]** เก็บ userId และ username ไว้ใน Local Storage เป็น JSON object
                    const userData = {
                        userId: result.userId,
                        username: result.username
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    
                    console.log('✅ User data saved:', userData); // Debug log
                    
                    // หน่วงเวลาเล็กน้อยแล้วเปลี่ยนหน้าไปที่ Welcome
                    setTimeout(() => {
                        window.location.href = '/';  // เปลี่ยนจาก /chatbot.html → /
                    }, 500); 
                } 
                // หาก Register สำเร็จ ให้เปลี่ยนหน้าไป Login
                else if (apiUrl.includes('/api/register')) {
                     setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 1500);
                }

            } else {
                // กรณีเกิด Error จาก Server (เช่น Username ซ้ำ)
                displayMessage(result.message || "An unexpected error occurred.");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            displayMessage("Connection failed. Please check your network.");
        } finally {
            // เปิดปุ่มกลับมาทำงาน
            submitButton.disabled = false;
            // ตั้งค่าข้อความปุ่มกลับคืน
            if (apiUrl.includes('/api/login')) {
                submitButton.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Login`;
            } else {
                submitButton.innerHTML = `<i class="fa-solid fa-user-plus"></i> Register`;
            }
        }
    });
}