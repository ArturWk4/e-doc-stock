import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LOCAL_STORAGE_KEY = "userData";
const EXPIRATION_MINUTES = 10;

const HomePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = new Date().getTime();
      if (now - parsed.timestamp < EXPIRATION_MINUTES * 60 * 1000) {
        setName(parsed.name);
        setEmail(parsed.email);
        setPhone(parsed.phone);
        setIsSubmitted(true);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted && name && email && phone) {
      const userData = { name, email, phone, timestamp: new Date().getTime() };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
    }
  }, [name, email, phone, isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg text-center"
      >
        {isSubmitted ? `Добро пожаловать, ${name}!` : "Привет, это тестовое задание"}
      </motion.h1>

      {!isSubmitted && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 w-full max-w-md bg-white bg-opacity-90 rounded-lg p-6 shadow-lg flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Отправить
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default HomePage;
