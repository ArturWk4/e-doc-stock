import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
          username,
          email,
          password,
        });
      if (res.data) {
        const data = res.data
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("storageChange")); // уведомляем Navbar
        navigate("/profile")
        setMessage("✅ Регистрация успешна!");
        setName(""); 
        setEmail(""); 
        setPassword("");
      } else {
        setMessage("❌ Ошибка");
      }
    } catch (err) {
      setMessage("❌ Сервер недоступен");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-400 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-white text-4xl sm:text-5xl font-extrabold mb-6"
      >
        Регистрация
      </motion.h1>

      <form onSubmit={handleRegister} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <input
          type="text"
          placeholder="Имя"
          value={username}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
          Зарегистрироваться
        </button>
      </form>

      {message && <p className="mt-4 text-white font-medium">{message}</p>}
    </div>
  );
};

export default RegisterPage;
