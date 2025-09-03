import React from "react";

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
  employees: Employee[];
  sortPosition: string;
  setSortPosition: (pos: string) => void;
  onSelect: (emp: Employee) => void;
};

export default function TeamList({ employees, sortPosition, setSortPosition, onSelect }: Props) {
  // Уникальные должности
  const positions = ["Все", ...Array.from(new Set(employees.map((e) => e.position)))];

  const filteredEmployees = sortPosition === "Все"
    ? employees
    : employees.filter((e) => e.position === sortPosition);

  return (
    <div>
      {/* Фильтр */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
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

      {/* Список сотрудников */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelect(emp)}
          >
            <h2 className="text-xl font-semibold text-gray-800">{emp.position}</h2>
            <p className="text-gray-500 mb-2">{emp.name}</p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Что делает:</span> {emp.duties}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {emp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
