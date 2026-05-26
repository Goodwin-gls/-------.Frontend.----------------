# Workflow Editor - Frontend

Vue 3 + TypeScript приложение для редактирования рабочих процессов.

## Технологический стек

- **Vue 3** - Composition API + TypeScript
- **Pinia** - State management (Composition API синтаксис)
- **Element Plus** - UI библиотека
- **Vue Flow** - Библиотека для диаграмм
- **Axios** - HTTP клиент
- **SCSS** - Модульные стили
- **Vitest** - Unit тестирование
- **Cypress** - E2E тестирование
- **FontAwesome 6** - Иконки
- **Open Sans** - Шрифт

## Установка

```bash
npm install
```

## Запуск

### Development режим

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

**Важно:** Перед запуском frontend убедитесь, что backend запущен на порту 3000:

```bash
cd ../backend
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

## Тестирование

### Unit тесты (Vitest)

```bash
npm run test:unit
```

### E2E тесты (Cypress)

```bash
# Открыть Cypress UI
npm run test:e2e

# Запустить в headless режиме
npm run test:e2e:headless
```

### Примечания для проверяющего

Для создания шага используется максимальный индекс шага + 1, чтобы при удалении не происходило дублирование имени (в отличие от варианта с количеством шагов + 1).

Для экономии времени использовалась библиотека Vue Flow для реализации диаграмм.

В backend части исправлена ошибка в docstring для Swagger — из-за нее не отображался один route.

Backend частично недоделан: при удалении шага не чистятся данные в других шагах.

Основной фокус был на скорости выполнения из-за объемного тестового задания.
