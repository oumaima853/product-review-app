import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();




export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [products, reviews, users] = await Promise.all([
      prisma.product.findMany({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.review.findMany({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.user.findMany({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

    // 1. Generate an array of all last 30 date strings
    const chartData = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      chartData.push({
        date: dateLabel,
        products: 0,
        reviews: 0,
        users: 0,
      });
    }

    // 2. Fill the chartData with actual counts
    const fillData = (items, key) => {
      items.forEach((item) => {
        const dateLabel = new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dayEntry = chartData.find(d => d.date === dateLabel);
        if (dayEntry) {
          dayEntry[key]++;
        }
      });
    };

    fillData(products, 'products');
    fillData(reviews, 'reviews');
    fillData(users, 'users');

    return NextResponse.json(chartData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
