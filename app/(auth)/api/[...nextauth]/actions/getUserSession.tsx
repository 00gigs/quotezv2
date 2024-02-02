import { getServerSession } from "next-auth/next"
import { authOptions } from "../route"
import { NextRequest, NextResponse } from "next/server"

export default async function getUserSession(req:NextRequest, res:NextResponse) {
 return await getServerSession(authOptions)

}