import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeedContainer from './components/FeedContainer';
import LeaderboardCard from './components/LeaderboardCard';
import ApiDevTools from './components/ApiDevTools';
import LoginCard from './components/LoginCard';
import Footer from './components/Footer';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  // Session & Theme State Persistence
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('devsocial_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('devsocial_theme') || 'dark');

  // Form, Post & Telemetry State
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [commentInputs, setCommentInputs] = useState({});
  const [apiLogs, setApiLogs] = useState([]);
  const [showInspector, setShowInspector] = useState(false);

  // Helper to record endpoint telemetry logs
  const logApiAction = (endpoint, method, status) => {
    setApiLogs(prev => [{ id: Date.now(), endpoint, method, status, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (user) localStorage.setItem('devsocial_user', JSON.stringify(user));
    else localStorage.removeItem('devsocial_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('devsocial_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  // REST API Handlers
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data);
      logApiAction('/api/posts', 'GET', res.status);
    } catch (err) {
      console.error('Fetch error:', err);
      logApiAction('/api/posts', 'GET', 500);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailInput) return;
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, name: nameInput || 'Developer' }),
      });
      const loggedInUser = await res.json();
      setUser(loggedInUser);
      logApiAction('/api/auth/login', 'POST', res.status);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...postData, author: user.name }),
      });
      logApiAction('/api/posts', 'POST', res.status);
      fetchPosts();
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}`, { method: 'DELETE' });
      logApiAction(`/api/posts/${postId}`, 'DELETE', res.status);
      fetchPosts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleReact = async (postId, type) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/react`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      logApiAction(`/api/posts/${postId}/react`, 'PUT', res.status);
      fetchPosts();
    } catch (err) {
      console.error('React error:', err);
    }
  };

  const handleVote = async (postId, optionIndex) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/vote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex })
      });
      logApiAction(`/api/posts/${postId}/vote`, 'PUT', res.status);
      fetchPosts();
    } catch (err) {
      console.error('Vote error:', err);
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, author: user.name }),
      });
      setCommentInputs({ ...commentInputs, [postId]: '' });
      logApiAction(`/api/posts/${postId}/comments`, 'POST', res.status);
      fetchPosts();
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  // Derived Leaderboard & Filtered Datasets
  const topDevelopers = Object.entries(
    posts.reduce((acc, p) => {
      const score = (p.reactions?.fire || 0) * 2 + (p.reactions?.insightful || 0) * 2 + (p.reactions?.shipped || 0) * 3 + 1;
      acc[p.author] = (acc[p.author] || 0) + score;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const filteredPosts = posts.filter(p => {
    const matchSearch = p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const themeStyles = {
    light: 'bg-gray-100 text-gray-900',
    dark: 'bg-slate-950 text-slate-100',
    midnight: 'bg-emerald-950 text-emerald-100'
  }[theme];

  const cardStyles = {
    light: 'bg-white border-gray-200 shadow-xl',
    dark: 'bg-slate-900 border-slate-800/80 shadow-2xl',
    midnight: 'bg-emerald-900/30 border-emerald-800/40 shadow-2xl backdrop-blur-md'
  }[theme];

  if (!user) {
    return (
      <LoginCard
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        nameInput={nameInput}
        setNameInput={setNameInput}
        handleLogin={handleLogin}
        themeStyles={themeStyles}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between ${themeStyles}`}>
      <div>
        <Navbar 
          user={user} 
          theme={theme} 
          setTheme={setTheme} 
          onLogout={() => { setUser(null); localStorage.removeItem('devsocial_user'); }} 
          toggleInspector={() => setShowInspector(!showInspector)}
          cardStyles={cardStyles} 
        />

        <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FeedContainer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            filteredPosts={filteredPosts}
            user={user}
            handleCreatePost={handleCreatePost}
            handleReact={handleReact}
            handleVote={handleVote}
            handleDeletePost={handleDeletePost}
            handleAddComment={handleAddComment}
            commentInputs={commentInputs}
            setCommentInputs={setCommentInputs}
            cardStyles={cardStyles}
          />

          <div className="hidden lg:block space-y-6">
            <LeaderboardCard topDevelopers={topDevelopers} cardStyles={cardStyles} />
          </div>
        </main>
      </div>

      <Footer totalPosts={posts.length} cardStyles={cardStyles} />

      {showInspector && (
        <ApiDevTools apiLogs={apiLogs} onClose={() => setShowInspector(false)} />
      )}
    </div>
  );
}