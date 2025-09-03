import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("✅ Успешный вход: " + data.user.name);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        const errorText = await res.text();
        setMessage("❌ Ошибка: " + errorText);
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
        Вход
      </motion.h1>

      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
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
        <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
          Войти
        </button>
      </form>

      {message && <p className="mt-4 text-white font-medium">{message}</p>}
    </div>
  );
};

export default LoginPage;
