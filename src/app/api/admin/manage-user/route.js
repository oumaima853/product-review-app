import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// accept
export async function PATCH(request) {
  const { id } = await request.json();
  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: { isApproved: true },
    });
    return NextResponse.json({ message: "User Approved!" });
  } catch (error) {
    return NextResponse.json({ error: "Approval failed" }, { status: 400 });
  }
}




// reject


export async function DELETE(request) {
  try {
    
    const body = await request.json();
    const { id } = body;

    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    
    await prisma.user.delete({
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
