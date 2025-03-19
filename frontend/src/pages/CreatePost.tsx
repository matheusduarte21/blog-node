import React from 'react';
import { CreatePostForm } from '../components/CreatePostForm';
import { NewPost } from '../types/blog';

export function CreatePost() {
  const handleCreatePost = (post: NewPost) => {
    // Here you'll integrate with your backend API
    console.log('Creating new post:', post);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <CreatePostForm onSubmit={handleCreatePost} />
    </div>
  );
}