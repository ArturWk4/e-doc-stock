import React from "react";
import { Star } from "lucide-react";

type Document = {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  likes?: number;
  comments?: any[];
};

type Props = {
  documents: Document[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  onSelect: (id: number) => void; // теперь передаем только id
};

export default function DocumentsList({ documents, favorites, toggleFavorite, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(doc.id)} // передаем id
        >
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-2 overflow-hidden">
            {doc.fileUrl?.match(/\.(jpg|jpeg|png|gif)$/) ? (
              <img src={doc.fileUrl} alt={doc.title} className="w-full h-full object-cover" />
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
            <Star className={`w-6 h-6 ${favorites.includes(doc.id) ? "fill-yellow-400" : ""}`} />
          </button>
        </div>
      ))}
    </div>
  );
}