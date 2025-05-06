document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера продуктов
    const productsSwiper = new Swiper('.productsSwiper', {
        // Параметры слайдера
        slidesPerView: 1, // На мобильных устройствах показываем 1 слайд
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000, // Автопрокрутка каждые 4 секунды
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Адаптивные брейкпоинты
        breakpoints: {
            // Когда ширина экрана >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // Когда ширина экрана >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Функция для мигания кнопок навигации с плавным затуханием
    function pulseNavigationButtons() {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
        
        if (nextButton && prevButton) {
            // Добавляем класс для подсветки
            nextButton.classList.add('highlight-button');
            prevButton.classList.add('highlight-button');
            
            // Вместо резкого удаления класса, добавляем класс для плавного затухания
            setTimeout(function() {
                nextButton.classList.add('highlight-button-fading');
                prevButton.classList.add('highlight-button-fading');
                
                // Удаляем оба класса через 3 секунды (время затухания)
                setTimeout(function() {
                    nextButton.classList.remove('highlight-button');
                    prevButton.classList.remove('highlight-button');
                    nextButton.classList.remove('highlight-button-fading');
                    prevButton.classList.remove('highlight-button-fading');
                    
                    // Больше не повторяем мигание
                }, 3000); // 3 секунды на затухание
            }, 5000); // 5 секунд активной подсветки
        }
    }

    // Запускаем мигание кнопок через 3 секунды после загрузки
    setTimeout(pulseNavigationButtons, 3000);
});
