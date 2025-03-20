import { CreatePostForm } from '../components/CreatePostForm';
import { PostCreate } from '../services/Post';

export function CreatePost() {
  const handleCreatePost = async (formData: FormData) => {
      const response = await PostCreate(formData);
  };
  

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
      <CreatePostForm onSubmit={handleCreatePost} />
    </div>
  );
}