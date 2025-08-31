import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Star, StarOff } from "lucide-react";


type Document = {
  id: number;
  title: string;
  description: string;
  content: string;
};

const documents: Document[] = [
  {
    id: 1,
    title: "Отчёт за Август",
    description: "Финансовый отчёт за август 2025",
    content: "Тут можно отобразить содержимое документа...",
  },
  {
    id: 2,
    title: "Договор №234",
    description: "Договор аренды офиса",
    content: "Текст договора...",
  },
  {
    id: 3,
    title: "Презентация проекта",
    description: "Слайды для встречи с клиентом",
    content: "Встроенный просмотр презентации...",
  },
];

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // если включён фильтр → показываем только избранное
  const visibleDocs = showFavorites
    ? documents.filter((doc) => favorites.includes(doc.id))
    : documents;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Список документов</h1>

      {/* Панель управления */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
        >
          {showFavorites ? (
            <>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              Показать все
            </>
          ) : (
            <>
              <Star className="w-5 h-5 text-gray-400" />
              Только избранное
            </>
          )}
        </button>
      </div>

      {/* Список карточек */}
      {visibleDocs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {doc.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3">{doc.description}</p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Открыть
                </button>

                <button
                  onClick={() => toggleFavorite(doc.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  {favorites.includes(doc.id) ? (
                    <Star className="w-6 h-6 fill-yellow-400" />
                  ) : (
                    <StarOff className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          {showFavorites
            ? "В избранном пока нет документов."
            : "Документы не найдены."}
        </p>
      )}

      {/* Модальное окно */}
      <Dialog
        open={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {selectedDoc?.title}
            </Dialog.Title>
            <p className="text-gray-700 mb-6">{selectedDoc?.content}</p>
            <button
              onClick={() => setSelectedDoc(null)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Закрыть
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
