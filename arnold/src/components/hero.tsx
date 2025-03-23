import { useNavigate } from 'react-router-dom';
import { Reveal } from "./Reveal"; 
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 
import  Navbar  from "./Navbar";


export default function Hero() {
    const navigate = useNavigate(); 

    const handleClick = () => { 
        navigate("/signup-login"); 
    }

    return (
        <>
         <Navbar />
        
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-700">
               
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-white-900 sm:text-7xl">
                        Welcome to Arnold
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Your all-in-one home for personalized training goals, programs, and diet tips.
                    </p>
                    <button 
                        onClick={handleClick} 
                        className="mt-8 bg-transparent hover:bg-indigo-500 text-white font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
                    >
                        Get Started Now
                    </button>
                
                </div>
              
              
                
                <div className="absolute bottom-10 flex flex-col items-center">
                    <p className="text-gray-300 text-lg font-medium">Learn More</p>
                    <ChevronDownIcon className="w-8 h-8 text-indigo-400 animate-bounce" />
                </div>
                
            </div>

            {/* Ensure same width & proper spacing */}
            <div id="features" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-700 space-y-40">
                <Reveal>
                    <div className="w-full max-w-lg p-6 bg-transparent border border-indigo-500 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">Progress Tracking</h3>
                        <p className="text-gray-300">Monitor your progress with detailed analytics and adjustable goals.</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div className="w-full max-w-lg p-6 bg-transparent border border-indigo-500 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">Custom Workouts</h3>
                        <p className="text-gray-300">Get personalized workout plans tailored to your fitness level and goals.</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div className="w-full max-w-lg p-6 bg-transparent border border-indigo-500 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">Nutrition Guidance</h3>
                        <p className="text-gray-300">Receive expert dietary recommendations for optimal health and performance.</p>
                    </div>
                </Reveal>
            </div>


            <div id="services" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-indigo-700 space-y-40">
                    
            </div>
        </>
    );
}
