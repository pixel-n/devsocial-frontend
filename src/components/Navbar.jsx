import React from 'react';

// Application Header with theme toggle, API inspector trigger, and user session
export default function Navbar({ user, theme, setTheme, onLogout, toggleInspector, cardStyles }) {
  return (
    <nav className={`sticky top-0 z-50 px-8 py-4 border-b backdrop-blur-xl flex justify-between items-center transition-all ${cardStyles}`}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30 animate-pulse">
          DS
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            DevSocial Pro
          </h1>
          <p className="text-[10px] opacity-60 font-semibold tracking-wider uppercase">
            Capstone
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle API Inspector Panel */}
        <button 
          onClick={toggleInspector}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>API DevTools</span>
        </button>

        {/* Current Active User Display */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-700/30 bg-black/20 text-xs font-semibold">
          <span className="text-indigo-400">👤 {user.name}</span>
        </div>

        {/* Dynamic Theme Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-gray-700/40 bg-black/20">
          <button onClick={() => setTheme('light')} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${theme === 'light' ? 'bg-indigo-600 text-white shadow' : 'opacity-60'}`}>☀️</button>
          <button onClick={() => setTheme('dark')} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${theme === 'dark' ? 'bg-indigo-600 text-white shadow' : 'opacity-60'}`}>🌙</button>
          <button onClick={() => setTheme('midnight')} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${theme === 'midnight' ? 'bg-emerald-600 text-white shadow' : 'opacity-60'}`}>🌲</button>
        </div>

        {/* Logout Trigger */}
        <button 
          onClick={onLogout} 
          className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl shadow-lg shadow-rose-600/20 transition active:scale-95"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}