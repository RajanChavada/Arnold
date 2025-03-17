import React, { useState, FormEvent, KeyboardEvent, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ReactMarkdown from 'react-markdown';


interface DietTrainerProper {
    currentWeight: number; 
    goalWeight: number;
    fitnessGoal: string;
    age: number;
}

export const DietTrainer: React.FC<DietTrainerProper> = ({
    currentWeight,
    goalWeight,
    fitnessGoal,
    age
}) => { 

    const weightDiff = goalWeight - currentWeight;
    const goalType = weightDiff > 0 ? "gain" : "lose";
    const weightChange = Math.abs(weightDiff);
    const [response, setResponse] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


   // Create a personalized initial prompt using user data
   const generateInitialPrompt = () => {
    const weightDiff = goalWeight - currentWeight;
    const goalType = weightDiff > 0 ? "gain" : "lose";
    const weightChange = Math.abs(weightDiff);
    
    return `As a nutrition expert, provide a personalized diet plan for someone with the following characteristics:
    - Current weight: ${currentWeight}kg
    - Goal weight: ${goalWeight}kg (needs to ${goalType} ${weightChange}kg)
    - Fitness goal: ${fitnessGoal}
    - Age: ${age}

    Please provide:
    1. Daily caloric needs based on their stats
    2. Macronutrient distribution
    3. Meal timing recommendations
    4. Sample meal plan
    5. Foods to focus on for their specific goal of ${fitnessGoal}
    
    Format the response in a clear, organized way with sections and bullet points.`;
};

        // Function to handle AI queries
    const handleAIQuery = async (promptText: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://arnold-ai.jradesinfo.workers.dev/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptText }),
            });

            const data = await res.json();
            console.log('AI Response:', data);
            
            if (data.success && data.response) {
                setResponse(data.response.response || 'No content in response');
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to process request');
            setResponse('');
        } finally {
            setLoading(false);
        }
    };

    // Load initial personalized diet information when component mounts or when props change
    useEffect(() => {
        handleAIQuery(generateInitialPrompt());
    }, [currentWeight, goalWeight, fitnessGoal, age]);
    
    return (
        <div className="w-full max-w-4xl mx-auto">
            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="p-4 bg-gray-50 rounded">
                    <p className="text-gray-600">Generating your personalized diet plan...</p>
                </div>
            ) : response && (
                <div className="p-6 bg-white rounded-lg prose prose-white max-w-none">
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-4" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
                            em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,
                            blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4" {...props} />
                            ),
                        }}
                    >
                        {response}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}