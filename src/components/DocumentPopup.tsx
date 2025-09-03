import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Heart, Star } from "lucide-react";

type Comment = { id: number; user: string; text: string; createdAt: string };
type Document = {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  content?: string;
  likes?: number;
  comments?: Comment[];
};

type Props = {
  document: Document | null;
  onClose: () => void;
  toggleFavorite: (id: number) => void;
  toggleLike: (doc: Document) => void;
  addComment: (text: string) => void;
  favorites: number[];
};

export default function DocumentPopup({ document, onClose, toggleFavorite, toggleLike, addComment, favorites }: Props) {
  const [commentText, setCommentText] = useState("");

  if (!document) return null;

  return (
    <Dialog open={!!document} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg overflow-y-auto max-h-[90vh]">
          <Dialog.Title className="text-xl font-semibold mb-2">{document.title}</Dialog.Title>
          <p className="text-gray-500 mb-4">{document.description}</p>

          {document.fileUrl?.match(/\.(jpg|jpeg|png|gif)$/) ? (
            <img src={document.fileUrl} alt={document.title} className="w-full h-64 object-cover mb-4" />
          ) : document.fileUrl?.match(/\.(mp4|mov|webm)$/) ? (
            <video src={document.fileUrl} controls className="w-full mb-4" />
          ) : document.fileUrl ? (
            <a href={document.fileUrl} download className="text-blue-600 underline mb-4 block">Скачать файл</a>
          ) : (
            <p className="text-gray-700 mb-4">{document.content}</p>
          )}

          <div className="flex gap-4 mb-4">
            <button onClick={() => toggleLike(document)} className="flex items-center gap-2">
              <Heart className={`w-6 h-6 ${document.likes && document.likes > 0 ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
              {document.likes || 0}
            </button>

            <button
              onClick={() => toggleFavorite(document.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                favorites.includes(document.id) ? "bg-yellow-400 text-white" : "border-gray-400"
              }`}
            >
              <Star className="w-5 h-5" /> {favorites.includes(document.id) ? "В избранном" : "Добавить в избранное"}
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Комментарии</h3>
            {document.comments?.map((c) => (
              <div key={c.id} className="mb-2 p-2 border rounded">
                <p className="text-sm text-gray-700">{c.text}</p>
                <span className="text-xs text-gray-400">{c.user} • {new Date(c.createdAt).toLocaleString()}</span>
              </div>
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(commentText);
                setCommentText("");
              }}
            >
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
                className="w-full p-2 border rounded mb-2"
              />
              <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Отправить
              </button>
            </form>
          </div>

          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 mt-4">
            Закрыть
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
