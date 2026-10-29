import React from 'react';
import FeedHeader from './FeedHeader';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';

// Main content container housing search filters, creation form, and post stream
export default function FeedContainer({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  filteredPosts,
  user,
  handleCreatePost,
  handleReact,
  handleVote,
  handleDeletePost,
  handleAddComment,
  commentInputs,
  setCommentInputs,
  cardStyles
}) {
  return (
    <div className="lg:col-span-3 space-y-6">
      {/* Category and Search Filter */}
      <FeedHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        categoryFilter={categoryFilter} 
        setCategoryFilter={setCategoryFilter} 
        cardStyles={cardStyles} 
      />

      {/* Post & Poll Creation Form */}
      <CreatePostCard onSubmit={handleCreatePost} cardStyles={cardStyles} />

      {/* Dynamic Posts Stream */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={user}
            onReact={handleReact}
            onVote={handleVote}
            onDelete={handleDeletePost}
            onAddComment={handleAddComment}
            commentText={commentInputs[post._id]}
            setCommentText={(val) => setCommentInputs({ ...commentInputs, [post._id]: val })}
            cardStyles={cardStyles}
          />
        ))}
      </div>
    </div>
  );
}