
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){

    try{

        const users = await prisma.user.findMany(
            {where : {isApproved : false},
            select : {
               
                 id: true,
        firstName: true,
        lastName: true,
        email: true,
        age: true,
        position: true,
        createdAt: true,
            }
        }
            
        );

        return NextResponse.json(users);


    } catch(error){
        return NextResponse.json({error :"failed to fetch users"} , {status:500});
    }
}