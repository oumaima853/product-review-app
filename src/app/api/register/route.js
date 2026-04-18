import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
 
      

       try {

        const body = await request.json();
        
    const newUser = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcrypt.hash(body.password, 10), 
        age: Number(body.age),
        position: body.position || "",
        img: body.img || "", 
        role : "USER",
        isApproved: false,
      }
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {



     console.error("PRISMA ERROR:", error);

    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "This email is already registered. Please login or use another email." }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again." }, 
      { status: 500 }
    );
    






  }
}
