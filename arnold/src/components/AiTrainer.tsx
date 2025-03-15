import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ReactMarkdown from 'react-markdown';

export const AiTrainer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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