import React from 'react';

function ApiDevTools({ telemetry = [] }) {
  // Ensure telemetry is always a safe array
  const safeTelemetry = telemetry || [];

  return (
    <div className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">API DevTools Telemetry</span>
          <span className="text-slate-500">({safeTelemetry.length} requests logged)</span>
        </div>

        <div className="w-full sm:w-auto overflow-x-auto max-h-24">
          <div className="flex space-x-2">
            {safeTelemetry.length > 0 ? (
              safeTelemetry.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-900 border border-slate-800 px-2 py-1 rounded flex items-center space-x-2 whitespace-nowrap"
                >
                  <span className={`font-bold ${item.status < 400 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.method}
                  </span>
                  <span className="text-slate-300">{item.endpoint}</span>
                  <span className="text-slate-500 text-[10px]">{item.timestamp}</span>
                </div>
              ))
            ) : (
              <span className="text-slate-600 italic">No API requests logged yet...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiDevTools;