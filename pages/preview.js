import { useState, useEffect } from 'react';

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';

const categories = [
  'productivity',
  'mindset',
  'success',
  'health',
  'creativity',
  'learning',
  'motivation',
  'communication',
  'leadership',
  'focus',
];

export default function Preview() {
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    // Load stats from localStorage or initialize
    const storedStats = JSON.parse(localStorage.getItem('categoryStats')) || {};
    setCategoryStats(storedStats);
  }, []);

  const totalClicks = Object.values(categoryStats).reduce((a, b) => a + b, 0);

  const sortedCategories = categories
    .map((cat) => ({
      name: cat,
      count: categoryStats[cat] || 0,
      percentage: totalClicks ? ((categoryStats[cat] || 0) / totalClicks) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <>
      {/* NAVIGATION */}
      <header className="bg-white shadow-sm sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light container py-3">
          <a className="navbar-brand d-flex align-items-center fw-bold text-success" href="/">
            <LightbulbIcon className="me-2" />
            Daily Tips
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="mainNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/login">
                  <LoginIcon fontSize="small" className="me-1" />
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/signup">
                  <PersonAddIcon fontSize="small" className="me-1" />
                  Signup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href="/preview">
                  <VisibilityIcon fontSize="small" className="me-1" />
                  Preview
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/* MAIN CONTENT */}
      <main className="container py-5">
        <h2 className="mb-4 text-success">Category Click Stats Overview</h2>
        {totalClicks === 0 ? (
          <p>No category clicks recorded yet.</p>
        ) : (
          <div className="list-group">
            {sortedCategories.map(({ name, count, percentage }) => (
              <div key={name} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong>
                  <div className="progress mt-1" style={{ height: '10px', maxWidth: '300px' }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span className="badge bg-success rounded-pill">{count}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
