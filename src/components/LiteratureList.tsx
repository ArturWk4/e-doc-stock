import { useState, useMemo } from "react";

interface Literature {
  id: string;
  title: string;
  description: string;
  section: string; // раздел документа
  uploadedAt: string;
}

interface LiteratureListProps {
  literature: Literature[];
  pageSize?: number;
}

const LiteratureList: React.FC<LiteratureListProps> = ({ literature, pageSize = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortSection, setSortSection] = useState<string>("all");

  // Фильтрация по разделу
  const filteredDocs = useMemo(() => {
    return sortSection === "Все"
      ? literature
      : literature.filter(doc => doc.section === sortSection);
  }, [literature, sortSection]);

  // Пагинация
  const totalPages = Math.ceil(filteredDocs.length / pageSize);
  const currentDocs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDocs.slice(start, start + pageSize);
  }, [filteredDocs, currentPage, pageSize]);

  // Список уникальных разделов
  const sections = useMemo(() => ["Все", ...new Set(literature.map(d => d.section))], [literature]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Документы</h1>

      {/* Сортировка по разделам */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {sections.map((sec) => (
          <button
            key={sec}
            className={`px-4 py-2 rounded-full border transition-colors ${
              sortSection === sec
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => {
              setSortSection(sec);
              setCurrentPage(1); // сброс на первую страницу
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Карточки документов */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{doc.title}</h2>
            <p className="text-gray-500 mb-2">Раздел: {doc.section}</p>
            <p className="text-gray-600">{doc.description}</p>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border transition-colors ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default LiteratureList;
