// تطبيق الحجم عند تحميل أي صفحة
document.addEventListener("DOMContentLoaded", function() {
    const savedSize = localStorage.getItem('globalFontSize');
    if (savedSize) {
        applyFontSize(savedSize);
        const slider = document.getElementById('fontSizeSlider');
        const label = document.getElementById('fontSizeLabel');
        if (slider) slider.value = savedSize;
        if (label) label.innerText = "حجم الخط: " + savedSize + "px";
    }
    
    // تفعيل زر الحجز
    setupBookingButton();
});

function openSettings() {
    document.getElementById('settingsModal').style.display = "flex";
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = "none";
}

function changeFontSize(size) {
    applyFontSize(size);
    localStorage.setItem('globalFontSize', size);
    document.getElementById('fontSizeLabel').innerText = "حجم الخط: " + size + "px";
}

function applyFontSize(size) {
    document.documentElement.style.fontSize = size + "px";
    
    const elements = document.querySelectorAll('body, p, h1, h2, h3, a, li, label, button, input, textarea');
    elements.forEach(el => {
        el.style.fontSize = size + "px";
    });
}

// إغلاق عند النقر خارج الصندوق
window.onclick = function(event) {
    const modal = document.getElementById('settingsModal');
    if (event.target == modal) {
        closeSettings();
    }
}

// دالة تفعيل زر الحجز والتوجيه الفوري للصفحة الرئيسية
function setupBookingButton() {
    const termsCheckbox = document.getElementById('terms');
    const bookingBtn = document.getElementById('bookingBtn');
    const bookingForm = document.querySelector('.booking-form');
    
    if (termsCheckbox && bookingBtn && bookingForm) {
        // الحقول المطلوبة
        const requiredFields = bookingForm.querySelectorAll('input[required]:not([type="checkbox"])');
        
        function checkFormValidity() {
            let allFilled = true;
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    allFilled = false;
                }
            });
            
            bookingBtn.disabled = !(allFilled && termsCheckbox.checked);
        }
        
        // التحقق عند التغيير
        requiredFields.forEach(field => {
            field.addEventListener('input', checkFormValidity);
        });
        
        termsCheckbox.addEventListener('change', checkFormValidity);
        
        // التحقق الأولي
        checkFormValidity();
        
        // عند الضغط على الزر - تحويل فوري بدون رسائل
        bookingBtn.addEventListener('click', function(e) {
            e.preventDefault(); // منع أي سلوك افتراضي
            
            if (!this.disabled) {
                // تحويل فوري مباشر للصفحة الرئيسية
                window.location.href = 'home.html';
            }
        });
    }
}