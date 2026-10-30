import React from 'react';
import PostCard from './PostCard';
import CreatePostCard from './CreatePostCard';

function FeedContainer({ currentUser, posts = [], onCreatePost, onDeletePost }) {
  // Ensure posts is always treated as a safe array
  const safePosts = posts || [];

  return (
    <div className="space-y-6">
      {/* Create Post Widget */}
      {currentUser && <CreatePostCard onCreatePost={onCreatePost} currentUser={currentUser} />}

      {/* Feed Posts List */}
      <div className="space-y-4">
        {safePosts.length > 0 ? (
          safePosts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              currentUser={currentUser} 
              onDeletePost={onDeletePost} 
            />
          ))
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">
            <p className="text-sm font-medium">No posts found in this category yet.</p>
            <p className="text-xs text-slate-500 mt-1">Be the first developer to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedContainer;