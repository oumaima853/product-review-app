import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.product.findMany({
      where: {
        favoritedBy: {
          some: {
            userId: Number(session.user.id) 
          }
        }
      },
      
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
