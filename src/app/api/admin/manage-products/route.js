import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();











export async function PATCH(request) {
  
  try {
    const { id } = await request.json();

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.product.update({
      where: { id: Number(id) },
      data: {  isVerified: true },
    });
    return NextResponse.json({ message: "Product Approved!" });
  } catch (error) {
    return NextResponse.json({ error: "Approval failed" }, { status: 400 });
  }
}




export async function DELETE(request) {
  try {
   
    const body = await request.json();
    const { id } = body;

    // 2. Validate the ID exists
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    // 3. Perform the delete
    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: body });

  } catch (error) {
    
    console.error("DELETE API Error:", error);

    return NextResponse.json(
      { error: "Deletion failed", details: error.message }, 
      { status: 400 }
    );
  }
}
