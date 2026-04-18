'use client';




import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { useState , useEffect} from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import Rating from "@mui/material/Rating";



import Badge from "@mui/material/Badge";

import IconButton from "@mui/material/IconButton";

import Pagination from "@mui/material/Pagination";
import ExpandableDescription from "@/app/home/_components/ExpandableDescription ";

import AddIcon from "@mui/icons-material/Add";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import AddProductDialog from "@/app/home/_components/AddProductDialog";
import ReviewModal from "@/app/home/_components/ReviewModal";
import MyReviewDialog from "@/app/home/_components/MyReviewDialog";

import {Paper} from "@mui/material";

import axios from "axios";






function averageRating(product) {
  if (!product.reviews || product.reviews.length === 0) return 0;

  const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / product.reviews.length; 

 
  return average;
}






const HomePageContent = ({
 
  filteredData,
  session,
  status,
  onToggle,
  products,
  viewMode
}) => {


 
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

 
  const [openReviews, setOpenReviews] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const product = filteredData || []; //[] to prevent the app from crashing if data is still loading 

  const handleOpenReviews = (product) => {
    
    setSelectedProduct(product); // Store which product was clicked

    setOpenReviews(true); 
  };

  const handleCloseReviews = () => {
    setSelectedProduct(null); // Clear product selection when closing, to accept new one
    setOpenReviews(false);
  };

  /*pagination state */
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; 

  // Calculate which cards to show
  const startIndex = (page - 1) * itemsPerPage;
  const selectedCards = product.slice(startIndex, startIndex + itemsPerPage);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

 /*add product state */
const [openProductDialog, setOpenProductDialog] = useState(false);

  const handleClickOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
  };






  /* ======= favorite   ======== */

const [favorite, setFavorite]= useState([]);

useEffect(() => {
  const savedFavorites = localStorage.getItem("guest_favorites");
  if (savedFavorites) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorite(JSON.parse(savedFavorites));
  }
}, []);

async function toggleFavorite(ProductId) {

   // CASE 1: registred user
  if (session?.user?.id) {
    try {
      const response = await axios.post('/api/registred-users/favorites', { productId :ProductId });
      
      if (response.data.action === 'added') {
        setFavorite((prev) => [...prev, Number(ProductId)]);
      } else {
        setFavorite((prev) => prev.filter((id) => id !== Number(ProductId)));
      }
    } catch (error) {
      console.error("Failed to update database favorite", error);
    }
    return;
  }





 // CASE 2: GUEST (LocalStorage)
  setFavorite((prev) => {
    const isFavorited = prev.includes(ProductId);
    const updated = isFavorited 
      ? prev.filter((id) => id !== ProductId) 
      : [...prev, ProductId];
    
    localStorage.setItem("guest_favorites", JSON.stringify(updated));
    return updated;
  });



}




useEffect(() => {
  const handleAuthChange = async () => {
    if (session?.user?.id) {
      // check  sync data
      const guestFavs = localStorage.getItem("guest_favorites");
      if (guestFavs) {
        const productIds = JSON.parse(guestFavs);
        if (productIds.length > 0) {
          await axios.post('/api/user/favorites/sync', { productIds });
          localStorage.removeItem("guest_favorites");
        }
      }

      const response = await axios.get('/api/registred-users/favorites');
      
      const dbIds = response.data.map((fav) => Number(fav.productId));
      setFavorite(dbIds); 
    } else {
      // Guest Logic
      const saved = localStorage.getItem("guest_favorites");
       if (saved) {
        
        const parsed = JSON.parse(saved).map(id => Number(id));
        setFavorite(parsed);
      }
    }
  };

  handleAuthChange();
}, [session]); // Triggered whenever user logs in or out















/* ====== For my reviews  ====== */

const [userReviews, setUserReviews] = useState([]);
const [totalCount, setTotalCount] = useState(0);

/*myReview state */

const [openReviewDialog, setOpenReviewDialog]= useState(false);

const handleClickReviewDialog= async ()=>{
    setOpenReviewDialog(true);
     try {
    const response = await axios.get('/api/registred-users/reviews');
    setUserReviews(response.data.reviews);
    setTotalCount(response.data.totalCount);
  } catch (error) {
    console.error("Failed to fetch reviews", error);
  }





}


const handleCloseReviewDialog=()=>{
    setOpenReviewDialog(false);
}











  return (
    <Box sx={{  m: 3 }}>
      <Container>
        {/*part 1 */}
        <Stack
          direction={"row"}
          textAlign={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={1}
        >
          <Box>
            <Typography variant="h6">   Product Discovery  </Typography>
            <Typography variant="body1" fontWeight={200} >
              Your gateway to finding and sharing the market’s best.
            </Typography>
          </Box>

          { status ==="unauthenticated"  && (
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              className="action-menu"
              sx={{
                gap: 1,
                flexWrap: "wrap", 
                border: "none", 
                "& .MuiToggleButton-root": {
                  border: "1px solid transparent",
                  borderRadius: "8px !important",
                  textTransform: "capitalize",
                  px: 2,
                  py: 1,
                  mt: 2,
                  color: "text.main",
                  
                  "&.Mui-selected": {
                    border: "1px solid rgba(13, 108, 240, 0.68) !important",
                    color: "#407bb9ff",
                    backgroundColor: "initial",
                    "&:hover": {
                      backgroundColor: "rgba(13, 108, 240, 0.04)", 
                    },
                  },
                },
              }}
            >
              <ToggleButton 
              onClick={() => onToggle("all")}
              value="all"
              >
                <AllInboxIcon sx={{ mr: 1, fontSize: "20px" }} /> All Products
              </ToggleButton>


              

              <ToggleButton 
              value="my-favorites"
              onClick={() => onToggle("favorites")}

              
              >
                <FavoriteOutlinedIcon sx={{ mr: 1, fontSize: "20px" }} /> My Favorites
                 <Badge
                    badgeContent={favorite.length}
                    color="error"
                    sx={{ ml: 2 }}
                    fontSize="large"
                    slotProps={{
                      badge: {
                        sx: {
                          fontSize: "10px",
                          height: "17px",
                          minWidth: "13px",
                        },
                      },
                    }}
                  ></Badge>


              </ToggleButton>

            </ToggleButtonGroup>
          )}

          {status ==="authenticated"  && (
            <div className="action-menu">
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                className="action-menu"
                sx={{
                  gap: 1, 
                  flexWrap: "wrap",
                  border: "none",
                  "& .MuiToggleButton-root": {
                    border: "1px solid transparent",
                    borderRadius: "8px !important",
                    textTransform: "capitalize",
                    px: 2,
                    py: 1,
                    mt: 2,
                    color: "text.main",
                   
                    "&.Mui-selected": {
                      border: "1px solid rgba(13, 108, 240, 0.68) !important",
                      color: "primary.main",
                      backgroundColor: "initial",
                      "&:hover": {
                        backgroundColor: "rgba(13, 108, 240, 0.04)", 
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="add" onClick={handleClickOpenProductDialog}>
                  <AddIcon sx={{ mr: 1, fontSize: "20px" }} /> Add Product
                </ToggleButton>

                <ToggleButton 
                value="all"
                onClick={() => onToggle("all")}
                >
                  <AllInboxIcon sx={{ mr: 1, fontSize: "20px" }} /> All Products
                </ToggleButton>

                <ToggleButton 
                value="my-products"
                onClick={() => onToggle("mine")}
                >
                  <InventoryIcon sx={{ mr: 1, fontSize: "20px" }} /> My Products
                </ToggleButton>

                <ToggleButton value="reviews" onClick={handleClickReviewDialog}>
                  <RateReviewIcon sx={{ mr: 1, fontSize: "20px" }}  /> My Reviews
                </ToggleButton>

                <ToggleButton
                 value="favorites"
                 onClick={() => onToggle("favorites")}

                 >
                  My Favorites
                  <Badge
                    badgeContent={favorite.length}
                    color="error"
                    sx={{ ml: 2 }}
                    fontSize="large"
                    slotProps={{
                      badge: {
                        sx: {
                          fontSize: "10px",
                          height: "17px",
                          minWidth: "13px",
                        },
                      },
                    }}
                  ></Badge>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          )}
        </Stack>








{/* Empty State case */}
{products.length === 0 && (
  <Paper
    elevation={0}
    sx={{
      p: 6,
      textAlign: 'center',
      bgcolor: 'background.paper',
      border: '2px dashed',
      borderColor: 'divider',
      borderRadius: 4,
      my: 4
    }}
  >
    

    <Typography variant="h6" fontWeight="bold" color="error.main" gutterBottom>
      {viewMode === "favorites" ? "No favorites yet" : "No products found"}
    </Typography>

    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      {viewMode === "favorites" 
        ? "Products you heart will appear here so you can find them later."
        : viewMode === "mine"
        ? "You haven't uploaded any products yet. Start sharing your experiences!"
        : "We couldn't find any products matching your current filters."
      }
    </Typography>

   
  </Paper>
)}




















        {/*part 2 Product Cards*/}
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {selectedCards.map((item) => (
            <div key={item.id} id={`product-${item.id}`}>

              <Card
              
              sx={{
                maxWidth: 333,
                mt: 6,
                
                ":hover .MuiCardMedia-root": {
                  scale: "1.1",
                  transition: "0.35s",
                  rotate: "1deg",
                },
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="277"
                image={item.img}
              />
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography gutterBottom variant="h6" component="div">
                    {" "}
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {" "}
                    ${item.price.toFixed(2)}
                  </Typography>
                </Stack>

                {/* Description !! */}

                <ExpandableDescription text={item.description} />

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="body2"
                    component="p"
                    color="primary"
                    sx={{
                      textTransform: "capitalize",
                      mt: 1,
                      fontWeight: "bold",
                    }}
                  >
                    • owner reviewed
                  </Typography>

                  
                  <IconButton
                  onClick={()=>{toggleFavorite(item.id)}}
                  >
                    {favorite.includes(item.id)?
                    <FavoriteOutlinedIcon
                      color="error"
                      fontSize="medium"
                    />
                    :
                    <FavoriteBorderOutlinedIcon
                      color="error"
                      fontSize="medium"
                    />
                    
                  }
                    
                  </IconButton>


                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  size="large"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    handleOpenReviews(item)
                  }
                >
                  <RateReviewOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  Reviews
                  <Badge
                    badgeContent={ item.reviews?.length || 0}
                     
                    color="warning"
                    sx={{ ml: 2 }}
                  ></Badge>
                </Button>

                <Rating
                  name={`rating-${item.id}`}
                  value={averageRating(item)} 
                  precision={0.5}
                  readOnly
                />


              </CardActions>
            </Card>

            </div>

            
          ))}
        </Stack>

        
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={Math.ceil(product.length / itemsPerPage)}
            page={page}
            onChange={handlePaginationChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>

        {/* REVIEWS MODAL */}
        <ReviewModal
        openReviews={openReviews}
        handleCloseReviews={handleCloseReviews}
        selectedProduct={selectedProduct}
        session={session}
        status= {status}
        averageRating = {averageRating}
        />





<AddProductDialog
open={openProductDialog}
onclose={handleCloseProductDialog}
/>

<MyReviewDialog
open={openReviewDialog}
onclose={handleCloseReviewDialog}
userReviews={userReviews}
setUserReviews={setUserReviews}
totalCount={totalCount}


/>

      </Container>
    </Box>
  );
};
export default HomePageContent;
