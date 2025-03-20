import React, { useState } from 'react';

interface CreatePostFormProps {
  onSubmit: (formdata: FormData) => void;
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | string>('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", excerpt);
    formData.append("content", content);
    formData.append("tags", tags);

    if (coverImage) {
      formData.append("imgUrl", coverImage); 
    }

    onSubmit(formData);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Titulo
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label  className="block text-sm font-medium text-gray-700">
          Subtitulo
        </label>
        <input
          type="text"
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label  className="block text-sm font-medium text-gray-700">
          Contéudo do Post
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Escolha a sua imagem
        </label>
        <input
          type="file"
          id="coverImage"
          accept="*/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setCoverImage(file);
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
      
        />
      </div>

      <div>
        <label  className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="React, TypeScript, Web Development"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Criar Post
      </button>
    </form>
  );
}