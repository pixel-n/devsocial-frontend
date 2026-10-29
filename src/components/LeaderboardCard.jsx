import React from 'react';

// Renders top developer leaderboard calculated dynamically from post telemetry
export default function LeaderboardCard({ topDevelopers, cardStyles }) {
  return (
    <div className={`p-6 rounded-3xl border sticky top-24 ${cardStyles}`}>
      <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-indigo-400">
        🏆 Top Developers
      </h3>
      <div className="space-y-3">
        {topDevelopers.length === 0 ? (
          <p className="text-xs opacity-50">No activity recorded yet.</p>
        ) : (
          topDevelopers.map(([author, score], index) => (
            <div key={author} className="flex items-center justify-between p-3 rounded-2xl border border-gray-700/20 bg-black/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-400">#{index + 1}</span>
                <span className="font-bold">{author}</span>
              </div>
              <span className="px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">{score} pts</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}