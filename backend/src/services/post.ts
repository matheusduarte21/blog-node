import { prisma } from '../libs/prisma';
import { Prisma } from "@prisma/client";

export const createPost = async ({title, content, subtitle, tags, imgUrl, author }:Prisma.PostCreateInput ) =>{

  try{
    const postCreate = await prisma.post.create({
      data:{
        createdAt: new Date(),
        title,
        content,
        subtitle,
        tags,
        imgUrl,
        author
      }
    })

    return postCreate;
  }
  catch(error){
    return false;
  }
}

export const getAllPosts = async () => {
  try{
    const post = await prisma.post.findMany()
    return post;
  }
  catch(error){
    return false;
  }
}

export const updatePost = async (id: number, {title, content, subtitle, tags, imgUrl, author }:Prisma.PostCreateInput ) => {
  const post = await prisma.post.update({
    where: {
      id
    },
    data: {
      title,
      content,
      subtitle,
      tags,
      imgUrl,
      author
    }
  })
  return post;
}

export const deletePost = async (id: number) => {
    const post = await prisma.post.delete({
      where:{
        id
      }
    })
    return post;
};