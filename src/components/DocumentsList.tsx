import React, { useState } from "react";
import { Star } from "lucide-react";
import { Document } from "../pages/DocumentsPage";

type Props = {
  isAdmin: boolean;
  sortPosition: string;
  setSortPosition: (pos: string) => void;
  documents: Document[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  onSelect: (id: number) => void;
};

export default function DocumentsList({
  isAdmin,
  documents,
  sortPosition,
  setSortPosition,
  favorites,
  toggleFavorite,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");

  const positions = [
    "Все",
    ...Array.from(
      new Set(documents.map((e) => e.user?.username).filter((u): u is string => !!u))
    ),
  ];

  // фильтрация по автору
  const filteredByAuthor = isAdmin
    ? documents
    : sortPosition === "Все"
    ? documents
    : documents.filter(
        (e) => e.user?.username.toLowerCase() === sortPosition.toLowerCase()
      );

  // дополнительная фильтрация по поиску
  const filteredDocuments = filteredByAuthor.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* поиск */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* кнопки фильтра только для обычных пользователей */}
      {isAdmin === false ? (
        <div className="flex gap-3 flex-wrap mb-5">
          {positions.map((pos) => (
            <button
              key={pos}
              className={`px-4 py-2 rounded-full border transition-colors ${
                sortPosition === pos
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSortPosition(pos)}
            >
              {pos}
            </button>
          ))}
        </div>
      ) : null}

      {/* список документов */}
      <div className="grid grid-cols-4 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(doc.id)}
          >
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-2 overflow-hidden">
              {doc.fileUrl?.match(/\.(jpg|jpeg|png|gif)$/) ? (
                <img
                  src={doc.fileUrl}
                  alt={doc.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">📄</span>
              )}
            </div>
            <p className="text-center">{doc.title}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(doc.id);
              }}
              className="text-yellow-500 mt-2"
            >
              <Star
                className={`w-6 h-6 ${
                  favorites.includes(doc.id) ? "fill-yellow-400" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
