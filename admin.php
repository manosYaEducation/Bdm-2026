<?php
session_start();

const ADMIN_USERNAME = 'alphadocere@gmail.com';
const ADMIN_PASSWORD_HASH = '$2y$12$At11IXrWbJUlnCnkwrWq8ekiIoUN3poajaJXurc4e.euLyrQKBFdm';

$dataFile = __DIR__ . '/data/interactions.json';

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: admin.php');
    exit;
}

$loginError = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    if (hash_equals(ADMIN_USERNAME, $_POST['username']) && password_verify($_POST['password'], ADMIN_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['admin_authenticated'] = true;
        header('Location: admin.php');
        exit;
    }
    $loginError = 'Nombre o clave incorrectos.';
}

$isAuthenticated = !empty($_SESSION['admin_authenticated']);
$leads = [];
if ($isAuthenticated && is_file($dataFile)) {
    $storedData = json_decode(file_get_contents($dataFile), true);
    if (is_array($storedData) && isset($storedData['leads']) && is_array($storedData['leads'])) {
        $leads = $storedData['leads'];
    }
}

if ($isAuthenticated && isset($_GET['download']) && $_GET['download'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="suscritos.csv"');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['email', 'timestamp']);
    foreach ($leads as $lead) {
        fputcsv($output, [$lead['email'] ?? '', $lead['timestamp'] ?? '']);
    }
    fclose($output);
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración de suscritos</title>
    <style>
        body { margin: 0; background: #111; color: #eee; font-family: Arial, sans-serif; }
        main { max-width: 900px; margin: 48px auto; padding: 0 20px; }
        h1 { color: #fff; }
        .panel { background: #1d1d1d; border: 1px solid #333; border-radius: 8px; padding: 24px; }
        input { display: block; box-sizing: border-box; width: 100%; margin: 8px 0 16px; padding: 12px; }
        button, .button { display: inline-block; border: 0; border-radius: 4px; background: #a81c24; color: #fff; cursor: pointer; padding: 11px 16px; text-decoration: none; }
        .actions { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border-bottom: 1px solid #333; padding: 12px 8px; text-align: left; }
        .error { color: #ff8b8b; margin-bottom: 16px; }
        @media (max-width: 600px) { .actions { align-items: stretch; flex-direction: column; } table { font-size: 14px; } }
    </style>
</head>
<body>
<main>
<?php if (!$isAuthenticated): ?>
    <div class="panel">
        <h1>Administración</h1>
        <?php if ($loginError !== ''): ?><p class="error"><?= htmlspecialchars($loginError, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
        <form method="post">
            <label for="username">Nombre</label>
            <input id="username" name="username" type="text" required autocomplete="username">
            <label for="password">Clave</label>
            <input id="password" name="password" type="password" required autocomplete="current-password">
            <button type="submit">Ingresar</button>
        </form>
    </div>
<?php else: ?>
    <div class="actions">
        <h1>Suscritos (<?= count($leads) ?>)</h1>
        <div>
            <a class="button" href="admin.php?download=csv">Descargar CSV</a>
            <a class="button" href="admin.php?logout=1">Cerrar sesión</a>
        </div>
    </div>
    <div class="panel">
        <table>
            <thead><tr><th>Correo electrónico</th><th>Fecha</th></tr></thead>
            <tbody>
            <?php foreach ($leads as $lead): ?>
                <tr>
                    <td><?= htmlspecialchars($lead['email'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
                    <td><?= htmlspecialchars($lead['timestamp'] ?? '', ENT_QUOTES, 'UTF-8') ?></td>
                </tr>
            <?php endforeach; ?>
            <?php if ($leads === []): ?><tr><td colspan="2">No hay suscritos registrados.</td></tr><?php endif; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>
</main>
</body>
</html>
