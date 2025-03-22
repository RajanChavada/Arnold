import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup-login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Arnold</span>
          </div>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <HashLink
              smooth
              to="/#features"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            >
              Features
            </HashLink>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">About</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">Services</a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition">Contact</a>
          </div>

          {/* Call-to-Action Button */}
          <div className="flex items-center">
            <button 
              onClick={handleClick} 
              className="bg-transparent hover:bg-indigo-600 text-white font-medium py-1.5 px-4 text-sm rounded-full border border-indigo-500 transition"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 dark:text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
