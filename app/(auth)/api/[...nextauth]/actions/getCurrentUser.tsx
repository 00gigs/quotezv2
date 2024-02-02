import prisma from "../../../../../lib/prismadb"
import getUserSession from "./getUserSession"


const getCurrentUser = async()=>{
    try {
     const session =    await getCurrentUser()
     if(!session?.user.email){
        return null
     }
     const currentUser:any = await prisma.user.findUnique({
        where:{
            email: session?.user?.email as string
        }
     })

     if(!currentUser){
        return null
     }
     return currentUser
    } catch (error:any) {
        return null
    }
}

export default getCurrentUser