import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 lg:hidden">
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center space-x-8 ml-8">
              <Link to="/" className="text-gray-900 hover:text-gray-600">Home</Link>
              <Link to="/articles" className="text-gray-500 hover:text-gray-900">Articles</Link>
              <Link to="/categories" className="text-gray-500 hover:text-gray-900">Categories</Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900">About</Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search articles..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center relative">
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <User size={24} />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </button>
                <button
                  onClick={() => handleNavigation('/profile/posts')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Posts
                </button>
                <button
                  onClick={() => handleNavigation('/posts/new')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Create Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}