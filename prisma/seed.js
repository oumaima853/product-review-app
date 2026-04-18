const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const pwd = await bcrypt.hash("password123", 10);

  // 1. SEED CATEGORIES 
  const categoriesData = [
    { name: 'Electronics' },
    { name: 'Home' },
    { name: 'Sports' }
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categories.push(created);
  }

  // 2. SEED USERS 
  const usersData = [
    { firstName: "Hans", lastName: "Müller", email: "admin@test.com", password: pwd, role: 'ADMIN', isApproved: true, position: "System Administrator", age: 30, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb47D3lU1CtxdSjO3z133VZxvtHITqew1tMg&s" },
    { firstName: "Petra", lastName: "Schmidt", email: "Petra@test.com", password: pwd, role: 'USER', isApproved: true, position: "Graphic Designer", age: 28, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6_1v9BHUenboGM-5dGAdk-fgIrCBEnXsbCw&s" },
    { firstName: "Wolfgang", lastName: "Schneider", email: "Wolfgang@test.com", password: pwd, role: 'USER', isApproved: true, position: "Marketing Specialist", age: 35, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfTkosk_XISYGUe8YAUWMrv0kcP5a4YMcVQ&s" },
    { firstName: "Leni", lastName: "Fischer", email: "Leni@test.com", password: pwd, role: 'USER', isApproved: false, position: "Software Intern", age: 22, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7UVPFRZb9YfxmguY66ZJCeTNczTyG0iIRPA&s" }
  ];

  const users = [];
  for (const user of usersData) {
    const created = await prisma.user.create({ data: user });
    users.push(created);
  }

  // 3. SEED PRODUCTS 
  const productsData = [
    {
      name: "Digital SLR Camera",
      description: "Professional grade camera for high-resolution photography and 4K video.",
      price: 850.00,
      img: "https://m.media-amazon.com/images/I/41tIllfKB-L._AC_SR290,290_.jpg",
      rate: 5.0, isVerified: true, categoryIdx: 0, userIdx: 1
    },
    {
      name: "Mechanical Keyboard",
      description: "Tactile feedback mechanical switches with durable build quality.",
      price: 95.00,
      img: "https://cdn.thewirecutter.com/wp-content/media/2025/12/BEST-MECHANICAL-KEYBOARDS-2048px-EVOWORKS-80-926.jpg?width=2048&quality=60&crop=2048:1365&auto=webp",
      rate: 4.5, isVerified: true, categoryIdx: 0, userIdx: 2
    },
    {
      name: "Ergonomic Office Chair",
      description: "Breathable mesh back with adjustable lumbar support for long working hours.",
      price: 210.00,
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9NtBsApM2tuT1qZlz8Ta_uJWxgZO5TzSfZ20wYO2R3bEY4l2RpCQr0BGr1jAueu6nzj3EzQQ1YMFpD-yktMGVO1sFhU_JNolak5zs_-h-qUwXj5FPomVDCpVQsIcdggJ16Nu2gvY&usqp=CAc",
      rate: 4.0, isVerified: false, verifiedProofImg: "https://i.etsystatic.com/53401536/r/il/3bc616/6229507036/il_300x300.6229507036_55bu.jpg",
      categoryIdx: 1, userIdx: 1
    },
    {
      name: "Smart Fitness Watch",
      description: "Track your steps, heart rate, and notifications on the go.",
      price: 199.00,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGi2Fn3jcEodvNbJgYtbKc2Gg2ALO1w1bTA&s",
      rate: 4.8, isVerified: true, categoryIdx: 0, userIdx: 0
    },
    {
      name: "Italian Moka Pot",
      description: "Traditional stovetop espresso maker for authentic coffee lovers.",
      price: 35.00,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRiUDO6a8RaP2rUFVberpaWXlFrQy4LDehHUAD4868PAReh_a_zvrR0P9mO_UjRLJKcHkepK_DC4IUbO8KEsyL1rbAKlPtCJlywGKJ5GoZy3U3QHuNqQ526lw&usqp=CAc",
      rate: 4.2, isVerified: true, categoryIdx: 1, userIdx: 2
    },
    {
      name: "Durable Mountain Bike",
      description: "Rugged frame and 21-speed system for off-road trail adventures.",
      price: 450.00,
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSstoJ37BU9oscz8OGZDk8Bwut0kOK5btz2yIHh6ISr4KJfiF1iJ9YV5Bmk4WBI4BarmVIacSFkaK35nsxeAiFM1tKiwInwXs5uLYLi29gv7icyz-rsmtv3l6sc1vuENNFKRIIsSg&usqp=CAc",
      rate: 4.0, isVerified: false, verifiedProofImg: "https://i.etsystatic.com/53401536/r/il/3bc616/6229507036/il_300x300.6229507036_55bu.jpg",
      categoryIdx: 2, userIdx: 3
    }
  ];

  const products = [];
  for (const p of productsData) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        img: p.img,
        rate: p.rate,
        isVerified: p.isVerified,
        verifiedProofImg: p.verifiedProofImg || null,
        categoryId: categories[p.categoryIdx].id,
        userId: users[p.userIdx].id
      }
    });
    products.push(created);
  }

 // 4. SEED REVIEWS 
const reviewsData = [
  // Reviews for Digital SLR Camera (pIdx: 0)
  { 
    description: "The 4K video quality is breathtaking. Perfect for my YouTube channel!", 
    rating: 5, status: "approved", pIdx: 0, uIdx: 2 
  },
  { 
    description: "Great entry-level professional camera. The lens kit is very versatile.", 
    rating: 4, status: "approved", pIdx: 0, uIdx: 3 
  },

  // Reviews for Mechanical Keyboard (pIdx: 1)
  { 
    description: "The tactile feel is exactly what I needed for coding. Highly recommend!", 
    rating: 5, status: "approved", pIdx: 1, uIdx: 0 
  },
  { 
    description: "Beautiful RGB lighting, but the keys are a bit loud for late-night work.", 
    rating: 4, status: "approved", pIdx: 1, uIdx: 3 
  },

  // Reviews for Ergonomic Office Chair (pIdx: 2)
  { 
    description: "Saved my lower back! The mesh is very breathable even in summer.", 
    rating: 5, status: "approved", pIdx: 2, uIdx: 2 
  },

  // Reviews for Smart Fitness Watch (pIdx: 3)
  { 
    description: "Battery life is decent, and the heart rate monitor seems very accurate.", 
    rating: 4, status: "approved", pIdx: 3, uIdx: 1 
  },

  // Reviews for Italian Moka Pot (pIdx: 4)
  { 
    description: "Makes much better coffee than my expensive electric machine. Classic design.", 
    rating: 5, status: "approved", pIdx: 4, uIdx: 0 
  },

  // Reviews for Durable Mountain Bike (pIdx: 5)
  { 
    description: "Took it on a trail last weekend. The gear shifts are smooth and the frame is solid.", 
    rating: 5, status: "approved", pIdx: 5, uIdx: 1 
  },
  { 
    description: "Good bike for the price, but I suggest replacing the seat for more comfort.", 
    rating: 3, status: "approved", pIdx: 5, uIdx: 2 
  }
];


for (const r of reviewsData) {
  await prisma.review.create({
    data: {
      description: r.description,
      rating: r.rating,
      status: r.status,
      productId: products[r.pIdx].id,
      userId: users[r.uIdx].id
    }
  });
}






  //  5. SEED FAVORITES 
  const favoritesData = [
    { uIdx: 1, pIdx: 3 },
    { uIdx: 1, pIdx: 0 }
  ];

  for (const f of favoritesData) {
    await prisma.favorite.create({
      data: {
        userId: users[f.uIdx].id,
        productId: products[f.pIdx].id
      }
    });
  }

  console.log('Seed completed successfully with static data!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
