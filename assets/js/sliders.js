document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера продуктов
    const productsSwiper = new Swiper('.productsSwiper', {
        // Параметры слайдера
        slidesPerView: 1, // На мобильных устройствах показываем 1 слайд
        spaceBetween: 30,
        loop: true,
        loopAdditionalSlides: 3,
        speed: 400,
        allowTouchMove: true,
        shortSwipes: true,
        longSwipes: true,
        followFinger: true,
        autoplay: {
            delay: 4000, // Автопрокрутка каждые 4 секунды
            disableOnInteraction: false, // Continue autoplay after user interaction
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

    // Добавляем подсказки для кнопок навигации
    function addButtonLabels() {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
        
        if (nextButton && prevButton) {
            // Добавляем атрибуты для улучшения доступности
            nextButton.setAttribute('aria-label', 'Следующий слайд');
            prevButton.setAttribute('aria-label', 'Предыдущий слайд');
            
            // Добавляем подсказки при наведении
            nextButton.setAttribute('title', 'Следующий слайд');
            prevButton.setAttribute('title', 'Предыдущий слайд');
        }
    }
    
    // Вызываем функцию добавления подсказок
    addButtonLabels();
});
