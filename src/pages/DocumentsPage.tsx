import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import DocumentsList from "../components/DocumentsList";
import DocumentPopup from "../components/DocumentPopup";

export const mockDocuments = [
  {
    id: 1,
    title: "Документ 1",
    description: "Описание первого документа",
    fileUrl: "https://via.placeholder.com/400x200.png?text=Документ+1",
    likes: 0,
    comments: [
      { id: 1, user: "Alice", text: "Отличный документ!", createdAt: "2025-09-03T10:00:00Z" },
      { id: 2, user: "Bob", text: "Спасибо за информацию", createdAt: "2025-09-03T12:30:00Z" },
    ],
  },
  {
    id: 2,
    title: "Документ 2",
    description: "Описание второго документа",
    fileUrl: "",
    likes: 0,
    comments: [],
  },
];

type Comment = { id: number; user: string; text: string; createdAt: string };
type Document = { id: number; title: string; description: string; fileUrl?: string; content?: string; likes?: number; comments?: Comment[] };

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);

  const visibleDocs = showFavorites ? documents.filter((d) => favorites.includes(d.id)) : documents;

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleLike = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, likes: (d.likes || 0) + 1 } : d
      )
    );
    setSelectedDoc((prev) =>
      prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null
    );
  };

  const addComment = (text: string) => {
    if (!text.trim() || !selectedDoc) return;
    const newComment: Comment = { id: Date.now(), user: "currentUser", text, createdAt: new Date().toISOString() };
    setSelectedDoc((prev) => prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null);
    setDocuments((prev) => prev.map((d) => d.id === selectedDoc.id ? { ...d, comments: [...(d.comments || []), newComment] } : d));
  };

  const addDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;
    const newDoc: Document = {
      id: Date.now(),
      title,
      description,
      fileUrl: URL.createObjectURL(file),
      likes: 0,
      comments: [],
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setTitle(""); setDescription(""); setFile(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Список документов</h1>

      {/* Добавление документа */}
      <form onSubmit={addDocument} className="mb-6 p-4 border rounded-xl shadow-sm flex flex-col gap-2">
        <input type="text" placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" onChange={e => e.target.files && setFile(e.target.files[0])} className="w-full p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-2">Добавить</button>
      </form>

      <div className="flex justify-end mb-6">
        <button onClick={() => setShowFavorites(prev => !prev)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition">
          {showFavorites ? "Показать все" : "Только избранное"}
        </button>
      </div>

      <DocumentsList documents={visibleDocs} favorites={favorites} toggleFavorite={toggleFavorite} onSelect={setSelectedDoc} />

      <DocumentPopup
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
        toggleFavorite={toggleFavorite}
        toggleLike={toggleLike}
        addComment={addComment}
        favorites={favorites}
      />
    </div>
  );
}
