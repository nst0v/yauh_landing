// Инициализация слайдера Swiper для секции кейсов
document.addEventListener('DOMContentLoaded', function() {
  const casesSwiper = new Swiper('.cases-swiper', {
    // Основные параметры
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    
    // Адаптивные брейкпоинты
    breakpoints: {
      // >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    
    // Пагинация (точки)
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  
  // Добавляем обработчики событий для кастомных кнопок навигации
  document.querySelector('.cases-nav--prev .cases-nav__button').addEventListener('click', function() {
    casesSwiper.slidePrev();
  });
  
  document.querySelector('.cases-nav--next .cases-nav__button').addEventListener('click', function() {
    casesSwiper.slideNext();
  });
});
