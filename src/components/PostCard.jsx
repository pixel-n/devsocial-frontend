import React from 'react';

export default function PostCard({ 
  post, 
  currentUser, 
  onReact, 
  onVote, 
  onDelete, 
  onAddComment, 
  commentText, 
  setCommentText, 
  cardStyles 
}) {
  return (
    <div className={`p-6 rounded-3xl border transition-all hover:border-indigo-500/40 shadow-xl ${cardStyles}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-base shadow-md">
            {post.author ? post.author.charAt(0).toUpperCase() : 'D'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{post.author}</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {post.category || 'General'}
              </span>
            </div>
            <span className="text-xs opacity-50">
              {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {post.author === currentUser.name && (
          <button 
            onClick={() => onDelete(post._id)} 
            className="text-xs opacity-60 hover:opacity-100 text-rose-500 font-bold px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition"
          >
            🗑️ Delete
          </button>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-4 opacity-95 whitespace-pre-wrap">{post.content}</p>

      {/* Poll Section */}
      {post.isPoll && (
        <div className="mb-5 p-4 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-purple-400">📊 {post.pollQuestion}</h4>
          <div className="space-y-2 pt-1">
            {post.pollOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onVote(post._id, idx)}
                className="w-full flex justify-between items-center px-4 py-2.5 rounded-xl border border-purple-500/20 bg-black/20 text-xs font-bold hover:bg-purple-600/20 transition"
              >
                <span>{opt.text}</span>
                <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300">{opt.votes} votes</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Multi-Reactions Bar */}
      <div className="flex flex-wrap items-center gap-2 border-t pt-4 border-gray-700/20">
        <button 
          onClick={() => onReact(post._id, 'fire')} 
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 hover:scale-105 transition"
        >
          🔥 {post.reactions?.fire || 0}
        </button>
        <button 
          onClick={() => onReact(post._id, 'insightful')} 
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 hover:scale-105 transition"
        >
          💡 {post.reactions?.insightful || 0}
        </button>
        <button 
          onClick={() => onReact(post._id, 'shipped')} 
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:scale-105 transition"
        >
          🚀 {post.reactions?.shipped || 0}
        </button>
        <span className="ml-auto text-xs opacity-50 font-medium">
          💬 {post.comments ? post.comments.length : 0} Comments
        </span>
      </div>

      {/* Comments List */}
      <div className="mt-4 border-t pt-4 border-gray-700/20 space-y-3">
        {post.comments && post.comments.map((comment, idx) => (
          <div key={idx} className="text-xs p-3 rounded-2xl border border-gray-700/20 flex flex-col gap-1 bg-black/20">
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-400">{comment.author}</span>
              <span className="text-[10px] opacity-40">{new Date(comment.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <span className="opacity-90">{comment.text}</span>
          </div>
        ))}
        
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={commentText || ''}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a constructive comment..."
            className="flex-1 text-xs px-4 py-3 rounded-xl border border-gray-700/30 bg-black/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button 
            onClick={() => onAddComment(post._id)} 
            className="px-5 py-3 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md transition active:scale-95"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}