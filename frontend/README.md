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

## Структура проекта

```
src/
├── components/
│   ├── Table/          # Компонент таблицы
│   └── Diagram/        # Компонент диаграммы
├── stores/
│   └── workflow.ts     # Pinia store (Composition API)
├── services/
│   └── api.ts          # API клиент
├── types/
│   └── workflow.ts     # TypeScript типы
├── composables/        # Переиспользуемая логика
├── styles/
│   ├── variables.scss  # SCSS переменные
│   └── global.scss     # Глобальные стили
├── App.vue
└── main.ts
```

## API Backend

Backend должен быть запущен на `http://localhost:3000`

Endpoints:
- `GET /workflow/get?wfName=wf1` - Получить данные процесса
- `POST /workflow/changeStepXY` - Изменить координаты шага
- `POST /workflow/changeStepName` - Изменить название шага
- `POST /workflow/createStep` - Создать новый шаг
- `POST /workflow/deleteStep` - Удалить шаг

## Особенности реализации

### Pinia Store (Composition API)

Store использует современный Composition API синтаксис:

```typescript
export const useWorkflowStore = defineStore('workflow', () => {
  // State с ref()
  const steps = ref<WorkflowStep[]>([])
  
  // Getters с computed()
  const selectedStep = computed(() => ...)
  
  // Actions как обычные функции
  async function fetchSteps() { ... }
  
  return { steps, selectedStep, fetchSteps }
})
```

### Идентификация шагов

Шаги идентифицируются по `initialIndex`, а не по индексу в массиве.

### Уникальность названий

При создании и редактировании шагов проверяется уникальность названий.

### LocalStorage

Настройки сортировки сохраняются в localStorage и восстанавливаются при загрузке.

## Разработка

Для работы с проектом рекомендуется использовать:
- VS Code с расширениями: Volar, ESLint, Prettier
- Node.js >= 18

## Следующие шаги

1. Реализовать компонент таблицы (`WorkflowTable.vue`)
2. Реализовать компонент диаграммы (`WorkflowDiagram.vue`)
3. Добавить синхронизацию выделения между таблицей и диаграммой
4. Реализовать drag & drop на диаграмме
5. Добавить редактирование названий в таблице
6. Реализовать добавление/удаление шагов
7. Добавить зум на диаграмме
8. Реализовать поиск и сортировку

