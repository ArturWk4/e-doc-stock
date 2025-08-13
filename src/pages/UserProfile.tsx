import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = "userData";

const UserProfile = () => {
  const defaultUser = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    address: 'ул. Пушкина, д. 10, кв. 5',
    phone: '+7 (999) 123-45-67',
  };

  const [user, setUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultUser);
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8 relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <label className="text-gray-700 font-medium">Режим:</label>
        <select
          value={isAdmin ? 'admin' : 'user'}
          onChange={e => setIsAdmin(e.target.value === 'admin')}
          className="border border-gray-300 rounded-md p-1"
        >
          <option value="user">Пользователь</option>
          <option value="admin">Админ</option>
        </select>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Личный кабинет</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Имя</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-900">{user.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-900">{user.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Адрес</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-900">{user.address}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Телефон</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-gray-900">{user.phone}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-2">
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {isEditing ? 'Сохранить' : 'Редактировать'}
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate('/users/admin')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Все пользователи
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
