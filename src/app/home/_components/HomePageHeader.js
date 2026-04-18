'use client';



import * as React from "react";

import HeroSection from "@/app/home/_components/HeroSection";

import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";



import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";


import { useColorScheme } from "@mui/material/styles";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import Avatar from '@mui/material/Avatar';

import HomePageHeaederPart1 from "./HomePageHeaederPart1";

import { useRouter } from 'next/navigation';

// handle logout 
import { signOut } from "next-auth/react";







const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  border: "1px solid #777",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  minWidth: "300px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));








const HomePageHeader = ({
  
  searchTerm, 
  onSearchChange,
   products,
  session,
  status,
}) => {




 

  const router = useRouter();
  
 
 


 

  const { mode } = useColorScheme(); 

 



 const handleLogout = async () => {
    //  Trigger SignOut
    await signOut({ 
      callbackUrl: "/home", // Redirect to home after logout
      redirect: true 
    });

    showSnackbar("You have been logged out", "info");
  };


















  return (
    <Box >
      
      {/* part 1 */}

      <HomePageHeaederPart1/>
     

      {/* part 2 */}
      <Box
        sx={{
          my: 1,

          py: 1,
          px: 10,
          bgcolor:
            mode === "dark" ? "rgba(5, 5, 5, 1)" : "rgba(240, 245, 244, 1)",
          borderBottom: 1,
          borderTop: 1,
          borderColor: "divider",
          borderRadius: 2,
         
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&.MuiContainer-root": { px: 6 },
            
          }}
        >
          <Stack alignItems={"center"}>
            <QuestionAnswerTwoToneIcon color="primary" />
            <Typography variant="body2" sx={{ ml: "5px" }}>
              Social Commerce
            </Typography>
          </Stack>

          <Search
            sx={{
              borderRadius: "22px",
              display: "flex",
              justifyContent: "space-between",
              borderColor: "divider",

              boxShadow: 1,
              "&:hover": {
                boxShadow: 2,
                borderColor: "primary.main",
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <div >
            



            </div>
          </Search>

          <Stack direction={"row"} textAlign={"center"}>
            
            {status ==="unauthenticated" && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    mx: 1,
                    textTransform: "capitalize",
                    fontSize: "14px",
                  }}
                  startIcon={<LoginOutlinedIcon />}

                   onClick={() => {
                router.push("/home/login");
              }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    backgroundColor: "primary.main",
                  }}

                  onClick={() => {
                router.push("/home/register");
              }}
                >
                  Register
                </Button>
              </>
            )}

            {status ==="authenticated" && (
             <>
    <Box 
    sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 1.5,
      padding: "4px 8px",
      borderRadius: "24px",
      transition: "0.3s",
      "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } 
    }}>
      <Avatar 
        alt={`${session?.user.firstName}  `} 
        src={`${session?.user.img}  `}
        sx={{ width: 45, height: 45, border: "1px solid #ddd" }} 
      />
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600, 
          color: "text.primary",
          letterSpacing: "0.5px"
        }}
      >
        
        {`${session?.user.firstName}  ${session?.user.lastName}`}
      </Typography>

       <Button
      variant="outlined" 
      color="info" 
      sx={{
        height: "42px",
        borderRadius: "18px",
        px: 2,
        mx: 1,
        textTransform: "none", 
        fontSize: "13px",
        fontWeight: 500,
        "&:hover": {
          borderColor: "error.main",
          bgcolor: "rgba(211, 47, 47, 0.04)"
        }
      }}
      startIcon={<LogoutOutlinedIcon sx={{ fontSize: 18 }} />}
      onClick= {handleLogout}
    >
      Logout
    </Button>


    </Box>

   
  </>
            )}
          </Stack>
        </Container>
      </Box>

      {/*hero section */}
      { status ==="unauthenticated" && (
      <HeroSection
      
      products={products}
       />
      )}
    </Box>
  );
};
export default HomePageHeader;
