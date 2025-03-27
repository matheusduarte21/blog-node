import  { useEffect, useState } from 'react';

import UserPosts from '../components/UserPosts';
import { currentUser } from '../services/User';
import { Link } from 'react-router-dom';

type User = {
  name: string;
  email: string;
};

export const Profile = () => {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    currentUser().then(setUser)
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">Manage your posts and profile information</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.freepik.com%2Fvetores-premium%2Filustracao-em-vetor-de-icone-de-perfil-de-usuario-masculino-padrao_34470155.htm&psig=AOvVaw2DDtZCCXHO-IeeHn_p7YCd&ust=1743007246413000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDJ1pHWpYwDFQAAAAAdAAAAABAJ"
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
          <Link to="/posts/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Create New Post
          </Link>
        </div>
        <UserPosts
        />
      </div>
    </div>
  );
}