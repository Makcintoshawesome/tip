import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCategories, setCategories } from '../mockPromptStore';

import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Admin() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [categories, setLocalCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      router.push('/login');
    } else {
      fetchPromptAndCategories();
    }
  }, []);

  async function fetchPromptAndCategories() {
    setLoading(true);
    try {
      const promptResponse = await fetch('/api/admin-prompt');
      if (!promptResponse.ok) throw new Error('Failed to fetch prompt');
      const promptData = await promptResponse.json();
      setPrompt(promptData.prompt);
      setLocalCategories(getCategories());
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function savePrompt() {
    setLoading(true);
    try {
      const response = await fetch('/api/admin-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error('Failed to save prompt');
      alert('Prompt saved!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function addCategory() {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setLocalCategories(updatedCategories);
      setCategories(updatedCategories);
      setNewCategory('');
    }
  }

  function removeCategory(cat) {
    const updatedCategories = categories.filter(c => c !== cat);
    setLocalCategories(updatedCategories);
    setCategories(updatedCategories);
  }

  function logout() {
    localStorage.removeItem('auth');
    router.push('/login');
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4 shadow-sm">
          <h4 className="text-success mb-4">Admin Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="btn btn-outline-success w-100" onClick={logout}>
                <LogoutIcon className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-5">
          <h2 className="text-success mb-4">Manage Prompt & Categories</h2>

          {/* Prompt Card */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
              <strong>Edit Prompt</strong>
            </div>
            <div className="card-body">
              <textarea
                className="form-control bg-light"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                rows={6}
              />
              <button
                className="btn btn-success mt-3"
                onClick={savePrompt}
                disabled={loading}
              >
                <SaveIcon className="me-2" />
                Save Prompt
              </button>
            </div>
          </div>

          {/* Categories Card */}
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <strong>Manage Categories</strong>
            </div>
            <div className="card-body">
              <ul className="list-group mb-3">
                {categories.map((cat) => (
                  <li key={cat} className="list-group-item d-flex justify-content-between align-items-center">
                    {cat}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeCategory(cat)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="input-group">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="form-control"
                  disabled={loading}
                />
                <button
                  className="btn btn-success"
                  onClick={addCategory}
                  disabled={loading || !newCategory.trim()}
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
