
import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    
const userId = Number(session.user.id);

const [reviews, totalCount] = await prisma.$transaction([
  prisma.review.findMany({
    where: { userId : Number(session.user.id) },
    include: { product: true }, 
    
  }),
  prisma.review.count({
    where: { userId : Number(session.user.id)  }
  })
]);

return NextResponse.json({ reviews, totalCount });



    
   




    
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



