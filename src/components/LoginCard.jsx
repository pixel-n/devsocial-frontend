import React from 'react';

// Renders the dedicated authentication / landing screen
export default function LoginCard({ 
  emailInput, 
  setEmailInput, 
  nameInput, 
  setNameInput, 
  handleLogin, 
  themeStyles 
}) {
  return (
    <div className={`min-h-screen grid lg:grid-cols-2 ${themeStyles}`}>
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-2xl shadow-xl">
              DS
            </div>
            <span className="text-2xl font-extrabold tracking-tight">DevSocial Hub</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
            Connect, Collaborate & Scale Together.
          </h1>
          <p className="text-xl text-indigo-200/80 max-w-lg leading-relaxed">
            The premier full-stack capstone workspace built with React, Express, and MongoDB Atlas.
          </p>
        </div>
        <div className="relative z-10 text-sm text-indigo-300/60 font-medium">
          Capstone Full-Stack Project • 2026
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Sign In</h2>
            <p className="text-sm opacity-70 mt-1">Access persistent developer feed</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                Email Address
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="developer@example.com"
                className="w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                Your Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nawal"
                className="w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent text-sm transition"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition"
            >
              Enter Social Dashboard →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}