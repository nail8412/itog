document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якорные ссылки на другие страницы
            if (href === '#contact' || href === '#') {
                return;
            }
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Обработка формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const name = this.querySelector('#name');
            const phone = this.querySelector('#phone');
            const email = this.querySelector('#email');
            
            let isValid = true;
            
            if (name && name.value.trim() === '') {
                isValid = false;
                showError(name, 'Пожалуйста, введите ваше имя');
            }
            
            if (phone && phone.value.trim() === '') {
                isValid = false;
                showError(phone, 'Пожалуйста, введите ваш телефон');
            }
            
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Пожалуйста, введите корректный email');
            }
            
            if (isValid) {
                // В реальном проекте здесь будет отправка на сервер
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                this.reset();
            }
        });
    }
    
    // Функция проверки email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Функция показа ошибки
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let error = formGroup.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            formGroup.appendChild(error);
        }
        
        error.textContent = message;
        error.style.color = '#e53e3e';
        error.style.fontSize = '0.9rem';
        error.style.marginTop = '5px';
        
        input.style.borderColor = '#e53e3e';
        
        input.addEventListener('input', function() {
            error.textContent = '';
            input.style.borderColor = '#ddd';
        });
    }
    
    // Кнопки аренды на странице снаряжения
    const rentButtons = document.querySelectorAll('.gear-products .btn-primary');
    rentButtons.forEach(button => {
        if (button.textContent === 'Арендовать') {
            button.addEventListener('click', function() {
                const productName = this.closest('.product-content').querySelector('h3').textContent;
                alert(`Вы выбрали "${productName}" для аренды. Перенаправляем в форму заявки...`);
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // Добавляем стили для ошибок
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e53e3e;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .destination-card, .course-card, .instructor-card, .product-card {
            animation: fadeIn 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);
});