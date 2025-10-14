import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import Home from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Categories } from "./pages/Categories";
import { Vocabs } from "./pages/Vocabs";
import { Flashcards } from "./pages/Flashcards";
import { Navbar } from "./components/Navbar";
import "../src/styles/flashcard.css";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "./utils/localStorage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); 

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setIsLoggedIn(true);
    }
    setIsInitialized(true); 
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeUserFromLocalStorage();
  };

  const protectRoute = (element: ReactNode) =>
    isLoggedIn ? element : <Navigate to="/login" replace />;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <main className="flex-grow">
          {isInitialized && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categories" element={protectRoute(<Categories />)} />
              <Route path="/vocabulary" element={protectRoute(<Vocabs />)} />
              <Route path="/flashcard" element={protectRoute(<Flashcards />)} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
