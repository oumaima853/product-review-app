import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request){

    try{
        
        const body = await request.json();

        
        const {email, password} = body ;

        
        const user = await prisma.user.findUnique({where: {email:email}});
        if(!user) {
            
                  return NextResponse.json({ error: "Invalid email or password" }, { status: 401});
        }

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
             return NextResponse.json({ error: "Invalid email or password" }, { status: 401});
        }

           const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ 
      message: "Login successful", 
      user: userWithoutPassword 
    }, { status: 200 });



    } catch(error){
         console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  

    }
}