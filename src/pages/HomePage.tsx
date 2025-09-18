import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-skyCustom p-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-lg text-center mb-10"
      >
        Добро пожаловать
      </motion.h1>
      <div className="flex items-center gap-10">
                  <NavLink
              to="/login"
              className='text-white px-3 py-2 rounded-xl bg-blue-500 shadow-2xl text-2xl font-medium'
              
            >
              Вход
            </NavLink>
                        <NavLink
              to="/register"
              className='text-white px-3 py-2 rounded-xl text-2xl font-medium  bg-blue-500 shadow-2xl'
                  
            >
              Регистрация
            </NavLink>

      </div>

    
    </div>
  );
};

export default HomePage;
