import React from 'react';

function Navbar({ currentUser, onLogout, theme, setTheme }) {
  return (
    <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-md transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-extrabold h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-lg">
            DS
          </div>
          <div>
            <h1 className="font-extrabold text-base bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevSocial Pro
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">MERN Capstone</p>
          </div>
        </div>

        {/* Actions (Theme Switcher & User Info) */}
        <div className="flex items-center space-x-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              theme === 'dark' 
                ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>

          {/* User Profile Info & Logout */}
          {currentUser && (
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-700/50">
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-tight truncate">{currentUser.name}</p>
                <span className="text-[10px] text-emerald-400 font-medium">Verified Dev</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;