import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Star } from "lucide-react";
import { User } from "../pages/UserProfile";
import axios from "axios";

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
  addComment: (text: string) => void;
  favorites: number[];
  user: User | null;
  onDeleteDocument?: (id: number) => void; // callback после удаления документа
};

export default function DocumentPopup({
  user,
  document,
  onClose,
  toggleFavorite,
  addComment,
  favorites,
  onDeleteDocument,
}: Props) {
  const [commentText, setCommentText] = useState("");

  if (!document) return null;

  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).token
    : null;

  const handleDeleteComment = async (commentId: number) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Обновляем локально список комментариев
      document.comments = document.comments?.filter((c) => c.id !== commentId);
      setCommentText(""); // сброс инпута
    } catch (err) {
      console.error("Ошибка удаления комментария", err);
    }
  };

  const handleDeleteDocument = async () => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/documents/${document.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onDeleteDocument) onDeleteDocument(document.id);
      onClose();
    } catch (err) {
      console.error("Ошибка удаления документа", err);
    }
  };

  return (
    <Dialog open={!!document} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg overflow-y-auto max-h-[90vh]">
          <Dialog.Title className="text-xl font-semibold mb-2">{document.title}</Dialog.Title>
          <p className="text-gray-500 mb-4">{document.description}</p>

          {document.fileUrl ? (
            <a
              href={`http://localhost:5000/documents/download/${document.id}`}
              download
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4 inline-block"
            >
              Скачать файл
            </a>
          ) : (
            <p className="text-gray-700 mb-4">{document.content}</p>
          )}

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => toggleFavorite(document.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded border ${
                favorites.includes(document.id) ? "bg-yellow-400 text-white" : "border-gray-400"
              }`}
            >
              <Star className="w-5 h-5" /> {favorites.includes(document.id) ? "В избранном" : "Добавить в избранное"}
            </button>

            {/* Кнопка удаления документа для админа */}
            {user?.role === "admin" && (
              <button
                onClick={handleDeleteDocument}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Удалить документ
              </button>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Комментарии</h3>
            {document.comments?.map((c) => (
              <div key={c.id} className="flex items-center justify-between mb-2 p-2 border rounded">
                <div>
                  <p className="text-sm text-gray-700">{c.text}</p>
                  <span className="text-xs text-gray-400">{c.user}</span>
                </div>

                {/* Кнопка удаления комментария для админа */}
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Удалить
                  </button>
                )}
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
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
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
