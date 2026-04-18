'use client';



import HomePageHeader from "@/app/home/_components/HomePageHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Footer from "@/app/home/_components/HomePageFooter";
import ScrollToTop from "@/app/home/_components/Scroll"

import HomePageContent from "@/app/home/_components/HomePageContent";
import { useState, useMemo, useEffect } from "react";


import { useSession } from "next-auth/react"; //  handle logged in users 
import {  CircularProgress, Typography, Stack } from '@mui/material';


import axios from "axios";




export const dynamic = 'force-dynamic';





const HomePage = () => {


  /* ======== My product ========= */
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all", "mine", or "favorites"



  useEffect(() => {
  const fetchData = async () => {
    let url = "/api/registred-users/manage-product"; // Default: All

    if (viewMode === "mine") {
      url = "/api/registred-users/manage-product?filter=mine";
    } else if (viewMode === "favorites") {

      if (session?.user?.id) {
        // CASE: Registered User -> Call Database API
        url = "/api/registred-users/my-favorite";
      } else {
        // CASE: Guest User -> Use LocalStorage
        const saved = localStorage.getItem("guest_favorites");
        const guestIds = saved ? JSON.parse(saved).map(id => Number(id)) : [];
        
        
        setProducts((prev) => prev.filter(p => guestIds.includes(Number(p.id))));
        return; 
      }
     



    }

    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchData();
}, [viewMode]); // Triggered whenever  tabs are switchs







  // lifting the state up
  const handleToggle = (value) => {
    setViewMode(value); 
  };


  







  const { data: session, status } = useSession();


  const [userType, setUserType] = useState('guest'); // 'guest', 'user', or 'admin'
  
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
        let result = [...products];
    
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
        products,
        searchTerm,
        
        categoryFilter,
       
      ]); 







      // 1. Show a loading state while checking the session
  if (status === "loading") {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: 'background.default' }} 
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={50} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary" fontWeight="medium">
          Loading session...
        </Typography>
      </Stack>
    </Box>
  );
}











  
  return (
   
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
        
        currentUser={currentUser}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        oncategoryFilterChange={setcategoryFilter}
        session = {session }
        status = {status }
        products = {products}
         />

        {/* MAIN PART */}
        <HomePageContent
         isGuest={isGuest}
        isRegisteredUser={isRegisteredUser}
        isAdmin={isAdmin}
        currentUser={currentUser}
        filteredData={filteredData}
        session = {session }
        status = {status }
       
        onToggle={handleToggle} 
        products = {products}
        viewMode={viewMode}

        />

        {/* FOOTER */}
        <Footer />
      </Container>

      <ScrollToTop/>
    </Box>
  );
};
export default HomePage;
