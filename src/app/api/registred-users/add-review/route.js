import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";






const BANNED_WORDS = [
  // --- Offensive ---
  "badword1", "stupid", "idiot", "hate", "ugly", "trash", "garbage",
  
  // --- Spam ---
  "http", "https", ".com", ".net", ".org", "www.", "click here", "buy now", 
  "free money", "crypto", "bitcoin", "whatsapp", "contact me", "telegram",
  
  // --- Fake Review Signals ---
  "scam", "fake", "liar", "cheat", "refund me", "stolen",
  
  
];





 function containsBannedWords(text) {
  const lowerText = text.toLowerCase();
  // Returns true if any banned word is found in the text
  return BANNED_WORDS.some(word => {
    //  match the whole word only
    const regex = new RegExp(`\\b${word}\\b`, 'i'); 
    return regex.test(lowerText);
  });

}











export async function POST(req) {

    try {

              const session = await auth(); 
              if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

    const { content, rate, productId } = await req.json();

    // Check if content is suspicious
  const isSuspicious = containsBannedWords(content);


   const newReview = await prisma.review.create({
    data: {
      description: content,
      rating: Number(rate),
      productId: Number(productId),
      userId: Number(session.user.id), 
      
      status: isSuspicious ? "flagged" : "approved",
    },
  });

  return Response.json(newReview);

  



    }catch(error){
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message }, 
            { status: 500 } 
        );
    }






  

  

  

 
}
