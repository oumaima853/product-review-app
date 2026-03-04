'use client';




import { Chip, Modal, Avatar, Divider, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Badge from "@mui/material/Badge";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Rating from "@mui/material/Rating";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ReviewAccordion from "./ReviewAccordion";

const ReviewModal = ({
  openReviews,
  handleCloseReviews,
  selectedProduct,
  isRegisteredUser,
}) => {
  return (
    <Modal
      open={openReviews}
      onClose={handleCloseReviews}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      

      <Paper
        sx={{
          width: { xs: "95%", sm: "500px", md: "750px" },
          maxHeight: "80vh",
          overflow: "auto",
          p: 3,
          position: "relative",
        }}
      >
        {selectedProduct ? (
          <>
            <IconButton
              onClick={handleCloseReviews}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedProduct.name} - Reviews
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Rating
                  value={selectedProduct.averageRating}
                  readOnly
                  precision={0.5}
                />
                <Typography variant="body1">
                  <strong>{selectedProduct.averageRating.toFixed(1)}</strong>{" "}
                  out of 5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({selectedProduct.totalReviews} reviews)
                </Typography>
              </Box>
            </Box>

            {selectedProduct.ownerReview && (
              <Paper
                sx={{
                  p: 2,
                  mb: 3,
                  bgcolor: "primary.50",
                  borderLeft: 3,
                  borderColor: "primary.main",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Chip
                    label="OWNER'S REVIEW"
                    color="primary"
                    size="small"
                    icon={<PersonIcon />}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Product added by this user
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 32,
                      height: 32,
                    }}
                  >
                    {selectedProduct.ownerReview.userName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">
                      {selectedProduct.ownerReview.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedProduct.ownerReview.date}
                    </Typography>
                  </Box>
                </Box>

                <Rating
                  value={selectedProduct.ownerReview.rating}
                  readOnly
                  size="small"
                  sx={{ mb: 1 }}
                />

                <Typography variant="body1" sx={{ mb: 2 }}>
                  &quot;{selectedProduct.ownerReview.text}&quot;
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label="12 helpful" 
                    size="small"
                    icon={<ThumbUpOutlinedIcon color="info" />}
                    color="info"
                  />
                  {selectedProduct.ownerReview.verifiedPurchase && (
                    <Chip
                      label="Verified Purchase"
                      size="small"
                      icon={<VerifiedIcon />}
                      color="success"
                    />
                  )}
                </Box>
              </Paper>
            )}

            {isRegisteredUser && (

              <>
                <ReviewAccordion />
              </>
            )}

            {/* Community Reviews */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
              Community Reviews ({selectedProduct.reviews.length})
            </Typography>

            {selectedProduct.reviews.map((review, index) => (
              <Box key={review.id} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "grey.700",
                      width: 32,
                      height: 32,
                    }}
                  >
                    {review.userName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight="bold">{review.userName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  {review.text}
                </Typography>

                {index < selectedProduct.reviews.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}
          </>
        ) : (
          /* Show loading message when no product is selected */
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography>Loading product details...</Typography>
          </Box>
        )}
      </Paper>
    </Modal>
  );
};

export default ReviewModal;
