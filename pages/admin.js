import { useState } from 'react';

const ADMIN_PASSWORD = 'admin123'; // Simple hardcoded password for demo

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [prompts, setPrompts] = useState({
    general: '',
    productivity: '',
    mindset: '',
    business: '',
  });
  const [message, setMessage] = useState('');

  async function fetchPrompts() {
    const res = await fetch('/api/admin/prompts');
    if (res.ok) {
      const data = await res.json();
      setPrompts(data);
    }
  }

  async function updatePrompts(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/prompts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer admin123'
      },
      body: JSON.stringify(prompts),
    });
    if (res.ok) {
      setMessage('Prompts updated successfully.');
    } else {
      setMessage('Failed to update prompts.');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchPrompts();
    } else {
      alert('Incorrect password');
    }
  }

  if (!authenticated) {
    return (
      <div style={styles.container}>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Admin Prompt Configuration</h1>
      <form onSubmit={updatePrompts} style={styles.form}>
        {Object.entries(prompts).map(([category, prompt]) => (
          <div key={category} style={styles.field}>
            <label style={styles.label}>{category.charAt(0).toUpperCase() + category.slice(1)} Prompt:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompts({ ...prompts, [category]: e.target.value })}
              rows={3}
              style={styles.textarea}
            />
          </div>
        ))}
        <button type="submit" style={styles.button}>Save Prompts</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    fontSize: '1rem',
    padding: '0.5rem',
    marginBottom: '1rem',
    width: '100%',
    boxSizing: 'border-box',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  textarea: {
    fontSize: '1rem',
    padding: '0.5rem',
    resize: 'vertical',
  },
};
