document.addEventListener('DOMContentLoaded', function() {
    // Кэшируем часто используемые элементы
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const body = document.body;
    
    // Мобильное меню
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                // Если меню открыто, сразу закрываем без задержки
                this.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                nav.style.animation = 'fadeOutMenu 0.3s ease-in-out forwards';
            } else {
                // Если меню закрыто, просто добавляем классы
                this.classList.add('active');
                nav.classList.add('active');
                body.classList.add('menu-open');
                nav.style.animation = 'fadeInMenu 0.3s ease-in-out forwards';
            }
        });
        
        // Обновляем обработчик для закрытия меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Сразу закрываем меню без задержки
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                nav.style.animation = 'fadeOutMenu 0.3s ease-in-out forwards';
            });
        });
        
        // Обновляем обработчик для закрытия меню при клике вне меню
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                
                // Сразу закрываем меню без задержки
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
                nav.style.animation = 'fadeOutMenu 0.3s ease-in-out forwards';
            }
        });
    }
    
    // Изменение стиля шапки при скролле с оптимизацией производительности
    if (header) {
        let scrollTimeout;
        let lastScrollTop = 0;
        const scrollThreshold = 50;
        
        window.addEventListener('scroll', function() {
            // Используем requestAnimationFrame для оптимизации производительности
            if (!scrollTimeout) {
                scrollTimeout = window.requestAnimationFrame(function() {
                    const scrollTop = window.scrollY;
                    
                    // Добавляем/удаляем класс только если пересекли порог
                    if (scrollTop > scrollThreshold && !header.classList.contains('scrolled')) {
                        header.classList.add('scrolled');
                    } else if (scrollTop <= scrollThreshold && header.classList.contains('scrolled')) {
                        header.classList.remove('scrolled');
                    }
                    
                    // Добавляем класс для направления прокрутки
                    if (scrollTop > lastScrollTop && scrollTop > 150) {
                        header.classList.add('header-hidden');
                    } else {
                        header.classList.remove('header-hidden');
                    }
                    
                    lastScrollTop = scrollTop;
                    scrollTimeout = null;
                });
            }
        });
    }
    
    // Плавная прокрутка к якорям с учетом высоты шапки
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Пропускаем, если это не якорная ссылка
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Получаем высоту шапки динамически
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20, // Дополнительный отступ для комфорта
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обработка формы на GitHub Pages (без PHP)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация формы
            const formValid = validateForm(contactForm);
            
            if (formValid) {
                // Если на GitHub Pages
                if (window.location.hostname.includes('github.io')) {
                    // Здесь можно добавить интеграцию с сервисами отправки форм
                    // например, FormSubmit, Formspree или EmailJS
                    
                    // Для демонстрации показываем сообщение об успехе
                    showFormMessage('Сообщение успешно отправлено (демо)!', 'success');
                    
                    // Очистка формы
                    this.reset();
                } else {
                    // Если на реальном хостинге, можно отправить форму обычным способом
                    // this.submit();
                    
                    // Или использовать AJAX для отправки формы без перезагрузки страницы
                    submitFormWithAjax(contactForm);
                }
            }
        });
    }
    
    // Функция валидации формы
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            // Удаляем предыдущие сообщения об ошибках
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            
            // Проверяем обязательные поля
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                showInputError(input, 'Это поле обязательно для заполнения');
            }
            
            // Проверяем email
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    showInputError(input, 'Введите корректный email');
                }
            }
        });
        
        return isValid;
    }
    
    // Функция для отображения ошибки ввода
    function showInputError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        
        input.parentElement.appendChild(errorElement);
        input.classList.add('input-error');
    }
    
    // Функция для отображения сообщения формы
    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message';
            formMessage.classList.add('form-message--' + type);
            
            // Автоматически скрываем сообщение через 5 секунд
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
    
    // Функция для отправки формы через AJAX
    function submitFormWithAjax(form) {
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', form.action || 'includes/form-handler.php');
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        showFormMessage(response.message || 'Сообщение успешно отправлено!', 'success');
                        form.reset();
                    } else {
                        showFormMessage(response.message || 'Произошла ошибка при отправке.', 'error');
                    }
                } catch (e) {
                    // Если ответ не в формате JSON
                    if (xhr.responseText.includes('success')) {
                        showFormMessage('Сообщение успешно отправлено!', 'success');
                        form.reset();
                    } else {
                        showFormMessage('Произошла ошибка при отправке.', 'error');
                    }
                }
            } else {
                showFormMessage('Произошла ошибка при отправке.', 'error');
            }
        };
        xhr.onerror = function() {
            showFormMessage('Произошла ошибка соединения.', 'error');
        };
        xhr.send(formData);
    }
    
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.feature-card, .case-card, .product-card, .section-title');
    
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Прекращаем наблюдение после появления
            });
        }, appearOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in'); // Добавляем класс для анимации
            appearOnScroll.observe(element);
        });
    } else {
        // Запасной вариант для старых браузеров
        animatedElements.forEach(element => {
            element.classList.add('appear');
        });
    }
});
