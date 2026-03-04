const { PrismaClient } = require('@prisma/client');

// In Prisma 5, you don't need datasourceUrl here 
// It automatically reads DATABASE_URL from your .env file
const prisma = new PrismaClient();

async function main() {
  console.log("Emptying database...");
  await prisma.user.deleteMany({}); 

  console.log("Seeding data...");
  
  // FIX: In Prisma, .create() only takes ONE object. 
  // To send an array, you MUST use .createMany()
  await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Kristan John", email: "kristan@example.com" },
      { name: "Emilie John", email: "emilie@example.com" }, // Fixed duplicate emails
      { name: "Sara John", email: "sara@example.com" },     // Fixed duplicate emails
    ],
    skipDuplicates: true, 
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
