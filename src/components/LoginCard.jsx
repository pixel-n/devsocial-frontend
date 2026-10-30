import React, { useState } from 'react';

function LoginCard({ currentUser, onLogin }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return alert('Please fill in both fields');
    onLogin({ name, email, avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}` });
  };

  if (currentUser) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center space-x-3">
          <img 
            src={currentUser?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 
            alt="Avatar" 
            className="w-12 h-12 rounded-full bg-slate-700" 
          />
          <div className="overflow-hidden">
            <h3 className="font-bold text-slate-100 truncate">{currentUser?.name}</h3>
            <p className="text-xs text-slate-400 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-xs text-indigo-400 font-medium">
          <span>Session Status</span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
            JWT Active
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-100">Sign In</h3>
        <p className="text-xs text-slate-400">Access persistent developer feed</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">NAME</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">EMAIL</label>
          <input 
            type="email" 
            placeholder="dev@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-xl text-xs transition-colors shadow-lg shadow-indigo-600/30"
        >
          Sign In / Register
        </button>
      </form>
    </div>
  );
}

export default LoginCard;