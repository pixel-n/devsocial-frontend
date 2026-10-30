import React, { useState } from 'react';

function CreatePostCard({ currentUser, onCreatePost }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    onCreatePost({
      content,
      category,
      title: 'Developer Update'
    });

    setContent('');
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <span>🚀</span> Share Update or Poll
        </h2>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-900 text-xs border border-slate-700 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none"
        >
          <option value="General">General</option>
          <option value="React">React</option>
          <option value="NodeJS">NodeJS</option>
          <option value="Database">Database</option>
          <option value="Showcase">Showcase</option>
        </select>
      </div>

      <textarea
        rows="3"
        placeholder="What are you building today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
      />

      <div className="flex justify-between items-center pt-2">
        <span className="text-[11px] text-slate-500">Synced with MongoDB Atlas</span>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-lg transition-all"
        >
          Publish Post 🚀
        </button>
      </div>
    </div>
  );
}

export default CreatePostCard;