import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma"
import { updatePost } from './post';

export const getAllUser = async ()=>{
    const users = prisma.user.findMany()
    return users;
}

export const createUser = async ({name, email, password}: Prisma.UserCreateInput)=>{
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    })
    return user;
}

export const findUniqueUser = async (email: string)=>{
    const user = await prisma.user.findUnique({where:{email}})
    return user;
}

export const findUniqueUserById = async (id: string)=>{
    return await prisma.user.findUnique({
        where: {id: parseInt(id)},
        select:{
            id: true,
            name: true,
            email: true,
        }
    })
}
