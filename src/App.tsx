import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import "./index.css";
import BriefingPage from "./pages/BriefingPage";
import LiteraturePage from "./pages/LiteraturePage";
import DocumentsPage from "./pages/DocumentsPage";

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
            <Route path="/briefing" element={<BriefingPage />} />
            <Route path="/literature" element={<LiteraturePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
