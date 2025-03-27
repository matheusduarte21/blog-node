import { prisma } from '../libs/prisma';
import { Prisma } from "@prisma/client";

export const createPost = async (
  userId: number,
  { title, content, subtitle, tags, imgUrl }: Omit<Prisma.PostCreateInput, "author"> 
) => {
  try {
    const postCreate = await prisma.post.create({
      data: {
        createdAt: new Date(),
        title,
        content,
        subtitle,
        tags,
        imgUrl,
        author: {
          connect: { id: userId }, 
        }
      }
    });

    return postCreate;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return false;
  }
};

export const getUserPosts = async (userId: number) => {
  try{

    if(!userId){
      return false;
    }

    const post = await prisma.post.findMany({
      where:{
        userId: userId,
      },
      orderBy:{
        createdAt: 'desc'
      }
    })
    return post;
  }
  catch(error){
    return false;
  }
}

export const updatePost = async (
  postId: number,
  userId: number, 
  { title, content, subtitle, tags, imgUrl }: Omit<Prisma.PostCreateInput, "author">
) => {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true }
    });

    if (!existingPost || existingPost.userId !== userId) {
      throw new Error("Você não tem permissão para editar este post.");
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        subtitle,
        tags,
        imgUrl
      }
    });

    return updatedPost;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return false;
  }
};

export const deletePost = async (userId: number, postId: number) => {
  try {
  
      const post = await prisma.post.findUnique({
          where: { id: postId }
      });

      if (!post) {
          throw new Error("Post não encontrado");
      }

      if (post.userId !== userId) {
          throw new Error("Você não tem permissão para excluir este post");
      }

      // Se for o dono, deletamos o post
      return await prisma.post.delete({
          where: { id: postId }
      });

  } catch (error) {
      console.error("Erro ao deletar post:", error);
      throw new Error('');
  }
};