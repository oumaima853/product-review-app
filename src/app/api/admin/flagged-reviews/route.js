import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){

    try{

        const reviews = await prisma.review.findMany(
            {where : {status : "flagged"},
            select: { 
        id: true,
        description: true,
        rating: true,
        createdAt: true,
      
        product: {
          select: {
            name: true, 
            id: true
          }
        },
      
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
        
        
        }
        );

        return NextResponse.json(reviews);



    } catch(error){
        return NextResponse.json({ error : "Internal Server Error", details : error.message},{status : 500})
    }





}
