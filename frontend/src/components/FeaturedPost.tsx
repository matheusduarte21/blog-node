import React from 'react';
import { Clock } from 'lucide-react';
import { Post } from '../types/blog';

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="lg:flex">
        <div className="lg:w-1/2">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-64 w-full object-cover lg:h-full"
          />
        </div>
        <div className="lg:w-1/2 p-8">
          <div className="flex items-center space-x-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.publishedAt}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}