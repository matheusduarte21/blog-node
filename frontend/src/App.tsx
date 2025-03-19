import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { FeaturedPost } from './components/FeaturedPost';
import { PostCard } from './components/PostCard';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { Post } from './types/blog';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React and TypeScript',
    excerpt: 'Learn how to leverage the power of React and TypeScript to build scalable web applications with modern best practices.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    },
    publishedAt: 'March 15, 2024',
    readTime: 8,
    tags: ['React', 'TypeScript', 'Web Development'],
  },
  {
    id: '2',
    title: 'The Complete Guide to Tailwind CSS',
    excerpt: 'Master the art of utility-first CSS with Tailwind and create beautiful, responsive designs efficiently.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    },
    publishedAt: 'March 14, 2024',
    readTime: 10,
    tags: ['CSS', 'Tailwind', 'Design'],
  },
  {
    id: '3',
    title: 'Node.js Best Practices for 2024',
    excerpt: 'Discover the latest best practices and patterns for building robust Node.js applications in 2024.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1000',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    },
    publishedAt: 'March 13, 2024',
    readTime: 12,
    tags: ['Node.js', 'Backend', 'JavaScript'],
  },
];

function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FeaturedPost post={MOCK_POSTS[0]} />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {MOCK_POSTS.slice(1).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/posts" element={<Profile />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="/categories" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;