<?php
$method = $_SERVER['REQUEST_METHOD'];
$TARGET_BASE = 'http://localhost:13121/labDVA';

if ($method === 'GET') {
    $clearTable = $_GET['clearTable'] ?? '';

    // Обработка очистки таблицы
    if ($clearTable === 'true') {
        // Отправляем запрос к WildFly для очистки таблицы
        $clearUrl = $TARGET_BASE . "/index.jsp?clearTable=true";
        $clearResponse = @file_get_contents($clearUrl);

        // После очистки возвращаем главную страницу
        $mainUrl = $TARGET_BASE . "/index.jsp";
        $response = @file_get_contents($mainUrl);

        if ($response !== FALSE) {
            // Заменяем URL в ответе
            $response = str_replace(
                'http://localhost:13121/labDVA/',
                'index.php?path=',
                $response
            );
            echo $response;
        } else {
            http_response_code(500);
            echo "Ошибка загрузки страницы после очистки";
        }
        exit;
    }

    // Остальная логика для обычных запросов...
    $x = $_GET['x'] ?? '';
    $y = $_GET['y'] ?? '';
    $r = $_GET['r'] ?? '';
    $source = $_GET['source'] ?? '';

    if (!empty($x) || !empty($y) || !empty($r)) {
        $url = $TARGET_BASE . "/controller?x=" . rawurlencode($x)
             . "&y=" . rawurlencode($y)
             . "&r=" . rawurlencode($r)
             . "&source=" . rawurlencode($source);

        $response = @file_get_contents($url);

        if ($response === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to connect to target server']);
        } else {
            // Если это HTML (например, result.jsp), обрабатываем URL
            if (strpos($response, '<html') !== false || strpos($response, '<!DOCTYPE') !== false) {
                $response = str_replace(
                    'http://localhost:13121/labDVA/',
                    'index.php?path=',
                    $response
                );
            }
            echo $response;
        }
    } else {
        // Если нет параметров, показываем главную страницу
        $mainUrl = $TARGET_BASE . "/index.jsp";
        $response = @file_get_contents($mainUrl);
        if ($response !== FALSE) {
            $response = str_replace(
                'http://localhost:13121/labDVA/',
                'index.php?path=',
                $response
            );
            echo $response;
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>