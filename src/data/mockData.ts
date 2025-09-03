// data/mockData.ts


export type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  duties: string;
  responsibilities: string[];
  documentsCount: number;
};
export const employees: Employee[] = [
  {
    id: 1,
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    position: "Менеджер проектов",
    duties: "Координация проектов и задач команды",
    responsibilities: [
      "Планирование сроков",
      "Контроль выполнения задач",
      "Взаимодействие с заказчиком"
    ],
    documentsCount: 12,
  },
  {
    id: 2,
    name: "Мария Петрова",
    email: "maria.petrova@example.com",
    position: "Разработчик",
    duties: "Разработка фронтенда и поддержка интерфейсов",
    responsibilities: [
      "Создание компонентов React",
      "Интеграция с API",
      "Оптимизация производительности"
    ],
    documentsCount: 8,
  },
  {
    id: 3,
    name: "Алексей Смирнов",
    email: "alex.smirnov@example.com",
    position: "Тестировщик",
    duties: "Тестирование функционала и поиск багов",
    responsibilities: [
      "Разработка тест-кейсов",
      "Проверка новых фич",
      "Документирование ошибок"
    ],
    documentsCount: 5,
  },
  {
    id: 4,
    name: "Екатерина Кузнецова",
    email: "ekaterina.kuznetsova@example.com",
    position: "Дизайнер",
    duties: "Создание UI/UX дизайнов для продуктов",
    responsibilities: [
      "Проектирование макетов",
      "Создание прототипов",
      "Сотрудничество с разработчиками"
    ],
    documentsCount: 9,
  },
  {
    id: 5,
    name: "Дмитрий Соколов",
    email: "dmitry.sokolov@example.com",
    position: "Разработчик",
    duties: "Работа с бэкендом и базами данных",
    responsibilities: [
      "Создание REST API",
      "Оптимизация запросов",
      "Обеспечение безопасности данных"
    ],
    documentsCount: 14,
  },
];
