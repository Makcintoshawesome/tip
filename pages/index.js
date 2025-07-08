'use client'; // Optional in Next.js 13+ for safety in client components

import { useEffect, useState } from 'react';

export default function Home() {
  const [tip, setTip] = useState('Click "Next Tip" to get a tip!');
  const [copySuccess, setCopySuccess] = useState(false);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      const stats = JSON.parse(localStorage.getItem('categoryStats') || '{}');
      stats[category] = (stats[category] || 0) + 1;
      localStorage.setItem('categoryStats', JSON.stringify(stats));

      fetchTip();
    }
  }, [category]);

  const fetchTip = async () => {
    try {
      const response = await fetch(`/api/tip?category=${category}`);
      const data = await response.json();
      setTip(data.tip);
      setCopySuccess(false);
    } catch (error) {
      console.error('Failed to fetch tip:', error);
      setTip('Error fetching tip. Please try again.');
    }
  };

  const copyTip = () => {
    if (typeof window !== 'undefined') {
      if (
        tip &&
        tip !== 'Click "Next Tip" to get a tip!' &&
        tip !== 'Error fetching tip. Please try again.'
      ) {
        navigator.clipboard.writeText(tip);
        setCopySuccess(true);
      }
    }
  };

  const shareTip = () => {
    if (typeof window !== 'undefined') {
      if (
        navigator.share &&
        tip &&
        tip !== 'Click "Next Tip" to get a tip!' &&
        tip !== 'Error fetching tip. Please try again.'
      ) {
        navigator
          .share({
            title: 'AI Generated Tip',
            text: tip,
          })
          .catch((error) => {
            alert('Error sharing tip: ' + error);
          });
      } else {
        alert('Sharing not supported on this browser.');
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold mb-4">💡 AI Generated Tips</h1>
      <p className="text-xl max-w-xl mb-8">{tip}</p>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={fetchTip}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Next Tip
        </button>
        <button
          onClick={copyTip}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={shareTip}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Share
        </button>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 rounded border border-gray-300 shadow-sm"
      >
        <option value="general">General</option>
        <option value="mindset">Mindset</option>
        <option value="productivity">Productivity</option>
        <option value="success">Success</option>
      </select>
    </main>
  );
}
