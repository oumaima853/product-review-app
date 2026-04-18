'use client';




import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { DialogContent } from '@mui/material';

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { Box,Chip, Paper } from '@mui/material';


import  { useState, useCallback  } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

import { useRouter } from 'next/navigation';



/* use date fns libtaty  */
import { formatDistanceToNow } from 'date-fns';

import { useSnackbar } from "@/providers/snackbarProvider";

import axios from "axios";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 





const MyReviewDialog =({open, onclose, userReviews, setUserReviews,  totalCount})=>{



  






    
  const [sortOrder, setSortOrder] = useState('newest');
     // Sort reviews
  const sortReviews = (order) => {
    const sorted = [...userReviews];
    if (order === 'newest') {
      
      return sorted.sort((a, b) => b.id - a.id);
    } else if (order === 'rating-high') {
      return sorted.sort((a, b) => b.rating - a.rating);
    } else if (order === 'rating-low') {
      return sorted.sort((a, b) => a.rating - b.rating);
    }
    return sorted;
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setUserReviews(sortReviews(order));
  };

 


  const router = useRouter();





  

  // Render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon 
        key={i} 
        sx={{ 
          fontSize: 16, 
          color: i < rating ? '#FFD700' : '#E0E0E0' 
        }} 
      />
    ));
  };





  
  
  
  
 












      const {showSnackbar} = useSnackbar();
  
   const handleAction = useCallback( async (id, actionType)=>{

    try{

       if (actionType === 'reject'){

      


      await axios.delete('/api/registred-users/manage-review', { data: { id: id } });
       showSnackbar("Review deleted successfully !", "error");
    }
     


    } catch(error){

      console.error("Action failed:", error);

      showSnackbar(error.response?.data?.error || "An error occurred. Please try again.", "error");
      
    }




   

    } , [showSnackbar]); 



    // see product when review is clicked 
    const scrollToProduct = (productId) => {
  // 1. Close the review dialog first
  onclose();

  // 2. Wait a split second for the dialog to close, then scroll
  setTimeout(() => {
    const element = document.getElementById(`product-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // 3.  Add a temporary "glow" effect so the user sees it
      element.style.outline = "4px solid #e1e9a8da";
      element.style.borderRadius = "8px";
      setTimeout(() => { element.style.outline = "none"; }, 4000);
    }
  }, 300);
};











  
 return (
   
     <>
      <Dialog
        fullScreen
        open={open}
        onClose={onclose}
        slots={{
          transition: Transition,
        }}
      >
       
        <DialogTitle>
            <Box sx={{ mb: 4 ,maxWidth: 800, mx: 'auto', p: 3,
                display: 'flex',          
      flexDirection: 'column',   
      alignItems: 'center',      
      textAlign: 'center'      
             }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Reviews
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={`Total: ${totalCount} reviews`} 
            color="primary" 
            variant="outlined" 
          />
          <Button 
            startIcon={<SortIcon />}
            onClick={() => handleSort(sortOrder === 'newest' ? 'rating-high' : 'newest')}
            variant="outlined"
            size="small"
          >
            Sort by: {sortOrder === 'newest' ? 'Date' : 'Rating'}
          </Button>
         
        </Box>
      </Box>
        </DialogTitle>
        <DialogContent>
             <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
     

      {/* Reviews List */}
      <Paper variant="outlined" sx={{ borderRadius: 2, }}>
        {userReviews.map((review) => (
          <Box 
            key={review.id}
            sx={{ 
              p: 2, 
              mb:1,
              borderRadius:"7px",
              border: '1px solid',
              borderColor: 'divider',
              
             '&:last-child': { borderBottom: 'none' }
            }}
          >
            {/* Product Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.product.name} • ${review.product.price}
              </Typography>
            </Box>

            {/* Review Content */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ display: 'flex' }}>
                {renderStars(review.rating)}
              </Box>
              <Typography variant="body1" sx={{ ml: 1, flex: 1 }}>
                &quot;{review.description} &quot;
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="primary.main">
                { formatDistanceToNow(new Date(review.createdAt), { addSuffix: true }) }
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
               
                <IconButton 
                  size="small"
                  //onClick={() => handleViewProduct(review.product)}
                  onClick={() => scrollToProduct(review.productId)}
                  title="View Product"
                  sx={{ border: '1px solid', borderColor: 'primary.main' }}
                >
                  <VisibilityIcon fontSize="small" color="primary" />
                </IconButton>
                
                
                
                <IconButton 
                  size="small" 
                  
                  onClick={() => handleAction(review.id, 'reject')}
                  title="Delete Review"
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>

      {/* Empty State  */}
      {userReviews.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error.main" gutterBottom>
             No reviews yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Share your experiences to help other shoppers!
          </Typography>
          
        </Box>
      )}
    </Box>
        </DialogContent>

      <DialogActions>
        <Button onClick={onclose}>Cancel</Button>
        
      </DialogActions>        
      </Dialog>

      

</>

  );

}
export default MyReviewDialog;