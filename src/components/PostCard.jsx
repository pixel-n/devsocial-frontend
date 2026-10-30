import React, { useState } from 'react';

function PostCard({ post, currentUser, onDeletePost }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post?.comments || []);
  const [reactions, setReactions] = useState(post?.reactions || { fire: 0, insightful: 0, shipped: 0 });

  const handleReaction = (type) => {
    setReactions(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      text: commentText,
      author: currentUser?.name || 'Anonymous Dev',
      createdAt: new Date()
    };
    setComments(prev => [...prev, newComment]);
    setCommentText('');
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg space-y-4">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
            {post?.author ? post.author.charAt(0).toUpperCase() : 'D'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200">{post?.author || 'Developer'}</h4>
            <span className="text-xs text-slate-400">
              {post?.createdAt ? new Date(post.createdAt).toLocaleTimeString() : 'Just now'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-slate-900 text-indigo-400 px-2.5 py-1 rounded-full border border-slate-700 font-medium">
            {post?.category || 'General'}
          </span>
          {currentUser && post?.author === currentUser?.name && (
            <button 
              onClick={() => onDeletePost(post._id)}
              className="text-slate-500 hover:text-red-400 text-xs px-2 py-1 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
        {post?.content}
      </p>

      {/* Reactions Bar */}
      <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/60">
        <button 
          onClick={() => handleReaction('fire')}
          className="bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center space-x-1"
        >
          <span>🔥</span>
          <span>{reactions.fire || 0}</span>
        </button>
        <button 
          onClick={() => handleReaction('insightful')}
          className="bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center space-x-1"
        >
          <span>💡</span>
          <span>{reactions.insightful || 0}</span>
        </button>
        <button 
          onClick={() => handleReaction('shipped')}
          className="bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center space-x-1"
        >
          <span>🚀</span>
          <span>{reactions.shipped || 0}</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="space-y-3 pt-2">
        <div className="space-y-2">
          {comments.map((c, i) => (
            <div key={i} className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/40 text-xs">
              <span className="font-bold text-indigo-400 mr-2">{c.author}:</span>
              <span className="text-slate-300">{c.text}</span>
            </div>
          ))}
        </div>

        {currentUser ? (
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              Reply
            </button>
          </form>
        ) : (
          <p className="text-[11px] text-slate-500 italic">Login via sidebar to join the discussion.</p>
        )}
      </div>
    </div>
  );
}

export default PostCard;