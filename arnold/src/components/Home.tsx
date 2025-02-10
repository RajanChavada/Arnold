import React from 'react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
            <p className="text-lg mb-8">This is where you can manage your account and view your information.</p>
            <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Profile
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Settings
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Logout
                </button>
            </div>
        </div>
    );
}

