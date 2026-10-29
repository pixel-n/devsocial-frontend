import React from 'react';

// Footer specifications panel displaying active Atlas telemetry & Capstone Roadmap criteria
export default function Footer({ totalPosts, cardStyles }) {
  return (
    <footer className={`mt-16 border-t backdrop-blur-xl transition-all ${cardStyles}`}>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Overview */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                DS
              </div>
              <span className="font-extrabold text-base tracking-tight">DevSocial Hub</span>
            </div>
            <p className="text-xs opacity-60 leading-relaxed">
              Complete real-world capstone social application combining routing, authentication, global state management, REST APIs, and performance optimization.
            </p>
          </div>

          {/* Expanded Roadmap & Core Capabilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Roadmap Features</h4>
            <ul className="text-xs space-y-1.5 opacity-80 font-medium">
              <li className="flex items-center gap-1.5"><span>⚡</span> Multi-Reactions (🔥, 💡, 🚀)</li>
              <li className="flex items-center gap-1.5"><span>📊</span> Community Polling & Votes</li>
              <li className="flex items-center gap-1.5"><span>🏆</span> Live Leaderboard Sidebar</li>
              <li className="flex items-center gap-1.5"><span>🎨</span> Dynamic Themes & API DevTools</li>
              <li className="flex items-center gap-1.5"><span>🔐</span> Auth Session & Persistent State</li>
              <li className="flex items-center gap-1.5"><span>🚀</span> Combined API & Optimized Performance</li>
            </ul>
          </div>

          {/* Architecture Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tech Architecture</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
              <span className="px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">React 18</span>
              <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">MongoDB Atlas</span>
              <span className="px-2 py-1 rounded-lg bg-gray-500/10 text-gray-300 border border-gray-500/20">Express.js</span>
              <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">Node.js</span>
              <span className="px-2 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">Tailwind CSS</span>
            </div>
          </div>

          {/* Live Mongo Telemetry */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Cluster Telemetry</h4>
            <div className="p-3 rounded-2xl border border-indigo-500/20 bg-black/20 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="opacity-60">MongoDB Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">Active Database:</span>
                <span className="font-semibold text-indigo-300">myDatabase</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">Synced Documents:</span>
                <span className="font-bold text-rose-400">{totalPosts} Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Subtitle */}
        <div className="pt-6 border-t border-gray-700/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-60 font-medium">
          <div>
            Powered by <strong className="text-indigo-400">React, Tailwind CSS, Express & MongoDB Atlas</strong>
          </div>
          <div>
            © 2026 DevSocial Capstone Project • Designed & Developed by <strong className="text-indigo-400">Nawal</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}