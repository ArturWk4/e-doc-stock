import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaFileAlt, FaBriefcase } from 'react-icons/fa';

const LOCAL_STORAGE_KEY = "userData";

interface User {
  name: string;
  email: string;
  address: string;
  phone: string; 
  role?: string;
  position?: string;
  documentsCount?: number;
}

const UserProfile = () => {
  const defaultUser: User = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    address: 'ул. Пушкина, д. 10, кв. 5',
    phone: '+7 (999) 123-45-67',
    role: 'Менеджер',
    position: 'Разработчик',
    documentsCount: 12
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(defaultUser);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setUser(formData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } else {
      setFormData(user);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Верхняя часть с аватаром */}
        <div className="bg-indigo-600 p-6 flex items-center space-x-4">
          <FaUserCircle className="text-6xl text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-indigo-200">{user.email}</p>
          </div>
        </div>

        {/* Основная информация */}
        <div className="p-6 space-y-4">
          {/* Профиль editable */}
          <div className="space-y-2">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Имя</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-800">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              {isEditing ? (
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
              <span className="font-semibold text-gray-800">{user.documentsCount || 0}</span>
              <span className="text-gray-500 text-sm">Документы</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl shadow flex flex-col justify-between items-center">
              <FaBriefcase className="text-indigo-500 mb-1" />
              <span className="font-semibold text-gray-800">{user.position || '-'}</span>
              <span className="text-gray-500 text-sm">Позиция</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl shadow flex flex-col justify-between items-center">
              <span className="text-indigo-500 mb-1">🎖️</span>
              <span className="font-semibold text-gray-800">{user.role || '-'}</span>
              <span className="text-gray-500 text-sm">Роль</span>
            </div>
          </div>

          {/* Кнопки */}
          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={handleEditToggle}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>

            {isAdmin && (
              <button
                onClick={() => navigate('/users/admin')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
