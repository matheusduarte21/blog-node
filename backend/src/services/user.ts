import { prisma } from "../libs/prisma"

export const getAllUser = async ()=>{
    const users = prisma.user.findMany()
    return users;
}