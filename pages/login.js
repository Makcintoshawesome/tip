import { useState } from 'react';
import { useRouter } from 'next/router';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const USERNAME = 'admin';
const PASSWORD = 'password';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem('auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      
      {/* Return Link */}
      <a href="/" className="mb-3 text-decoration-none text-success">
        ← Return to Homepage
      </a>

      {/* Login Card */}
      <div className="card p-4 shadow rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text"><PersonIcon /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><LockIcon /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
