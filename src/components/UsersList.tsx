import React, { useEffect, useState } from 'react';
import { UserType } from '../types/users';
import { userApi } from '../api/user';
import { useParams, useNavigate } from 'react-router-dom';

const UsersList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await userApi.getUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleEdit = (userId: string | number) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="max-w-[600px] mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-600 text-center">Пользователи</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-indigo-50 rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:gap-6 flex-1">
              <span className="text-lg font-semibold text-gray-900">{user.name}</span>
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                {user.email}
              </a>
            </div>
            {id && (
              <button
                onClick={() => handleEdit(user.id)}
                className="ml-4 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Редактировать
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
