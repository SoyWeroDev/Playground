<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba - Jardin Botanico Virtual</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0f0d 0%, #1a2f1a 50%, #0d1a0d 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #e0e0e0;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #4ade80, #22d3ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: none;
        }

        p {
            font-size: 1.1rem;
            color: #9ca3af;
            margin-bottom: 2.5rem;
        }

        .btn {
            padding: 16px 48px;
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
            background: linear-gradient(135deg, #059669, #10b981);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
            position: relative;
            overflow: hidden;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
        }

        .btn:active {
            transform: translateY(0);
        }

        .status {
            margin-top: 2rem;
            padding: 12px 24px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            font-size: 0.9rem;
            color: #4ade80;
        }
    </style>
</head>
<body>
    <h1>Jardin Botanico Virtual</h1>
    <p>Prueba de conexion - PHP + Docker</p>

    <button class="btn" onclick="alert('Hola Mundo')">
        Hola Mundo
    </button>

    <div class="status">
        PHP <?php echo phpversion(); ?> | Servidor funcionando correctamente
    </div>
</body>
</html>
