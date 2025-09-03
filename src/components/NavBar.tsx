import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Здесь можно добавить логику очистки сессии или токена
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center">
        {/* Ссылки по центру в одну строку */}
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
            Инструктаж по должностям
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

        {/* Кнопка Выйти справа */}
        <div className="ml-auto">
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-600 transition"
          >
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
