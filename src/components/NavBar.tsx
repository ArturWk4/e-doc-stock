import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
            <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16 items-center">
          <div className="md:flex space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Пользователи
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Посты
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-indigo-600'
                  : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Личный кабинет
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
