<?php
// backend/public/index.php

// Archivo principal que sirve la SPA de React.
$spaFile = __DIR__ . '/spa.html';

if (file_exists($spaFile)) {
    readfile($spaFile);
} else {
    echo "<h1>Acordeón Online</h1>";
    echo "<p>El frontend de React aún no ha sido compilado. Ejecuta el build de Vite.</p>";
}
