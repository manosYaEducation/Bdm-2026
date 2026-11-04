<?php
header('Content-Type: application/json');

// Directorio y archivo
$dir = 'data';
$file = $dir . '/interactions.json';

// Crear carpeta si no existe
if (!file_exists($dir)) {
    mkdir($dir, 0755, true);
}

// Obtener datos del cliente
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validación básica: que el JSON no esté vacío
if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Datos inválidos']);
    exit;
}

// Asegurar existencia del JSON y abrir para lectura/escritura
$fp = fopen($file, 'c+');

if (flock($fp, LOCK_EX)) { // Bloqueo exclusivo
    $current_content = stream_get_contents($fp);
    $json_data = !empty($current_content) ? json_decode($current_content, true) : ['leads' => [], 'eventos' => []];

    // Clasificar según tipo
    if (isset($data['tipo']) && $data['tipo'] === 'lead') {
        $json_data['leads'][] = [
            'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
            'timestamp' => date('Y-m-d H:i:s')
        ];
    } else {
        $json_data['eventos'][] = [
            'elemento' => htmlspecialchars($data['elemento']),
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    // Guardar cambios
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($json_data, JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Servidor ocupado']);
}
fclose($fp);
?>