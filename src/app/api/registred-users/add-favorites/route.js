
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productIds } = await req.json();
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ message: "Nothing to sync" });
    }

    const userId = Number(session.user.id);

    
    const favoritesData = productIds.map(id => ({
      userId: userId,
      productId: Number(id)
    }));

    await prisma.favorite.createMany({
      data: favoritesData,
      skipDuplicates: true, 
    });

    return NextResponse.json({ message: "Favorites synced successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
