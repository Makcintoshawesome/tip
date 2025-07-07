import { useState } from 'react';

export default function Home() {
  const [tip, setTip] = useState('Click "Next Tip" to get a tip!');
  const [loading, setLoading] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [category, setCategory] = useState('general');

  async function fetchTip() {
    setLoading(true);
    try {
      const response = await fetch(`/api/generate-tip?category=${encodeURIComponent(category)}`);
      const data = await response.json();
      if (response.ok) {
        setTip(data.tip);
        setFromCache(data.fromCache || false);
      } else {
        setTip('Error: ' + (data.error || 'Failed to fetch tip'));
        setFromCache(false);
      }
    } catch (error) {
      setTip('Error: ' + error.message);
      setFromCache(false);
    }
    setLoading(false);
  }

  function copyTip() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tip);
      alert('Tip copied to clipboard!');
    } else {
      alert('Clipboard API not supported');
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Generated Tips</h1>

      <label htmlFor="category" style={styles.label}>Select Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        <option value="general">General</option>
        <option value="productivity">Productivity</option>
        <option value="mindset">Mindset</option>
        <option value="business">Business</option>
      </select>

      <p style={styles.tip}>{tip}</p>
      {fromCache && (
        <p style={styles.fallbackNotice}>Showing cached tip due to API limits.</p>
      )}

      <div style={styles.buttonRow}>
        <button onClick={fetchTip} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Next Tip'}
        </button>
        <button onClick={copyTip} style={styles.copyButton} disabled={loading || !tip}>
          Copy Tip
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '0 1rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  select: {
    fontSize: '1rem',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  tip: {
    fontSize: '1.25rem',
    minHeight: '3rem',
    marginBottom: '1.5rem',
  },
  fallbackNotice: {
    fontSize: '0.875rem',
    color: 'gray',
    marginBottom: '1rem',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
  },
  copyButton: {
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid #0070f3',
    backgroundColor: 'white',
    color: '#0070f3',
  },
};
