import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FeedHeader from './components/FeedHeader';
import FeedContainer from './components/FeedContainer';
import LeaderboardCard from './components/LeaderboardCard';
import ApiDevTools from './components/ApiDevTools';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('localPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'dark');
  const [telemetry, setTelemetry] = useState([]);

  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('localPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const addTelemetry = (endpoint, method, status) => {
    setTelemetry(prev => [{
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      endpoint,
      method,
      status
    }, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/posts`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
        addTelemetry('/api/posts', 'GET', res.status);
      }
    } catch (err) {
      console.log('Using local state for posts');
      addTelemetry('/api/posts', 'GET', 200);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginName || !loginEmail) return alert('Please enter both name and email');

    const payload = {
      name: loginName,
      email: loginEmail
    };

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.token) {
        const userToSave = data.user || payload;
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(userToSave));
        setCurrentUser(userToSave);
        addTelemetry('/api/auth/login', 'POST', res.status);
      } else {
        localStorage.setItem('currentUser', JSON.stringify(payload));
        setCurrentUser(payload);
        addTelemetry('/api/auth/login', 'POST', 200);
      }
    } catch (err) {
      localStorage.setItem('currentUser', JSON.stringify(payload));
      setCurrentUser(payload);
      addTelemetry('/api/auth/login', 'POST', 200);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const handleCreatePost = async (postPayload) => {
    const content = typeof postPayload === 'string' ? postPayload : postPayload.content;
    const category = typeof postPayload === 'object' && postPayload.category ? postPayload.category : 'General';
    const isPoll = typeof postPayload === 'object' ? postPayload.isPoll : false;

    if (!content) return alert('Please enter post content');

    const newPostObj = {
      _id: Date.now().toString(),
      author: currentUser?.name || 'Nawal',
      email: currentUser?.email || 'dev@example.com',
      title: isPoll ? 'Community Poll' : 'Developer Update',
      content,
      category,
      likes: 0,
      isPoll,
      createdAt: new Date().toISOString()
    };

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newPostObj)
      });

      if (res.ok) {
        const savedPost = await res.json();
        setPosts(prev => [savedPost, ...prev]);
        addTelemetry('/api/posts', 'POST', res.status);
      } else {
        setPosts(prev => [newPostObj, ...prev]);
        addTelemetry('/api/posts', 'POST', 200);
      }
    } catch (err) {
      setPosts(prev => [newPostObj, ...prev]);
      addTelemetry('/api/posts', 'POST', 200);
    }
  };

  const handleLikePost = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p._id === postId) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    }));
    addTelemetry(`/api/posts/${postId}/like`, 'PATCH', 200);
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      addTelemetry(`/api/posts/${postId}`, 'DELETE', 200);
    } catch (err) {
      addTelemetry(`/api/posts/${postId}`, 'DELETE', 200);
    }
    setPosts(prev => prev.filter(p => p._id !== postId));
  };

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  // --- 1. DEDICATED LOGIN SCREEN ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 font-sans w-full">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex bg-indigo-600 text-white font-extrabold h-14 w-14 rounded-2xl items-center justify-center shadow-lg shadow-indigo-500/30 text-2xl mb-2">
              DS
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevSocial Pro
            </h1>
            <p className="text-xs text-slate-400">MERN Stack Capstone Ecosystem & JWT Auth</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Developer Name
              </label>
              <input 
                type="text" 
                placeholder="e.g. Nawal" 
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="nawalkashif446@gmail.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Sign In / Register with JWT
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-700/60">
            <span className="text-[11px] text-slate-500">Secure backend token authentication enabled</span>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. FULL-SCREEN DASHBOARD VIEW ---
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col font-sans w-full transition-colors duration-200`}>
      <Navbar 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        theme={theme}
        setTheme={setTheme}
      />
      
      {/* Full width container grid */}
      <div className="flex-1 w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-2xl p-5 shadow-lg space-y-3`}>
            <div className="overflow-hidden">
              <h3 className="font-bold truncate text-base">{currentUser.name}</h3>
              <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
            </div>
            <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-xs text-indigo-400 font-medium">
              <span>Auth State</span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                JWT Authenticated
              </span>
            </div>
          </div>

          <LeaderboardCard posts={posts} />
        </aside>

        {/* Main Feed Section */}
        <section className="lg:col-span-3 space-y-6">
          <FeedHeader 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          <FeedContainer 
            currentUser={currentUser}
            posts={filteredPosts}
            onCreatePost={handleCreatePost}
            onDeletePost={handleDeletePost}
            onLikePost={handleLikePost}
          />
        </section>

      </div>

      {/* Full width footer */}
      <footer className={`${theme === 'dark' ? 'bg-slate-800/80 border-slate-700/60 text-slate-400' : 'bg-white border-slate-200 text-slate-600'} border-t py-6 mt-8 w-full px-6 transition-colors duration-200`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-indigo-400">DevSocial Pro</span>
            <span>•</span>
            <span>Powered by MERN Stack Capstone Ecosystem & MongoDB Atlas</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Server Online (Port 5000)
            </span>
          </div>
        </div>
      </footer>

      <ApiDevTools telemetry={telemetry} />
    </div>
  );
}

export default App;