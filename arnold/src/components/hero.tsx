import { useNavigate } from 'react-router-dom';

export default function hero() {
    const navigate = useNavigate(); 

    const handleClick = () => { 
        navigate("/signup-login"); 
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-700">
      <div className="text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white-900 sm:text-7xl">
          Welcome to Arnold
        </h1>
        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Your all in one home to personalized training goals, programs, and
          diet tips
        </p>
        <button onClick={handleClick} className="mt-8 bg-transparent hover:bg-indigo-500 text-white font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
          Get Started now
        </button>
      </div>
    </div>
  );
}
