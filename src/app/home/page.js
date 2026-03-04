'use client';



import HomePageHeader from "@/app/home/_components/HomePageHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Footer from "@/app/home/_components/HomePageFooter";
import ScrollToTop from "@/app/home/_components/Scroll"

import HomePageContent from "@/app/home/_components/HomePageContent";
import { useState, useMemo } from "react";



const mockProduct = [
  {
    id: "1",
    name: "Book",
    price: 19.22,
    category:"Books",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.Lizards are a widespread group of squamate reptiles, with over 6,000 species, ",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=277&fit=crop",
    averageRating: 4.5,
    totalReviews: 8,
    ownerReview: {
      userName: "Alex Johnson",
      rating: 5,
      text: "Amazing book! Couldn't put it down. The characters are well-developed and the plot keeps you engaged.",
      date: "2 days ago",
      helpful: 12,
      verifiedPurchase: true,
    },
    reviews: [
      {
        id: "r1",
        
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r2",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r3",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r4",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r5",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r6",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r7",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r8",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r9",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r10",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r11",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r12",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r13",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r14",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r15",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r16",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r17",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r18",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r19",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r20",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r22",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r23",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
      {
        id: "r24",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r25",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
    ],
  },
  {
    id: "2",
    name: "Dress",
    category:"Clothes",
    price: 100.78,
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=277&fit=crop",
    averageRating: 4.5,
    totalReviews: 8,
    ownerReview: {
      userName: "Alex Johnson",
      rating: 5,
      text: "Amazing book! Couldn't put it down. The characters are well-developed and the plot keeps you engaged.",
      date: "2 days ago",
      helpful: 12,
      verifiedPurchase: true,
    },
    reviews: [
      {
        id: "r1",
        userName: "Sarah Miller",
        rating: 4,
        text: "Good book overall, but the ending was a bit predictable.",
        date: "1 week ago",
        helpful: 5,
        verifiedPurchase: true,
      },
      {
        id: "r2",
        userName: "Mike Chen",
        rating: 4.5,
        text: "Enjoyed reading it during my vacation. Well written!",
        date: "3 days ago",
        helpful: 3,
        verifiedPurchase: false,
      },
    ],
  },
  
];



const HomePage = () => {

   // Test states 
  const [userType, setUserType] = useState('user'); // 'guest', 'user', or 'admin'
  
  // Create user object based on selected type
  const currentUser = 
    userType === 'guest' ? null :
    userType === 'user' ? { id: '1', name: 'John', role: 'user' } :
    { id: '2', name: 'Admin', role: 'admin' };
  
  const isGuest = !currentUser;
  const isRegisteredUser = currentUser?.role === 'user';
  const isAdmin = currentUser?.role === 'admin';


   // search state
    const [searchTerm, setSearchTerm] = useState("");

      // category state
      const [categoryFilter, setcategoryFilter] = useState("all");





      //  FILTER function
      const filteredData = useMemo(() => {
        let result = [...mockProduct];
    
        // search filter
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          result = result.filter((p) => p.name.toLowerCase().includes(term));
        }
    
       
    
        // category filter
        if (categoryFilter !== "all") {
          result = result.filter((p) => {
            return p.category.toLowerCase() === categoryFilter.toLowerCase();
          });
        }
    
       
        return result;
      }, [
        mockProduct,
        searchTerm,
        
        categoryFilter,
       
      ]); 
  
  return (
    /* main box */
    <Box
      sx={{
        bgcolor: "background.paper",
        py: "5px",
      }}
    >
      <Container
        maxWidth={false} 
        disableGutters 
        sx={{
          "&.MuiContainer-root": {
            px: 5 
          },
        }}
      >
        {/* HEADER */}
        <HomePageHeader
         isGuest={isGuest}
        isRegisteredUser={isRegisteredUser}
        isAdmin={isAdmin}
        currentUser={currentUser}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        oncategoryFilterChange={setcategoryFilter}
         />

        {/* MAIN PART */}
        <HomePageContent
         isGuest={isGuest}
        isRegisteredUser={isRegisteredUser}
        isAdmin={isAdmin}
        currentUser={currentUser}
        filteredData={filteredData}
        />

        {/* FOOTER */}
        <Footer />
      </Container>

      <ScrollToTop/>
    </Box>
  );
};
export default HomePage;
