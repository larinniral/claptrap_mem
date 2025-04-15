#!/bin/bash

# Эта команда создает временную ветку для деплоя
echo "Создание ветки gh-pages..."
git checkout -b gh-pages-temp

# Удаляем все файлы из отслеживания Git (кроме .git директории)
echo "Очистка ветки..."
git rm -rf .
git clean -fxd
git commit -m "Очистка ветки для GitHub Pages"

# Копируем собранные файлы из gh-pages
echo "Копирование файлов для GitHub Pages..."
cp -r gh-pages/* .
cp gh-pages/.nojekyll .

# Добавляем новые файлы в Git
echo "Добавление файлов в Git..."
git add .
git commit -m "Публикация на GitHub Pages"

# Отправляем ветку в удаленный репозиторий с принудительной перезаписью
echo "Отправка на GitHub..."
git push -f origin gh-pages-temp:gh-pages

# Возвращаемся к основной ветке
echo "Возвращение к основной ветке..."
git checkout main
git branch -D gh-pages-temp

echo "✅ Готово! Ваш сайт будет доступен на GitHub Pages после активации в настройках репозитория."
echo "Перейдите на https://github.com/larinniral/claptrap_mem/settings/pages"
echo "и выберите ветку gh-pages в качестве источника."