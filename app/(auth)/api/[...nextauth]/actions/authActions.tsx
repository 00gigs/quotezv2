'use server'
import prisma from "../../../../../lib/prismadb"
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcrypt'


export async function CreateNewUser (formdata:FormData){
try {
    const email = formdata.get('email') as string
    const name = formdata.get('name') as string
    const password = formdata.get('password') as string

    try {
        const existingUser = await prisma?.user.findUnique({
            where:{email},
        })

        if(existingUser){
           throw new Error('It looks like you are member already !') 
        }
        const hashedPassword =  await bcrypt.hash(password,12)

        await prisma.user.create({
            data:{
               email:email,
               name:name,
               hasedPAswword:hashedPassword
               
            }
        })


        revalidatePath('/')
    } catch (existingUser) {
        return {existingUser:'you  are already a member'}
    }
} catch (error) {
    console.error(error)
}
}