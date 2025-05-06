<?php
// Определяем переменные для использования в шаблоне
$pageTitle = "Yauh Landing";
$currentYear = date("Y");
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="assets/css/main.min.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>

    <section class="hero">
        <div class="container">
            <h1 class="hero__title">Главный заголовок</h1>
            <p class="hero__subtitle">Подзаголовок, который объясняет ценность предложения</p>
            <a href="#contact" class="btn btn--primary">Связаться с нами</a>
        </div>
    </section>

    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Наши преимущества</h2>
            <div class="features__grid">
                <div class="feature-card">
                    <div class="feature-card__icon">
                        <img src="assets/img/icons/feature-1.svg" alt="Feature 1">
                    </div>
                    <h3 class="feature-card__title">Преимущество 1</h3>
                    <p class="feature-card__text">Описание преимущества, которое объясняет его ценность для клиента.</p>
                </div>
                <!-- Другие карточки преимуществ -->
            </div>
        </div>
    </section>

    <!-- Другие секции -->

    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Свяжитесь с нами</h2>
            <form class="contact-form" action="includes/form-handler.php" method="POST">
                <div class="form-group">
                    <label for="name" class="form-label">Ваше имя</label>
                    <input type="text" id="name" name="name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="message" class="form-label">Сообщение</label>
                    <textarea id="message" name="message" class="form-control" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn--primary">Отправить</button>
                
                <?php if (isset($_GET['status'])): ?>
                    <div class="form-message <?php echo $_GET['status'] === 'success' ? 'form-message--success' : 'form-message--error'; ?>">
                        <?php if ($_GET['status'] === 'success'): ?>
                            Сообщение успешно отправлено!
                        <?php else: ?>
                            Произошла ошибка при отправке сообщения.
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </form>
        </div>
    </section>

    <?php include 'includes/footer.php'; ?>

    <script src="assets/js/vendor/jquery.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>