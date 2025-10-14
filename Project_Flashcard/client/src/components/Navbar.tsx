import { NavLink, useLocation } from "react-router-dom";

export const Navbar = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <NavLink to="/" className="text-xl font-bold text-gray-800">
              VocabApp
            </NavLink>

            {!isAuthPage && (
              <div className="flex space-x-4">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/vocabulary"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Vocabulary
                </NavLink>
                <NavLink
                  to="/flashcard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Flashcards
                </NavLink>
                <NavLink
                  to="/quiz"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Quiz
                </NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="bg-[#d4554c] text-white px-7 py-2 rounded hover:bg-[#bb4b44]"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
