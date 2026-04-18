'use client';



import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import StarRateIcon from "@mui/icons-material/StarRate";

import gathering from "@/images/gathering.jpg";
import guessing from "@/images/guessing.jpg";


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

import { Pagination } from "swiper/modules";

import Image from 'next/image';


const HeroSection = ({products}) => {

  




  




  return (
    
 <Box
  sx={{
          bgcolor: "background.paper",
          py: 1,
          px:10,
          
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderBottom: 1,
          borderColor: "divider",
          boxShadow: "0px 2px 8px #686363ff",
          
        
        }}
 >

 <Container
      maxWidth={false} 
      disableGutters 
      sx={{
        "&.MuiContainer-root": {
          px: 5 
        },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",

        gap: 1, 
        minHeight: { xs: "350px", md: "400px" }, 
        py: 0, 
        my: 0, 
        
      }}
    >



      {/* Part 1: Swiper */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.7 },
          width: "100%",
          height: { xs: "300px", md: "400px" },
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          mx: 0, 
          my: 0, 
        }}
      >
      
        <Swiper
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{
            height: "100%",
            width: "100%",
          }}
        >



         {products.slice(0, 5).map((product) => ( 
  <SwiperSlide key={product.id}>
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={product.img || "/placeholder-product.jpg"} 
        alt={product.name}
        
        style={{
           width: "100%",     
    height: "100%",     
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
        
      />

      {/* Review Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(to top, rgba(75, 74, 74, 0.8) 0%, transparent 50%)",
        }}
      >
        <Paper
          sx={{
            p: 3,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "12px",
            maxWidth: "80%",
          }}
        >
          {/* Product Rating */}
          <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
            {[...Array(5)].map((_, i) => (
              <StarRateIcon
                key={i}
                sx={{ 
                  color: i < Math.floor(product.rate) ? "#FFB800" : "#ccc", 
                  fontSize: "20px" 
                }}
              />
            ))}
          </Box>

          {/* Dynamic Product Name */}
          <Typography variant="h6" fontWeight="bold" color="#212120ff" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          {/* Dynamic Product Description */}
          <Typography variant="body2" color="#2e2e2eff" sx={{ mb: 2 }}>
            {product.description.length > 150 
              ? `${product.description.substring(0, 150)}...` 
              : product.description}
          </Typography>

          {/* Dynamic Creator Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={product.creator?.img || ""} 
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography fontWeight="bold" color="#2e2e2eff" variant="body2">
                {product.creator?.firstName} {product.creator?.lastName}
              </Typography>
              <Typography variant="caption" color="#2e2e2eff">
                {product.creator?.position || "Verified Buyer"} • Added {new Date(product.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  </SwiperSlide>
))}






        </Swiper>
      </Box>


















      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          } ,
          flex: { md: 0.3 },
          flexDirection: "column",
          gap: 1, 
          width: "100%",
          height: { md: "400px" },
          justifyContent: "space-between",
          mx: 0, 
          my: 0, 
        }}
      >
        
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            height: "48%",
            flexShrink: 0,
          }}
        >
          <Image
            src={gathering}
            alt="Verified Purchases"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(73, 71, 71, 0.3) 0%, transparent 50%, rgba(127, 124, 124, 0.3) 55%)",
              zIndex: 1,
            }}
          />
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "8%",
              transform: "translateY(-50%)",
              zIndex: 2,
              maxWidth: "80%", 
            }}
          >
            <Typography
              variant="body1" 
              sx={{
                color: "#e1e3e8ff",
                fontWeight: "bold",
                lineHeight: 1.2,

                mb: 0.25, 
                textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
                fontSize: "1rem", 
              }}
            >
              Verified Purchases
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#e1e3e8ff",
                fontWeight: 500,
                letterSpacing: "0.3px", 
                textTransform: "uppercase",
                textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              Community Reviews
            </Typography>
            
          </Stack>
        </Box>

       
       
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            height: "48%",
            flexShrink: 0,
          }}
        >
          <Image
            src={guessing}
            alt="No More Guessing"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(134, 122, 122, 0.3) 0%, transparent 50%, rgba(127, 124, 124, 0.3) 55%)",
              zIndex: 1,
            }}
          />
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "8%",
              transform: "translateY(-50%)",
              zIndex: 2,
              maxWidth: "80%",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#1A202C",
                fontWeight: "bold",
                lineHeight: 1.2,
                mb: 0.25,
                textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
                fontSize: "1rem",
              }}
            >
              No More Guessing
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#2a2c30ff",
                fontWeight: 500,
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              See Actual Customer Joy
            </Typography>
            
          </Stack>
        </Box>
      </Box>
    </Container>
 </Box>
   
  );
};
export default HeroSection;
