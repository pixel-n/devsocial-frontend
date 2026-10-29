import React, { useState } from 'react';

export default function CreatePostCard({ onSubmit, cardStyles }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isPoll, setIsPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handleAddOption = () => {
    if (pollOptions.length < 4) setPollOptions([...pollOptions, '']);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content,
      category,
      isPoll,
      pollQuestion: isPoll ? pollQuestion : '',
      pollOptions: isPoll ? pollOptions.filter(opt => opt.trim() !== '') : []
    });

    setContent('');
    setIsPoll(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-6 rounded-3xl border transition-all ${cardStyles}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-extrabold tracking-tight flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm">✍️</span> Share Update or Poll
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPoll(!isPoll)}
            className={`text-xs px-3 py-1.5 rounded-xl font-bold transition border ${isPoll ? 'bg-purple-600 text-white border-purple-500' : 'bg-black/20 border-indigo-500/30 text-indigo-300'}`}
          >
            📊 {isPoll ? 'Switch to Post' : 'Create Poll'}
          </button>

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-black/20 font-semibold focus:outline-none"
          >
            <option value="General">💬 General</option>
            <option value="React">⚛️ React</option>
            <option value="NodeJS">🟢 NodeJS</option>
            <option value="Database">🗄️ Database</option>
            <option value="Showcase">🚀 Showcase</option>
          </select>
        </div>
      </div>

      <textarea
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={isPoll ? "Write context for your community poll..." : "What architectural breakthrough or bug did you conquer today?"}
        className="w-full p-4 rounded-2xl border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black/10 text-sm resize-none transition mb-4"
      />

      {isPoll && (
        <div className="space-y-3 mb-4 p-4 rounded-2xl border border-purple-500/30 bg-purple-500/5">
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Ask a technical question (e.g. Vite vs Webpack?)"
            className="w-full px-3 py-2 text-xs rounded-xl border bg-black/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {pollOptions.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="w-full px-3 py-2 text-xs rounded-xl border bg-black/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
          {pollOptions.length < 4 && (
            <button type="button" onClick={handleAddOption} className="text-xs text-purple-400 font-bold hover:underline">
              + Add Option
            </button>
          )}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-xs opacity-50 font-medium">Synced with MongoDB Atlas</span>
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-sm rounded-2xl shadow-lg transition transform active:scale-95"
        >
          {isPoll ? 'Publish Poll 📊' : 'Publish Post 🚀'}
        </button>
      </div>
    </form>
  );
}