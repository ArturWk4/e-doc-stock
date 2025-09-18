import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaFileAlt } from "react-icons/fa";
import axios from "axios";

const LOCAL_STORAGE_KEY = "user";

export interface User {
  id?: number;
  username: string;
  email: string;
  role: string;
  amountDoc: number;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Загружаем пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.user) {
        setUser(parsed.user);
        setFormData(parsed.user);
      }
    }
  }, []);

  // Обработка изменения инпутов
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Обновление данных пользователя (username, email, role)
  const updateUserData = async (updatedData: Partial<User>) => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);
      const userId = parsed.user.id;
      const token = parsed.token;

      const res = await axios.put(
        `http://localhost:5000/auth/update/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.user) {
        setUser(res.data.user);
        setFormData(res.data.user);

        // Обновляем localStorage
        parsed.user = res.data.user;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch (err) {
      console.error("Ошибка обновления пользователя", err);
    }
  };

  // Переключение редактирования username/email
  const handleEditToggle = async () => {
    if (isEditing && formData) {
      await updateUserData({ username: formData.username, email: formData.email });
    } else {
      setFormData(user);
    }
    setIsEditing(!isEditing);
  };

  // Переключение роли пользователя
  const toggleRole = async () => {
    if (!user) return;
    const newRole = user.role === "admin" ? "user" : "admin";
    await updateUserData({ role: newRole });
  };

  if (!user) {
    return (
      <div className="text-center text-blue-800 font-semibold text-2xl mt-10">
        Необходимо авторизоваться
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Верхняя часть с аватаром */}
        <div className="bg-skyCustom p-6 flex items-center space-x-4">
          <FaUserCircle className="text-6xl text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            <p className="text-indigo-200">{user.email}</p>
          </div>
        </div>

        {/* Основная информация */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Имя</label>
              {isEditing && formData ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-800">{user.username}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              {isEditing && formData ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-800">{user.email}</p>
              )}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-100 p-3 rounded-xl shadow flex flex-col justify-between items-center">
              <FaFileAlt className="text-indigo-500 mb-1" />
              <span className="font-semibold text-gray-800">
                {user.amountDoc || 0}
              </span>
              <span className="text-gray-500 text-sm">Документы</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl shadow flex flex-col justify-between items-center">
              <span className="text-indigo-500 mb-1">🎖️</span>
              <span className="font-semibold text-gray-800">{user.role || "-"}</span>
              <span className="text-gray-500 text-sm">Роль</span>
            </div>
          </div>

          {/* Кнопки редактирования */}
          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={handleEditToggle}
              className="w-full px-4 py-2 bg-blue-500 shadow-2xl text-white rounded-md hover:bg-indigo-500 transition"
            >
              {isEditing ? "Сохранить" : "Редактировать"}
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => navigate("/users/admin")}
                className="w-full px-4 py-2 bg-blue-500 shadow-2xl text-white rounded-md hover:bg-indigo-500 transition"
              >
                Все пользователи
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
