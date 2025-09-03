import React from 'react'
import LiteratureList from '../components/LiteratureList';

// src/data/mockDocuments.ts
export const documents = [
  {
    id: "1",
    title: "Война и мир",
    description: "Роман Льва Толстого о России начала XIX века.",
    section: "Классика",
    uploadedAt: "2025-01-01",
  },
  {
    id: "2",
    title: "Преступление и наказание",
    description: "Роман Фёдора Достоевского о нравственных исканиях человека.",
    section: "Классика",
    uploadedAt: "2025-01-03",
  },
  {
    id: "3",
    title: "Гарри Поттер и философский камень",
    description: "Начало приключений Гарри Поттера в магическом мире.",
    section: "Фэнтези",
    uploadedAt: "2025-02-10",
  },
  {
    id: "4",
    title: "Гарри Поттер и тайная комната",
    description: "Вторая книга серии о Гарри Поттере.",
    section: "Фэнтези",
    uploadedAt: "2025-02-15",
  },
  {
    id: "5",
    title: "Игра престолов",
    description: "Начало эпической саги Джорджа Мартина.",
    section: "Фэнтези",
    uploadedAt: "2025-03-01",
  },
  {
    id: "6",
    title: "1984",
    description: "Антиутопия Джорджа Оруэлла о тоталитарном обществе.",
    section: "Антиутопия",
    uploadedAt: "2025-03-05",
  },
  {
    id: "7",
    title: "О дивный новый мир",
    description: "Антиутопия Олдоса Хаксли о будущем общества.",
    section: "Антиутопия",
    uploadedAt: "2025-03-10",
  },
  {
    id: "8",
    title: "Мастер и Маргарита",
    description: "Роман Михаила Булгакова о мистике и любви в Москве.",
    section: "Классика",
    uploadedAt: "2025-03-15",
  },
  {
    id: "9",
    title: "Гарри Поттер и узник Азкабана",
    description: "Третья книга о приключениях Гарри Поттера.",
    section: "Фэнтези",
    uploadedAt: "2025-03-20",
  },
  {
    id: "10",
    title: "451 градус по Фаренгейту",
    description: "Антиутопия Рэя Брэдбери о мире без книг.",
    section: "Антиутопия",
    uploadedAt: "2025-03-25",
  },
];


const LiteraturePage = () => {
  return (
    <div>
      <LiteratureList literature={documents} pageSize={4}/>
    </div>
  )
};

export default LiteraturePage
