'use client';




import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

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

import image1 from "@/images/image1.jpg";

import { Chip, Modal, Avatar, Divider, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Badge from "@mui/material/Badge";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Pagination from "@mui/material/Pagination";
import ExpandableDescription from "@/app/home/_components/ExpandableDescription ";

import AddIcon from "@mui/icons-material/Add";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import InventoryIcon from "@mui/icons-material/Inventory";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import HistoryIcon from "@mui/icons-material/History";
import { styled } from "@mui/material/styles";

import AddProductDialog from "@/app/home/_components/AddProductDialog";
import ReviewModal from "@/app/home/_components/ReviewModal";
import MyReviewDialog from "@/app/home/_components/MyReviewDialog"



const HomePageContent = ({
  isGuest,
  isRegisteredUser,
  isAdmin,
  currentUser,
  filteredData
}) => {
  /*toggle button state */
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

 
  const [openReviews, setOpenReviews] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  const product = filteredData; 

  const handleOpenReviews = (product) => {
    
    setSelectedProduct(product); // Store which product was clicked

    setOpenReviews(true); 
  };

  const handleCloseReviews = () => {
    setSelectedProduct(null); // Clear product selection when closing, to accept new one when user click on another product revie button
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

/*myReview state */

const [openReviewDialog, setOpenReviewDialog]= useState(false);

const handleClickReviewDialog=()=>{
    setOpenReviewDialog(true);
}
const handleCloseReviewDialog=()=>{
    setOpenReviewDialog(false);
}




const [favorite, setFavorite]= useState([]);

useEffect(() => {
  const savedFavorites = localStorage.getItem("guest_favorites");
  if (savedFavorites) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorite(JSON.parse(savedFavorites));
  }
}, []);

function toggleFavorite(ProductId) {
  setFavorite((prev) => {
    if (prev.includes(ProductId)) {
      return prev.filter((id) => id !== ProductId);
    } else {
      return [...prev, ProductId];
    }
  });
}


useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("guest_favorites", JSON.stringify(favorite));
  }
}, [favorite]);

  return (
    <Box sx={{ border: 1, borderColor: "rgba(215, 187, 30, 1)", m: 3 }}>
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
            <Typography variant="h6">Selected Products</Typography>
            <Typography variant="body1" fontWeight={300}>
              all our new arrivals in an exclusive brand selection
            </Typography>
          </Box>

          {isGuest && (
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
                  // Button formatting when selected (required)
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
              <ToggleButton value="all">
                <AllInboxIcon sx={{ mr: 1, fontSize: "20px" }} /> All Products
              </ToggleButton>

              <ToggleButton value="my-products">
                <HistoryIcon sx={{ mr: 1, fontSize: "20px" }} /> Recent Products
              </ToggleButton>

              <ToggleButton value="my-favorites">
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

          {isRegisteredUser && (
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

                <ToggleButton value="all">
                  <AllInboxIcon sx={{ mr: 1, fontSize: "20px" }} /> All Products
                </ToggleButton>

                <ToggleButton value="my-products">
                  <InventoryIcon sx={{ mr: 1, fontSize: "20px" }} /> My Products
                </ToggleButton>

                <ToggleButton value="reviews" onClick={handleClickReviewDialog}>
                  <RateReviewIcon sx={{ mr: 1, fontSize: "20px" }}  /> My Reviews
                </ToggleButton>

                <ToggleButton value="favorites">
                  My Favorites
                  <Badge
                    badgeContent={6}
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

        {/*part 2 Product Cards*/}
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {selectedCards.map((item) => (
            <Card
              key={item.id} 
              sx={{
                maxWidth: 333,
                mt: 6,
                /*this is the class of image (see inspect , how to know it ??) */
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
                image={image1.src}
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

                  {/*to be clickable icon */}
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
                    badgeContent={item.totalReviews}
                    color="warning"
                    sx={{ ml: 2 }}
                  ></Badge>
                </Button>
                <Rating
                  name={`rating-${item.id}`}
                  value={item.averageRating} 
                  precision={0.5}
                  readOnly
                />
              </CardActions>
            </Card>
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
        isRegisteredUser={isRegisteredUser}
        />





<AddProductDialog
open={openProductDialog}
onclose={handleCloseProductDialog}
/>

<MyReviewDialog
open={openReviewDialog}
onclose={handleCloseReviewDialog}

/>

      </Container>
    </Box>
  );
};
export default HomePageContent;
