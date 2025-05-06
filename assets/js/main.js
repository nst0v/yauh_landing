$(document).ready(function() {
    // Мобильное меню
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
    });
    
    // Закрытие мобильного меню при клике на ссылку
    $('.nav__link').click(function() {
        $('.menu-toggle').removeClass('active');
        $('.nav').removeClass('active');
    });
    
    // Изменение стиля шапки при скролле
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
    
    // Плавная прокрутка к якорям
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top - 70 // Учитываем высоту шапки
        }, 800, 'swing');
    });
    
    // Обработка формы на GitHub Pages (без PHP)
    if (window.location.hostname.includes('github.io')) {
        $('#contactForm').submit(function(e) {
            e.preventDefault();
            
            // Здесь можно добавить интеграцию с сервисами отправки форм
            // например, FormSubmit, Formspree или EmailJS
            
            // Пример с FormSubmit (требуется регистрация)
            // var formAction = "https://formsubmit.co/your-email@example.com";
            // $(this).attr('action', formAction);
            // this.submit();
            
            // Для демонстрации просто покажем сообщение об успехе
            $('#formMessage').addClass('form-message--success').text('Сообщение успешно отправлено (демо)!');
            
            // Очистка формы
            this.reset();
        });
    }
});