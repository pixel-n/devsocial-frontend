import React from 'react';

// Renders the top search input and category filter buttons
export default function FeedHeader({ 
  searchQuery, 
  setSearchQuery, 
  categoryFilter, 
  setCategoryFilter, 
  cardStyles 
}) {
  const categories = ['All', 'General', 'React', 'NodeJS', 'Database', 'Showcase'];

  return (
    <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-center gap-3 ${cardStyles}`}>
      {/* Search Bar */}
      <div className="flex items-center gap-2 flex-1 w-full px-3 py-2 rounded-2xl border bg-black/10">
        <span>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search feed by keyword or author..."
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === cat ? 'bg-indigo-600 text-white shadow' : 'opacity-70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}