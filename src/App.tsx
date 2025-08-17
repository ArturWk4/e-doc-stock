import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersList from "./components/UsersList";
import PostsList from "./components/PostsList";
import EditUser from "./components/EditUser";
import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import "./index.css";

const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const App = () => {

  return (
     <Router>
      <div className="min-h-screen bg-gray-50">

        <Navbar />
        <React.Suspense fallback={<div className="p-6 text-center">Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
