document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu__close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu__overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
    
    // Функция открытия мобильного меню
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    }
    
    // Функция закрытия мобильного меню
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = ''; // Разрешаем прокрутку страницы
    }
    
    // Обработчики событий
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Закрываем меню при клике на ссылку
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Закрываем меню при изменении размера окна (если оно было открыто)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Функция для управления скоростью анимации бегущих строк в зависимости от ширины экрана
    function adjustMarqueeSpeed() {
        const tracks = document.querySelectorAll('.testimonials__track');
        const windowWidth = window.innerWidth;
        
        // Устанавливаем разную скорость в зависимости от ширины экрана
        let duration;
        if (windowWidth < 768) {
            duration = '40s'; // Быстрее на мобильных
        } else if (windowWidth < 1200) {
            duration = '50s'; // Средняя скорость на планшетах
        } else {
            duration = '60s'; // Медленнее на десктопах
        }
        
        // Применяем скорость к элементам
        if (tracks.length > 0) {
            tracks.forEach(track => {
                track.style.animationDuration = duration;
            });
        }
    }
    
    // Вызываем функцию при загрузке и изменении размера окна
    adjustMarqueeSpeed();
    window.addEventListener('resize', adjustMarqueeSpeed);
    
    // Плавная прокрутка к якорям
    const anchors = document.querySelectorAll('a[href*="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const blockID = anchor.getAttribute('href').substr(1);
            
            if (document.getElementById(blockID)) {
                e.preventDefault();
                
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
