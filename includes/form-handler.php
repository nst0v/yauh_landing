<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));
    
    // Проверяем данные
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../index.php?status=error#contact");
        exit;
    }
    
    // Настройки для отправки письма
    $recipient = "your-email@example.com"; // Замените на свой email
    $subject = "Новое сообщение с сайта от $name";
    
    // Формируем тело письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Сообщение:\n$message\n";
    
    // Заголовки письма
    $email_headers = "From: $name <$email>\n";
    $email_headers .= "Reply-To: $email\n";
    $email_headers .= "MIME-Version: 1.0\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\n";
    
    // Отправляем письмо
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Если письмо отправлено успешно
        header("Location: ../index.php?status=success#contact");
    } else {
        // Если произошла ошибка при отправке
        header("Location: ../index.php?status=error#contact");
    }
} else {
    // Если это не POST запрос, перенаправляем на главную
    header("Location: ../index.php");
}
?>