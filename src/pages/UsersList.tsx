import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const LOCAL_STORAGE_KEY = "user";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Загружаем текущего пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCurrentUser(parsed.user);
    }
  }, []);

  // Загружаем всех пользователей с бэкенда
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!storedUser) return;
        const token = JSON.parse(storedUser).token;

        const res = await axios.get("http://localhost:5000/auth/users");

        setUsers(res.data.users);
      } catch (err) {
        console.error("Ошибка загрузки пользователей", err);
      }
    };

    fetchUsers();
  }, []);

  // Удаление пользователя (только для админа)
  const handleDelete = async (id: number) => {
    if (!currentUser || currentUser.role !== "admin") return;
    if (!window.confirm("Вы уверены, что хотите удалить этого пользователя?")) return;

    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedUser) return;
      const token = JSON.parse(storedUser).token;

      await axios.delete(`http://localhost:5000/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Ошибка удаления пользователя", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Все пользователи</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col items-center p-4"
          >
            <FaUserCircle className="text-6xl text-indigo-500 mb-2" />
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <span className="text-gray-800 font-medium mt-1">{user.role}</span>

            {currentUser?.role === "admin" && (
              <button
                onClick={() => handleDelete(user.id)}
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Удалить
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
