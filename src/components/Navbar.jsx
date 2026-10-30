import React from 'react';

function Navbar({ currentUser, onLogout }) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 text-white font-bold h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-xl">
            DS
          </div>
          <div>
            <span className="font-extrabold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevSocial Pro
            </span>
            <span className="block text-xs text-slate-400">MERN Capstone Ecosystem</span>
          </div>
        </div>

        {/* User Info / Auth Status */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-700">
              <img 
                src={currentUser?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full bg-slate-700" 
              />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-200 leading-none">
                  {currentUser?.name}
                </p>
                <span className="text-xs text-indigo-400 font-medium">Verified Dev</span>
              </div>
              <button 
                onClick={onLogout}
                className="ml-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border border-red-500/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800">
              Guest Session (Login via sidebar)
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;