import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const count = await prisma.user.count({
    where: { isApproved: false },
  });
  return NextResponse.json({ count });
}
