
import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
  const session = await auth();
  const { productId } = await req.json();

  const existing = await prisma.favorite.findFirst({
    where: { userId: Number(session.user.id), productId: Number(productId) }
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ action: 'removed' });
  } else {
    await prisma.favorite.create({
      data: { userId: Number(session.user.id), productId: Number(productId) }
    });
    return NextResponse.json({ action: 'added' });
  }
}


export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(session.user.id) },
      select: { productId: true } 
    });

    
    return NextResponse.json(favorites);
  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
