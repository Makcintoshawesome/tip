import { useState, useEffect } from 'react';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Player } from '@lottiefiles/react-lottie-player';

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

export default function Home() {
  const [tip, setTip] = useState('Click "Next Tip" to get a tip!');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isClient, setIsClient] = useState(false); // 👈 Client check

  // Make sure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !category) return;

    // LocalStorage Stats
    const stats = JSON.parse(localStorage.getItem('categoryStats') || '{}');
    stats[category] = (stats[category] || 0) + 1;
    localStorage.setItem('categoryStats', JSON.stringify(stats));

    fetchTip();
  }, [category, isClient]);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  async function fetchTip() {
    setLoading(true);
    try {
      const response = await fetch(`/api/tip?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch tip');
      const data = await response.json();
      setTip(data.tip);
    } catch (error) {
      setTip('Error fetching tip. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function copyTip() {
    if (
      tip &&
      tip !== 'Click "Next Tip" to get a tip!' &&
      tip !== 'Error fetching tip. Please try again.'
    ) {
      navigator.clipboard.writeText(tip);
      setCopySuccess(true);
    }
  }

  function shareTip() {
    if (
      navigator.share &&
      tip &&
      tip !== 'Click "Next Tip" to get a tip!' &&
      tip !== 'Error fetching tip. Please try again.'
    ) {
      navigator
        .share({ title: 'AI Generated Tip', text: tip })
        .catch((error) => {
          alert('Error sharing tip: ' + error);
        });
    } else {
      alert('Sharing not supported on this browser.');
    }
  }

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

      {/* HERO */}
      <main>
        <section
          className="py-5 text-dark"
          style={{
            backgroundImage: 'url(/styles/tips.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-lg-8 col-md-10 p-4 rounded-4 shadow-lg border border-2 border-success position-relative"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #f0fff4)',
                  animation: 'fadeIn 0.8s ease',
                }}
              >
                <div className="position-absolute top-0 end-0 mt-2 me-3">
                  <span className="fs-3 text-warning">
                    <i className="bi bi-stars"></i>
                  </span>
                </div>

                <div className="text-center">
                  <span
                    className="badge rounded-pill mb-3 px-3 py-2 text-white"
                    style={{
                      background: 'linear-gradient(to right, #00c853, #b2ff59)',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <i className="bi bi-lightbulb-fill me-2"></i> AI Magic Tips
                  </span>

                  <h1 className="fs-1 fw-bold mb-2 text-success" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    ✨ Get Your Daily Spark ✨
                  </h1>

                  <p className="text-muted mb-4">Pick a vibe and let the tip genie surprise you!</p>

                  <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-3">
                    <select
                      className="form-select form-select-sm w-auto border-success"
                      style={{ borderRadius: '999px' }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>

                    <button className="btn btn-success btn-sm rounded-pill px-3" onClick={fetchTip} disabled={loading}>
                      {loading ? '✨ Loading...' : 'Next Tip'}
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm rounded-pill px-3"
                      onClick={copyTip}
                      disabled={!tip || loading}
                    >
                      📋 Copy
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm rounded-pill px-3"
                      onClick={shareTip}
                      disabled={!tip || loading}
                    >
                      📤 Share
                    </button>
                  </div>

                  {copySuccess && (
                    <div className="alert alert-success alert-dismissible fade show py-2 px-3 rounded-pill" role="alert">
                      🎉 Tip copied to clipboard!
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setCopySuccess(false)}
                      ></button>
                    </div>
                  )}

                  <div
                    className="mt-4 p-4 bg-white border border-2 border-success rounded-4 shadow-sm bubble-speech fade-in mx-auto"
                    style={{
                      minHeight: '5rem',
                      fontStyle: 'italic',
                      fontFamily: 'Georgia, serif',
                      position: 'relative',
                      maxWidth: '600px',
                    }}
                  >
                    <i className="bi bi-chat-quote-fill text-success fs-3 me-2 position-absolute top-0 start-0 ms-3 mt-n3"></i>
                    <span className="fs-5 text-dark">{tip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center text-success fw-bold mb-5">Why Use Daily Tips?</h2>
            <div className="row text-center g-4">
              <div className="col-md-4">
                <div style={{ height: '150px' }} className="svg-bounce">
                  {/* SVG 1 */}
                </div>
                <h5 className="fw-bold mt-3">Actionable Insights</h5>
                <p className="text-muted">Get tips that inspire positive change and productivity.</p>
              </div>

              <div className="col-md-4">
                <div style={{ height: '150px' }} className="svg-pulse">
                  {/* SVG 2 */}
                </div>
                <h5 className="fw-bold mt-3">Powered by AI</h5>
                <p className="text-muted">All tips are generated in real-time using GPT intelligence.</p>
              </div>

              <div className="col-md-4">
                <div style={{ height: '150px' }} className="svg-rotate">
                  {/* SVG 3 */}
                </div>
                <h5 className="fw-bold mt-3">Fun & Simple</h5>
                <p className="text-muted">Pick a category, click a button, and enjoy a new spark daily.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
