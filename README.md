# Elfsight Test Task (Rick and Morty API)

## Исправленные баги

### Пагинация

1. **Ошибка**: Некорректный переход на последнюю страницу (`pages.length` вместо `pages.length - 1`).  
   **Исправление**: Изменил логику на `pageClickHandler(pages.length - 1)`.

## Оптимизация
- Удалил неиспользуемый компонент `Container` (ESLint warning).
- Задокументировал неиспользуемый компонент PopupProvider

## Новые функции

- Подключил библиотеку React-Router для создания маршрутизация.
- Добавил компоненты Filter.js, CustomSelect и FilterProvider.
- Добавил функционала к Popup

## Установка

1.  Клонируй репозиторий:

    ```bash
    git clone https://github.com/IgorNazyrov/WeatherAppDebug
    ```
2.  Скачать зависимости:

    ```bash
    npm install
    ```

3.  Запустите приложение:

    ```bash
    npm run dev
    ``