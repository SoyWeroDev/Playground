<?php
// backend/api/ping.php
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'message' => 'Backend PHP Nativo funcionando correctamente.']);
