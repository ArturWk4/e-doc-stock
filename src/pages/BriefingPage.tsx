import React, { useState } from "react";
import TeamList from "../components/TeamList";
import EmployeePopup from "../components/EmployeePopup";
import { employees as mockEmployees } from "../data/mockData";

// Импортируем тип
import type { Employee } from "../data/mockData";

export default function EmployeesPage() {
  const [sortPosition, setSortPosition] = useState<string>("Все");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Наша команда</h1>

      <TeamList
        employees={mockEmployees}
        sortPosition={sortPosition}
        setSortPosition={setSortPosition}
        onSelect={(emp: Employee) => setSelectedEmployee(emp)}
      />

      <EmployeePopup
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
