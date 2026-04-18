import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
   
    const [productCount, userCount, reviewCount] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
      prisma.review.count(),
    ]);

    // Format data for Nivo Pie Chart
    const chartData = [
      { id: "products", label: "Products", value: productCount, color: "hsl(156, 70%, 50%)" },
      { id: "users", label: "Users", value: userCount, color: "hsl(338, 70%, 50%)" },
      { id: "reviews", label: "Reviews", value: reviewCount, color: "hsl(72, 70%, 50%)" },
    ];

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Pie Chart API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

