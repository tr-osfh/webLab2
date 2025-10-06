<?php
$TARGET_BASE = 'http://localhost:13121/labDVA';

// Получаем запрошенный путь
$path = $_GET['path'] ?? 'index.jsp';
$clearTable = $_GET['clearTable'] ?? '';

// Если запрошена очистка таблицы
if ($clearTable === 'true') {
    header("Location: proxy.php?clearTable=true");
    exit;
}

// Строим целевой URL
$targetUrl = $TARGET_BASE . '/' . ltrim($path, '/');

// Добавляем остальные GET параметры
$queryParams = $_GET;
unset($queryParams['path']);
if (!empty($queryParams)) {
    $targetUrl .= '?' . http_build_query($queryParams);
}

// Выполняем запрос
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => implode("\r\n", [
            'User-Agent: Mozilla/5.0',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3'
        ]),
        'timeout' => 30
    ]
]);

$response = @file_get_contents($targetUrl, false, $context);

header('Content-Type: text/html; charset=UTF-8');

if ($response !== FALSE) {
    // Заменяем все URL в HTML
    $response = preg_replace_callback(
        '/(href|src|action)=["\']([^"\']*)["\']/',
        function($matches) {
            $url = $matches[2];
            // Пропускаем внешние ссылки и data URI
            if (strpos($url, 'http') === 0 || strpos($url, '//') === 0 || strpos($url, 'data:') === 0) {
                return $matches[0];
            }

            // Заменяем URL WildFly на наш прокси
            if (strpos($url, 'http://localhost:13121/labDVA/') === 0) {
                $newUrl = str_replace('http://localhost:13121/labDVA/', 'index.php?path=', $url);
                return $matches[1] . '="' . $newUrl . '"';
            }

            // Относительные пути
            if (strpos($url, '/') === 0) {
                return $matches[1] . '="index.php?path=' . ltrim($url, '/') . '"';
            }

            return $matches[0];
        },
        $response
    );

    // Заменяем JavaScript fetch запросы
    $response = preg_replace(
        '/fetch\\([\'"`]http:\\/\\/localhost:13121\\/labDVA\\/controller([^\'"`]*)[\'"`]/',
        'fetch(\'proxy.php$1\'',
        $response
    );

    echo $response;
} else {
    echo "Ошибка: не удалось загрузить страницу";
}
?>