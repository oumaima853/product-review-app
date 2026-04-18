import { auth } from "@/auth";
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
       const session = await auth(); 
        if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
    const body = await request.json();
    const { 
      name, description, price, img, rate, 
       verifiedProofImg, categoryId,  
    } = body;

    if (!name || !price || !categoryId ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        img : img || "",
        rate: parseFloat(rate) || 0,
        isVerified: verifiedProofImg? false : true , // if proof img exsists then isVerified must be false so that admin could verify it !!!
        verifiedProofImg : verifiedProofImg || "",
        categoryId: parseInt(categoryId),
        userId: Number(session.user.id), 
      },
    });

    

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    
    
  console.error("DEBUG PRISMA ERROR:", error.message); 
  return NextResponse.json({ error: error.message }, { status: 400 });

  }
}


