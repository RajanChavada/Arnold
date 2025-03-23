import React, { useState, FormEvent, KeyboardEvent, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ReactMarkdown from 'react-markdown';

export const AiTrainer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const generateInitialPrompt = () => {
    return `As training expert I need you to lay out a 4-5 workout split consisting of 
          high volume intensity workouts where the person must train till failure 
          hitting all muscle groups twice maybe legs once a week, also training abs (mainly just 
          leg raises and cable crunches nothing too long), as well as rest time in between 
          tracking of progression of the lifts, include some compound movements in each day. 
          lets give options for PPL, maybe chest+tri, back+bicep, legs+shoulders, arms+shoulders, back+chest. 
          Anything else you see fit. You must give a challenging plan that pushes the person and makes for optimal 
          gains, also query the web and find guiding youtube videos for complex workouts that might not be simple to perform`;
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
    const loadInitialWorkout = async () => {
      const initialLoad = localStorage.getItem('initialTrainerLoad');
      if (!initialLoad) {
        await handleAIQuery(generateInitialPrompt());
        localStorage.setItem('initialTrainerLoad', 'true');
      }
    };

    loadInitialWorkout();
  }, [generateInitialPrompt]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const res = await fetch('https://arnold-ai.jradesinfo.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();
      console.log('Received response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (data.success && data.response) {
        setResponse(data.response.response || 'No content in response');
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input

          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about workouts, nutrition, or exercise form..."
          className="w-ful text-white"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Thinking...' : 'Ask AI Trainer'}
        </Button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="p-6 bg-white rounded-lg shadow-sm prose prose-slate max-w-none">
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
};