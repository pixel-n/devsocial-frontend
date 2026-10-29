import React from 'react';

// Floating Inspector displaying live backend REST endpoint activity logs
export default function ApiDevTools({ apiLogs, onClose }) {
  return (
    <div className="fixed bottom-4 right-4 w-96 p-4 rounded-3xl border border-indigo-500/30 bg-black/90 text-white backdrop-blur-xl shadow-2xl z-50">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live MongoDB API Logs
        </span>
        <button onClick={onClose} className="text-xs opacity-50 hover:opacity-100">✕</button>
      </div>
      <div className="space-y-1.5 font-mono text-[10px] max-h-48 overflow-y-auto">
        {apiLogs.map(log => (
          <div key={log.id} className="p-2 rounded-xl bg-gray-900 border border-gray-800 flex justify-between">
            <span className="text-indigo-300">{log.method} {log.endpoint}</span>
            <span className="text-emerald-400">{log.status} ({log.time})</span>
          </div>
        ))}
      </div>
    </div>
  );
}