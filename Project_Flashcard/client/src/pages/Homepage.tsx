import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to VocabApp</h1>
          <p className="text-xl mb-8">
            Learn and practice vocabulary with flashcards and quizzes
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
