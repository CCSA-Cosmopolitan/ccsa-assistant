'use client';
import { useState } from 'react';
// import { getAgriculturalAdvice } from '@/actions';
import { getAgriculturalAdvice } from '@/app/actions/conversations';
import { getDeepSeekAdvice } from '@/app/actions/deepseek';

export default function DeepSeekChatBot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
    //   const answer = await getAgriculturalAdvice(query);
    const answer = await getDeepSeekAdvice(query, 'hausa');
    //   setResponse(answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-green-800">
        Agricultural AI Assistant 🌱
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your agricultural question..."
          className="w-full p-4 border rounded-lg mb-4"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Get Advice'}
        </button>
      </form>

      {response && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Expert Advice</h2>
          <p className="text-gray-800 whitespace-pre-line">{response}</p>
        </div>
      )}
    </main>
  );
}