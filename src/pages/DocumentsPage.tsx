import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import DocumentsList from "../components/DocumentsList";
import DocumentPopup from "../components/DocumentPopup";
import axios from "axios";
import { User } from "./UserProfile";

type Comment = { id: number; user: string; text: string; createdAt: string };
export type Document = {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  content?: string;
  likes?: number;
  comments?: Comment[];
  user?: User;
  isAdmin: boolean;
};

type StoredUser = {
  token: string;
  favorites?: number[];
  likes?: number[];
  user: User;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
    const [sortPosition, setSortPosition] = useState<string>("Все");
  

  // Загружаем документы и юзера
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: StoredUser = JSON.parse(storedUser);
      setUser(user.user)
      setFavorites(user.favorites || []);
      setLikes(user.likes || []);
      const token = user.token;

      axios
        .get("http://localhost:5000/documents", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setDocuments(res.data))
        .catch((err) => console.error("Ошибка загрузки документов:", err));
    }
  }, []);

  // Функция обновления localStorage
  const updateUserStorage = (updates: Partial<StoredUser>) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user: StoredUser = JSON.parse(storedUser);
    const newUser = { ...user, ...updates };
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const visibleDocs = showFavorites
    ? documents.filter((d) => favorites.includes(d.id))
    : documents;

  // ⭐ Избранное
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      updateUserStorage({ favorites: newFavorites });
      return newFavorites;
    });
  };

  // 👍 Лайки
  // const toggleLike = (doc: Document) => {
  //   setDocuments((prev) =>
  //     prev.map((d) =>
  //       d.id === doc.id ? { ...d, likes: (d.likes || 0) + 1 } : d
  //     )
  //   );
  //   setSelectedDoc((prev) =>
  //     prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null
  //   );

  //   setLikes((prev) => {
  //     const newLikes = prev.includes(doc.id) ? prev : [...prev, doc.id];
  //     updateUserStorage({ likes: newLikes });
  //     return newLikes;
  //   });
  // };

  // 💬 Добавить комментарий
  const addComment = (text: string) => {
    if (!text.trim() || !selectedDoc) return;
          const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) return;

    axios
      .post(`http://localhost:5000/comments/${selectedDoc.id}/comments`, {text}, {headers: {Authorization: `Bearer ${token}`} })
      .then((res) => {
        const newComment: Comment = res.data;
        setSelectedDoc((prev) =>
          prev
            ? { ...prev, comments: [...(prev.comments || []), newComment] }
            : null
        );
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === selectedDoc.id
              ? { ...d, comments: [...(d.comments || []), newComment] }
              : d
          )
        );
      })
      .catch((err) => console.error("Ошибка добавления комментария", err));
  };

  // 📄 Загрузка одного документа
  const selectDocument = async (id: number) => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) return;

      const res = await axios.get(`http://localhost:5000/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const doc = res.data;
      setSelectedDoc({
        ...doc,
        fileUrl: `http://localhost:5000/documents/${doc.id}`,
      });
    } catch (err) {
      console.error("Ошибка загрузки документа:", err);
    }
  };

  // ➕ Добавление документа
  const addDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    try {
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      const res = await axios.post("http://localhost:5000/documents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const savedDoc = res.data.document;

      setDocuments((prev) => [
        {
          id: savedDoc.id,
          title: savedDoc.title,
          description: savedDoc.description,
          fileUrl: `http://localhost:5000/uploads/${savedDoc.path}`,
          likes: 0,
          isAdmin: savedDoc.isAddmin,
          comments: [],
          user: savedDoc.user
        },
        ...prev,
      ]);

      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error("Ошибка загрузки документа:", err);
    }
  };


  const removeDocumentFromList = (id: number) => {
  setDocuments((prev) => prev.filter((doc) => doc.id !== id));
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Список документов</h1>

      {/* Форма добавления */}
      <form
        onSubmit={addDocument}
        className="mb-6 p-4 border rounded-xl shadow-sm flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-2"
        >
          Добавить
        </button>
      </form>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
        >
          {showFavorites ? "Показать все" : "Только избранное"}
        </button>
      </div>

      <DocumentsList
        isAdmin={false}
        documents={visibleDocs}
        sortPosition={sortPosition}
        setSortPosition={setSortPosition}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onSelect={selectDocument}
      />

      <DocumentPopup
  document={selectedDoc}
  onClose={() => setSelectedDoc(null)}
  toggleFavorite={toggleFavorite}
  addComment={addComment}
  favorites={favorites}
  user={user}
  onDeleteDocument={removeDocumentFromList} // ✅
/>
    </div>
  );
}
