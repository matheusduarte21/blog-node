import React from 'react';
import { Post } from '../types/blog';
import { Pencil, Trash2 } from 'lucide-react';

interface UserPostsProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export function UserPosts({ posts, onEdit, onDelete }: UserPostsProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(post)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Published: {post.publishedAt}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      ))}
    </div>
  );
}