import React from 'react';

function LeaderboardCard({ users = [] }) {
  // Fallback to empty array if users is undefined
  const safeUsers = users || [];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-lg">
      <h3 className="text-base font-bold text-slate-200 mb-3 flex items-center justify-between">
        <span>🏆 Top Contributors</span>
        <span className="text-xs text-indigo-400 font-medium">{safeUsers.length} Devs</span>
      </h3>
      
      <div className="space-y-3">
        {safeUsers.length > 0 ? (
          safeUsers.map((user, index) => (
            <div key={user._id || index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 w-4">#{index + 1}</span>
                <img 
                  src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'} 
                  alt="Avatar" 
                  className="w-7 h-7 rounded-full bg-slate-700" 
                />
                <span className="text-sm font-medium text-slate-300 truncate max-w-[120px]">
                  {user.name}
                </span>
              </div>
              <span className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                {user.score || 0} pts
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 text-center py-2">No leaderboard data yet.</p>
        )}
      </div>
    </div>
  );
}

export default LeaderboardCard;