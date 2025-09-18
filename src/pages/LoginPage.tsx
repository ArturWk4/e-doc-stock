import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {email, password}
      console.log(data)
      const res = await axios.post("http://localhost:5000/auth/login", 
        data,
      );

      if (res.data) {
        const data = res.data
        console.log(data)
        setMessage("✅ Успешный вход: " + data.user.name);
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("storageChange")); // уведомляем Navbar
        navigate("/profile")

      } 
    } catch (err:any) {
      if (err.response && err.response.data && err.response.data.message) {
      setMessage("❌ " + err.response.data.message);
    } else {
      setMessage("❌ Сервер недоступен");
    }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-skyCustom p-4">
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
        <button type="submit" className="w-full py-3 bg-blue-500 shadow-2xl text-white rounded-xl hover:bg-indigo-500 transition">
          Войти
        </button>
      </form>

      {message && <p className="mt-4 text-white font-medium">{message}</p>}
    </div>
  );
};

export default LoginPage;
