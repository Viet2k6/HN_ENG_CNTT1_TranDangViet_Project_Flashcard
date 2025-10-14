import { Link } from "react-router-dom";

export const Header = () => (
  <nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              VocabApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
