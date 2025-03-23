import { useNavigate } from 'react-router-dom';
import { Reveal } from "./Reveal"; 
import { ChevronDownIcon } from '@heroicons/react/24/solid'; 
import Navbar from "./Navbar";

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

            {/* Features Section */}
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

            {/* Services Section */}
            <div id="services" className="min-h-screen py-20 bg-gradient-to-r from-black to-indigo-700">
                <div className="text-center mb-12">
                    <h2 className="text-4xl text-white font-semibold">Our Services</h2>
                    <p className="text-lg text-gray-300">Explore the various personalized services we offer to enhance your fitness journey.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-dumbbell text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Personalized Coaching</h3>
                            <p className="text-gray-300">Work with our expert coaches to achieve your personal fitness goals through tailored training plans.</p>
                        </div>
                    </Reveal>
                    
                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-users text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Community Support</h3>
                            <p className="text-gray-300">Join our active community of fitness enthusiasts for motivation, advice, and support at any time.</p>
                        </div>
                    </Reveal>
                    
                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-chart-line text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Progress Tracking</h3>
                            <p className="text-gray-300">Track your workouts, nutrition, and performance with easy-to-read reports and analytics.</p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-calendar-check text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Custom Workouts</h3>
                            <p className="text-gray-300">Receive custom workout plans that evolve as you progress, tailored to your fitness level.</p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-apple-alt text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Nutrition Guidance</h3>
                            <p className="text-gray-300">Get personalized nutrition advice from experts to support your fitness goals and well-being.</p>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="bg-indigo-900 p-8 rounded-lg text-center hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="mb-4">
                                <i className="fas fa-trophy text-4xl text-indigo-500"></i>
                            </div>
                            <h3 className="text-2xl text-white font-semibold mb-4">Fitness Challenges</h3>
                            <p className="text-gray-300">Join fun fitness challenges to keep your motivation high and push your limits.</p>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="min-h-screen py-20 bg-gradient-to-r from-black to-indigo-700">
    <div className="text-center mb-12">
        <h2 className="text-4xl text-white font-semibold">Contact Us</h2>
        <p className="text-lg text-gray-300">We would love to hear from you! Reach out for support or inquiries.</p>
    </div>

    <div className="flex justify-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">Get in Touch</h3>
                <Reveal>
                <form action="#" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="name" className="text-gray-700 font-semibold">Name</label>
                            <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="message" className="text-gray-700 font-semibold">Message</label>
                        <textarea id="message" rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>

                    <button type="submit" className="mt-6 w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Send Message
                    </button>
                </form>
                </Reveal>
            </div>
        </div>
    </div>
</div>

        </>
    );
}
