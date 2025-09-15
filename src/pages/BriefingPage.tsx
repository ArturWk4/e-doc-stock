import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamList from "../components/TeamList";
import EmployeePopup from "../components/EmployeePopup";
import type { Employee } from "../data/mockData";
import { User } from "./UserProfile";


const LOCAL_STORAGE_KEY = "user";

  const defaultUser: User = {
    username: "Гость",
    email: "guest@example.com",
    role: "user",
    amountDoc: 0,
  };
export default function EmployeesPage() {
  const [sortPosition, setSortPosition] = useState<string>("Все");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<User>(defaultUser);
  
    const [user, setUser] = useState<User>(defaultUser);
  

    useEffect(() => {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        console.log(storedUser)
        if (parsed.user) {
          setUser(parsed.user);
          setFormData(parsed.user);
        }
      }
    }, []);

  // Загружаем сотрудников с API
  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => {
        setEmployees(res.data.employees || []);
      })
      .catch((err) => {
        console.error("Ошибка загрузки сотрудников:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Добавление сотрудника
  const handleAddEmployee = async (newEmployee: Omit<Employee, "id">) => {
    try {
      const res = await axios.post("http://localhost:5000/employees", newEmployee);
      setEmployees((prev) => [...prev, res.data.employee]);
    } catch (error) {
      console.error("Ошибка при добавлении сотрудника:", error);
      alert("Не удалось добавить сотрудника");
    }
  };

  // Удаление сотрудника
  const handleDeleteEmployee = async (id: number) => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
      if (!token) return;
      await axios.delete(`http://localhost:5000/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
      alert("Не удалось удалить сотрудника");
    }
  };

  if (loading) {
    return <p className="text-center">Загрузка сотрудников...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Наша команда</h1>

      <TeamList
      user={user}
        employees={employees}
        sortPosition={sortPosition}
        setSortPosition={setSortPosition}
        onSelect={setSelectedEmployee}
        onAddEmployee={handleAddEmployee}
        onDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
}
