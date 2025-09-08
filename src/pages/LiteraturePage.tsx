import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentsList from "../components/DocumentsList";
import DocumentPopup from "../components/DocumentPopup";
import { User } from "./UserProfile";

type Comment = { id: number; user: string; text: string; createdAt: string };
type Document = {
  id: number;
  title: string;
  description: string;
  fileUrl?: string;
  content?: string;
  likes?: number;
  comments?: Comment[];
  isAdmin?: boolean; // добавлено
};

type StoredUser = {
  token: string;
  favorites?: number[];
  likes?: number[];
  user: User;
};

const LiteraturePage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Загружаем документы и юзера
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData: StoredUser = JSON.parse(storedUser);
      setUser(userData.user);
      setFavorites(userData.favorites || []);
      const token = userData.token;

      axios
        .get("http://localhost:5000/documents", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // оставляем только документы добавленные админом
          const adminDocs = res.data.filter((doc: Document) => doc.isAdmin);
          setDocuments(adminDocs);
        })
        .catch((err) => console.error("Ошибка загрузки документов:", err));
    }
  }, []);

  // Функция обновления localStorage (для избранного)
  const updateUserStorage = (updates: Partial<StoredUser>) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const userData: StoredUser = JSON.parse(storedUser);
    const newUser = { ...userData, ...updates };
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const removeDocumentFromList = (id: number) => {
  setDocuments((prev) => prev.filter((doc) => doc.id !== id));
};

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

  // 💬 Добавить комментарий
  const addComment = (text: string) => {
    if (!text.trim() || !selectedDoc) return;
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    if (!token) return;

    axios
      .post(
        `http://localhost:5000/comments/${selectedDoc.id}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      )
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Литература от админа</h1>

      <DocumentsList
        documents={documents}
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
};

export default LiteraturePage;
