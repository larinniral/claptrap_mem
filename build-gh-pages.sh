#!/bin/bash

# Создаем статическую сборку
npm run build

# Создаем папку для GitHub Pages
mkdir -p gh-pages

# Копируем собранные файлы
cp -r dist/public/* gh-pages/

# Создаем специальный файл .nojekyll чтобы GitHub Pages не обрабатывал файлы как Jekyll
touch gh-pages/.nojekyll

# Создаем базовый index.html, перенаправляющий в папку gh-pages
cat > gh-pages/index.html << EOL
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>КЛЭПТРЭП - Цифровой Зин</title>
  <style>
    body {
      background-color: #111;
      color: #00f0ff;
      font-family: monospace;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    .glitch {
      font-size: 3rem;
      text-transform: uppercase;
      position: relative;
      letter-spacing: 0.5rem;
      animation: glitch 1s linear infinite;
    }
    @keyframes glitch {
      2%, 64% {
        transform: translate(2px, 0) skew(0deg);
      }
      4%, 60% {
        transform: translate(-2px, 0) skew(0deg);
      }
      62% {
        transform: translate(0, 0) skew(5deg);
      }
    }
    p {
      margin-top: 2rem;
      max-width: 600px;
      text-align: center;
      line-height: 1.6;
    }
    a {
      display: inline-block;
      margin-top: 2rem;
      padding: 1rem 2rem;
      background: #00f0ff22;
      color: #00f0ff;
      text-decoration: none;
      border: 1px solid #00f0ff;
      transition: all 0.3s ease;
    }
    a:hover {
      background: #00f0ff44;
    }
  </style>
</head>
<body>
  <div class="glitch">КЛЭПТРЭП</div>
  <p>Цифровой арт-зин с кибер-панк эстетикой, представляющий русскую поэзию с анимированными текстовыми эффектами</p>
  <a href="./index.html">Перейти к проекту</a>
</body>
</html>
EOL

echo "Сборка для GitHub Pages завершена. Файлы подготовлены в папке gh-pages/"