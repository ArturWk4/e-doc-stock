import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Функция для обновления состояния пользователя из localStorage
  const updateUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  // Проверка при монтировании и подписка на событие "storageChange"
  useEffect(() => {
    updateUser();

    const handleStorageChange = () => updateUser();

    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center">
        {/* Ссылки по центру */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 whitespace-nowrap">
          <NavLink
            to="/briefing"
            end
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600"
                : "text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Структура компании
          </NavLink>
          <NavLink
            to="/literature"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600"
                : "text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Литература компании
          </NavLink>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600"
                : "text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Документы от сотрудников
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600"
                : "text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Личный кабинет
          </NavLink>
        </div>

        {/* Кнопка справа */}
        <div className="ml-auto">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-blue-500 shadow-2xl text-white rounded-md text-sm font-medium hover:bg-indigo-500 transition"
            >
              Выйти
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-3 py-2 bg-blue-500 shadow-2xl text-white rounded-md text-sm font-medium hover:bg-indigo-500  transition"
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
