import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        rate: true,
        isVerified:true,
        verifiedProofImg: true,
        price:true,
        createdAt: true,
        
        creator: {
          select: {
            firstName: true,
            lastName: true,
          },
        }, 
        
        category: {
          select: {
            id: true,
            name: true,
          },
          
        }, 
        
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { error: "failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
