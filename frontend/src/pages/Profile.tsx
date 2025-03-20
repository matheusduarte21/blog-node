import React, { useEffect, useState } from 'react';
import { DeletePost, PostList } from '../services/Post.ts';
import UserPosts from '../components/UserPosts';
import { Post } from  '../types/blog.ts';

// const USER_POSTS: Post[] = [
//   {
//     id: '1',
//     title: 'Building Modern Web Applications with React and TypeScript',
//     excerpt: 'Learn how to leverage the power of React and TypeScript to build scalable web applications with modern best practices.',
//     content: '',
//     coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
//     author: {
//       name: 'John Doe',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
//     },
//     publishedAt: 'March 15, 2024',
//     readTime: 8,
//     tags: ['React', 'TypeScript', 'Web Development'],
//   },
//   // Add more mock posts as needed
// ];

export const Profile = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">Manage your posts and profile information</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
          <a
            href="/posts/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </a>
        </div>
        <UserPosts
        />
      </div>
    </div>
  );
}