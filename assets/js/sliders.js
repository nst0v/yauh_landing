document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера продуктов
    const productsSwiper = new Swiper('.productsSwiper', {
        // Параметры слайдера
        slidesPerView: 1, // На мобильных устройствах показываем 1 слайд
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000, // Автопрокрутка каждые 5 секунд
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

    setTimeout(function() {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
        
        if (nextButton && prevButton) {
            // Добавляем класс для подсветки
            nextButton.classList.add('highlight-button');
            prevButton.classList.add('highlight-button');
            
            // Удаляем класс через 2 секунды
            setTimeout(function() {
                nextButton.classList.remove('highlight-button');
                prevButton.classList.remove('highlight-button');
            }, 2000);
        }
    }, 3000);
});