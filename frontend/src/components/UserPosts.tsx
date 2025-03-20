import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { DeletePost, PostList } from '../services/Post.ts';
import { Post } from  '../types/blog.ts';

export const UserPosts = () => {

  const [allPosts, setAllPosts] = useState<Post[]>([]);
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostList();
        setAllPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [allPosts.length]); 

  const onEdit = (post: Post) => {
    console.log('Editing post:', post);
  };

  const onDelete = async (postId: string) => {
    try{
      const response = await DeletePost(postId);
      setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== Number(postId)));
    }
    catch(error){
      console.error('Error deleting post')
    }
  };

  return (
    <div className="space-y-6">
      {allPosts.map((allposts) => (
        <div key={allposts.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{allposts.title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(allposts)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onDelete(allposts.id.toString())}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
          {allposts.tags.split(", ").map((tag:string, index: number) => (
              <span
              key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-4">{allposts.subtitle}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Published: {new Date(allposts.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;