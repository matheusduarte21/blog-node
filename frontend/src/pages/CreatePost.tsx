import { toast } from 'react-toastify';
import { CreatePostForm } from '../components/CreatePostForm';
import { PostCreate } from '../services/Post';

export function CreatePost() {
  const handleCreatePost = async (formData: FormData) => {
     try{
        if(!formData){
          toast.error("Campos obrigatórios não preenchidos");
          return
        }

        const createNewPost = await PostCreate(formData);

        if(!createNewPost){
          toast.error("Erro na requisição");
          return;
        }

        toast.success("Post criado com sucesso");
        
     }catch(error){  
      toast.error("Erro na requisição:" + error);
     }
  };
  

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
      </h1>
      <CreatePostForm onSubmit={handleCreatePost} />
    </div>
  );
}