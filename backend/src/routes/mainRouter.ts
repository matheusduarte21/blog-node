import { Router, Request, Response, NextFunction } from "express";
import multer from 'multer';
import { createUser, findUniqueUser, findUniqueUserById, getAllUser } from "../services/user";
import { createPost, deletePost, getUserPosts, updatePost } from "../services/post";
import { authenticate } from "../middlewares/middlewares";
import { AuthenticatedRequest } from "../types/express";
import cookieParser from "cookie-parser";
import express from 'express';
import session from "express-session";

interface MulterFile extends Express.Multer.File {}

export const mainRouter = Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const storage = multer.memoryStorage();
const JWT_SECRET = process.env.JWT_SECRET
const upload = multer({ storage });


mainRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findUniqueUser(email);

    if (!user) {
         res.status(400).json({ error: 'Usuário não encontrado' });
         return
    }

    const validePassword = await bcrypt.compare(password, user!.password);

    if (!validePassword) {
         res.status(400).json({ error: 'Senha incorreta' });
         return
    }

    const token = jwt.sign({id: user!.id}, JWT_SECRET, {expiresIn: '1h'});

    res.cookie("token", token,{
        httpOnly: true, 
        secure: false,
        sameSite: 'lax',
        maxAge:60 * 60 * 1000
    })

    res.json({ user, token }); 
});

mainRouter.get('/me', authenticate, async (req, res)=>{
    try {
        const user = await findUniqueUserById(req.userId);

        if (!user) {
           res.status(404).json({ error: "Usuário não encontrado" });
           return
        }
    
        res.json({ id: user.id, email: user.email, name: user.name });
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário" });
      }
})


mainRouter.post('/user/create', authenticate, async (req, res)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name,
        email,
        password: hashedPassword
    })

    res.json({user});
})

mainRouter.get('/posts/my-posts', authenticate, async (req, res)=>{
    try{
      if(!req.userId){
        res.status(400).json({error: 'Usuário não autenticado'});
        return;
    }

    const posts = await getUserPosts(req.userId);
    res.json(posts)
    }
    catch(error){
      res.status(500).json({error: 'Erro ao buscar posts'});
    }
})

mainRouter.post('/post/create', authenticate, upload.single('imgUrl'), async (req: Request, res: Response) => {
    
    if (!req.body.title || !req.body.content || !req.body.subtitle || !req.body.tags) {
        res.status(400).json({ error: 'Campos obrigatórios não preenchidos' }); 
        return; 
    }

    try {
        const file = req.file as MulterFile;
        const imgUrl = file ? new Uint8Array(file.buffer) : new Uint8Array();
        const { title, content, subtitle, tags } = req.body;

        if (!req.userId || typeof req.userId !== 'number') {
            res.status(400).json({ error: 'Usuário não autenticado ou ID inválido' });
            return;
        }

        const newPost = await createPost(req.userId, { title, content, subtitle, tags, imgUrl });

        res.json({ success: true, newPost }); 
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar post' }); 
    }
});

// mainRouter.put("/posts/:id", authenticate, async (req: Request, res: Response): Promise<void> => {
//     try {
//         const postId = Number(req.params.id);
//         const userId = Number(req.params.id);
//         const { title, content, subtitle, tags, imgUrl } = req.body;

//         if (!userId || typeof userId !== 'number') {
//             res.status(400).json({ error: 'Usuário não autenticado ou ID inválido' });
//             return;
//         }

//         const updatedPost = await updatePost(postId, req.userId, {
//             title,
//             content,
//             subtitle,
//             tags,
//             imgUrl
//         });

//         if (!updatedPost) {
//             res.status(403).json({ error: "Você não tem permissão para editar este post." });
//             return;
//         }

//         res.json(updatedPost);

//     } catch (error) {
//         console.error("Erro ao atualizar post:", error);
//         res.status(500).json({ error: "Erro interno do servidor" });
//     }
// });



mainRouter.delete('/post/delete/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
          res.status(400).json({ error: "ID inválido" });
          return;
      }

      if (!req.userId) {
          res.status(401).json({ error: "Usuário não autenticado" });
          return;
      }

      await deletePost(req.userId, postId);
      res.json({ success: true, message: "Post deletado com sucesso" });
  } catch (error) {
      res.status(500).json({ error });
  }
});

  

