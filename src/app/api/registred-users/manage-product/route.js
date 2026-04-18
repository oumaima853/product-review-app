



import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");

   
    let queryOptions = {
      include: {
        reviews: {
          include: {
            user: true, 
          },
        },
        creator: true, 
      },
    };

    if (filter === "mine") {
      if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      queryOptions.where = { userId: Number(session.user.id) };
    }

    const products = await prisma.product.findMany(queryOptions);
    return NextResponse.json(products);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


