import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(
    request: Request
) {
    try{
        const body = await request.json()

    const {email,name,password} = body

    if(!email || !name || !password){
        return new NextResponse('Missing info', {status:400})
    }

    const hashedPassword = bcrypt.hashSync(password,10)

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user) {
        return NextResponse.json({
            error: 'User already exists',
            status:400
        })
    }

    console.log(email,password,name)
    const userCreated = await prisma.user.create({
        data: {
            email,
            password:hashedPassword,
            name
        }
    })


    return NextResponse.json(userCreated)
    }
    catch(e) {
        console.log(e)
        return NextResponse.json({
            error: 'Something went wrong',
            status:400
        })
    }
}
