import NextAuth from 'next-auth'
import authOptions from '../app/(auth)/api/[...nextauth]/route.tsx'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
