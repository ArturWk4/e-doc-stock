import React, { useState } from "react";
import { User } from "../pages/UserProfile";

type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  duties: string;
  responsibilities: string[];
  documentsCount: number;
};

type Props = {
  user: User;
  employees: Employee[];
  sortPosition: string;
  setSortPosition: (pos: string) => void;
  onSelect: (emp: Employee) => void;
  onAddEmployee: (employee: Omit<Employee, "id">) => void;
  onDeleteEmployee: (id: number) => void;
};

export default function TeamList({ 
  user,
  employees, 
  sortPosition, 
  setSortPosition, 
  onSelect, 
  onAddEmployee, 
  onDeleteEmployee 
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    duties: "",
    responsibilities: [""],
    documentsCount: 0
  });

  // Уникальные должности
  const positions = ["Все", ...Array.from(new Set(employees.map((e) => e.position)))];

  const filteredEmployees = sortPosition === "Все"
    ? employees
    : employees.filter((e) => e.position === sortPosition);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.duties) {
      alert("Заполните обязательные поля");
      return;
    }

    onAddEmployee({
      ...newEmployee,
      responsibilities: newEmployee.responsibilities.filter(r => r.trim() !== "")
    });

    setNewEmployee({
      name: "",
      email: "",
      position: "",
      duties: "",
      responsibilities: [""],
      documentsCount: 0
    });
    setIsAdding(false);
  };

  return (
    <div>
      {/* Кнопка добавления и фильтр */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-3 flex-wrap">
          {positions.map((pos) => (
            <button
              key={pos}
              className={`px-4 py-2 rounded-full border transition-colors ${
                sortPosition === pos
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setSortPosition(pos)}
            >
              {pos}
            </button>
          ))}
        </div>
          {user.role === "admin" && <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-indigo-500 transition-colors"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? "Отмена" : "+ Добавить сотрудника"}
        </button>}
      </div>

      {/* Форма добавления */}
      {isAdding && (
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Добавить нового сотрудника</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="ivan@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Должность *</label>
              <input
                type="text"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Разработчик"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Обязанности *</label>
              <input
                type="text"
                value={newEmployee.duties}
                onChange={(e) => setNewEmployee({...newEmployee, duties: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Разработка фронтенда"
              />
            </div>
          </div>

          <button
            onClick={handleAddEmployee}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-indigo-500"
          >
            Добавить сотрудника
          </button>
        </div>
      )}

      {/* Список сотрудников */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow relative"
          >
            {/* Кнопка удаления */}
            {user.role === "admin" && <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEmployee(emp.id);
              }}
              className="absolute top-4 right-4 w-12 h-12"
              title="Удалить сотрудника"
            >
              ×
            </button>}


            <div onClick={() => onSelect(emp)} className="cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800">{emp.position}</h2>
              <p className="text-gray-500 mb-2">{emp.name}</p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Что делает:</span> {emp.duties}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}