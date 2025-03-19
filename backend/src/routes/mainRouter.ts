import { Router, Request, Response } from "express";
import multer from 'multer';
import { getAllUser } from "../services/user";
import { createPost, deletePost, getAllPosts, updatePost } from "../services/post";

interface MulterFile extends Express.Multer.File {}
export const mainRouter = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


mainRouter.get('/users', async (req, res)=>{
    const listUser = await getAllUser();
    res.json({listUser})
})

mainRouter.get('/posts', async (req, res)=>{
    const listPosts = await getAllPosts();
    res.json({listPosts})
})

mainRouter.post('/post/create',upload.single('imgUrl'), async (req: Request, res: Response)=>{

    if(!req.body.title || !req.body.content || !req.body.subtitle || !req.body.tags){
         res.status(400).json({error: 'Campos obrigatórios não preenchidos'})
    }

    try{
        const file = req.file as MulterFile;
        const imgUrl = file ? file.buffer : null;
        const {title, content, subtitle, tags} = req.body;

        const post = await createPost({title, content, subtitle, tags, imgUrl, author:{connect:{id: 1}}});

        res.json({ success: true, post });
    }
    catch(error){
         res.status(500).json({error: 'Error ao criar post'})
    }

})

mainRouter.put("/post/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, subtitle, tags, imgUrl } = req.body;

    if (!id) {
       res.status(400).json({ error: "Id não informado" });
    }

    try{
        const post = await updatePost(parseInt(id), {title, content, subtitle, tags, imgUrl, author:{connect:{id: 1}}});

        if (!post) {
           res.status(404).json({ error: "Post não encontrado" });
        }

        res.json({ success: true, message: "Post atualizado com sucesso", post });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar post" });
    }
})


mainRouter.delete("/post/delete/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
       res.status(400).json({ error: "Id não informado" });
    }
  
    try {
      const post = await deletePost(parseInt(id));
  
      if (!post) {
         res.status(404).json({ error: "Post não encontrado" });
      }
  
      res.json({ success: true, message: "Post deletado com sucesso", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar post" });
    }
  });
  

