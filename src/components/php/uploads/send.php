<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['size']);
    $weight = htmlspecialchars($_POST['weight']);
    
    // Обработка файла
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileSize = $_FILES['file']['size'];
        $fileType = $_FILES['file']['type'];
        
        // Сохранение файла (например, в папку "uploads")
        $uploadFileDir = $_SERVER['DOCUMENT_ROOT']. '/uploads/';
        $dest_path = $uploadFileDir . $fileName;
		if(!is_dir($uploadFileDir)) {
			mkdir($uploadFileDir, 0777, true);
		}
		chmod($uploadFileDir, 0777);
        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $fileMessage = "Файл успешно загружен: $fileName";
        } else {
            $fileMessage = "Ошибка при загрузке файла.";
        }
    } else {
        $fileMessage = "Файл не был загружен.";
    }

    // Формируем сообщение
    $message = "размер: $name\n";
    $message .= "вес: $weight\n";
    $message .= $fileMessage;

    // Telegram Bot API token и chat ID
    $botToken = "7615551130:AAF_VWNiFVEEt5LeQ3pqJnVkVC-AVzcdOBA";
    $chatId = "331594574";

    // URL для отправки сообщения
    $url = "https://api.telegram.org/bot$botToken/sendDocument";

    // Используем cURL для отправки файла и сообщения
    $ch = curl_init();
    
    // Собираем данные для отправки
    $postData = [
        'chat_id' => $chatId,
        'caption' => $message,
        'document' => new CURLFile($dest_path)  // Загружаем файл
    ];

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    
    $result = curl_exec($ch);
    
    // Проверяем результат
    if ($result) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }

    curl_close($ch);
}
