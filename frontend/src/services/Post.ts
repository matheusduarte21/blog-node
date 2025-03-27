
export const PostCreate = async (formData: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/post/create", {
        method: "POST",
        body: formData,
        credentials: "include", 
      });
  
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
};

export const PostList = async () => {
    try {
        const response = await fetch("http://localhost:3000/posts/my-posts",{
            method: "GET",
            credentials: 'include'
        });

        if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}

export const DeletePost = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/post/delete/${id}`, {
        method: "DELETE",
        credentials: 'include'
        });
    
        if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
}
  