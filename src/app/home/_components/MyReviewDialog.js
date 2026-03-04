'use client';




import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DialogContent } from '@mui/material';

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box,Chip, Paper } from '@mui/material';


import  { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

import { useRouter } from 'next/navigation'





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 
  const mockReviews = [
    { id: 1, product: "Book", price: 19.99, rating: 5, text: "Amazing storytelling!", date: "2 days ago" },
    { id: 2, product: "Book", price: 19.99, rating: 4, text: "Good but slow in the middle", date: "1 week ago" },
    { id: 3, product: "Dress", price: 49.99, rating: 5, text: "Perfect fit for weddings!", date: "3 days ago" },
    { id: 4, product: "Shoes", price: 79.99, rating: 3, text: "Comfortable but runs small", date: "1 month ago" },
    { id: 5, product: "Laptop", price: 999.99, rating: 5, text: "Lightning fast performance", date: "5 days ago" },
    { id: 6, product: "Coffee Maker", price: 89.99, rating: 4, text: "Great coffee every morning", date: "2 weeks ago" },
    { id: 7, product: "Headphones", price: 129.99, rating: 5, text: "Best noise cancellation ever", date: "1 day ago" },
    { id: 8, product: "Book", price: 14.99, rating: 3, text: "Interesting concept but poor execution", date: "3 weeks ago" },
    { id: 9, product: "Smartwatch", price: 299.99, rating: 4, text: "Good battery life, accurate tracking", date: "10 days ago" },
    { id: 10, product: "Backpack", price: 59.99, rating: 5, text: "Durable and waterproof", date: "4 days ago" },
    { id: 11, product: "Perfume", price: 69.99, rating: 5, text: "Lasts all day, lovely scent", date: "1 week ago" },
    { id: 12, product: "Camera", price: 599.99, rating: 4, text: "Great photos but complex settings", date: "2 months ago" },
    { id: 13, product: "Yoga Mat", price: 34.99, rating: 5, text: "Non-slip and thick enough", date: "3 days ago" },
    { id: 14, product: "Blender", price: 119.99, rating: 5, text: "Powerful and easy to clean", date: "2 weeks ago" },
    { id: 15, product: "Sunglasses", price: 89.99, rating: 3, text: "Style is good but lens quality average", date: "3 weeks ago" },
    { id: 16, product: "Gaming Mouse", price: 49.99, rating: 5, text: "Perfect for FPS games", date: "6 days ago" },
    { id: 17, product: "Plant", price: 24.99, rating: 4, text: "Growing well with proper care", date: "1 month ago" },
    { id: 18, product: "Desk Lamp", price: 39.99, rating: 5, text: "Adjustable brightness is perfect", date: "1 week ago" },
    { id: 19, product: "Running Shoes", price: 89.99, rating: 4, text: "Good cushioning for long runs", date: "2 days ago" },
    { id: 20, product: "Water Bottle", price: 19.99, rating: 5, text: "Leak-proof and keeps water cold", date: "5 days ago" },
    { id: 21, product: "Cookbook", price: 29.99, rating: 5, text: "Delicious recipes, easy to follow", date: "2 weeks ago" },
    { id: 22, product: "Phone Case", price: 15.99, rating: 2, text: "Broke after 2 weeks of use", date: "1 month ago" },
    { id: 23, product: "Board Game", price: 44.99, rating: 5, text: "Fun for the whole family", date: "3 days ago" }
  ];

  
const MyReviewDialog =({open, onclose})=>{
    
      const [reviews, setReviews] = useState(mockReviews);
  const [sortOrder, setSortOrder] = useState('newest');
     // Sort reviews
  const sortReviews = (order) => {
    const sorted = [...reviews];
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
    setReviews(sortReviews(order));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };


  const router = useRouter();





  //  NAVIGATION and highliting product while click on view ANSWER 
  const handleViewProduct = (productName) => {
    
    router.push(`/?highlight=${encodeURIComponent(productName)}`);
    
  
  };

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
  
 return (
   
     
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
            label={`Total: ${reviews.length} reviews`} 
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
        {reviews.map((review) => (
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
                {review.product} • ${review.price}
              </Typography>
            </Box>

            {/* Review Content */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ display: 'flex' }}>
                {renderStars(review.rating)}
              </Box>
              <Typography variant="body1" sx={{ ml: 1, flex: 1 }}>
                &quot;{review.text} &quot;
              </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {review.date}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
               
                <IconButton 
                  size="small"
                  onClick={() => handleViewProduct(review.product)}
                  title="View Product"
                  sx={{ border: '1px solid', borderColor: 'primary.main' }}
                >
                  <VisibilityIcon fontSize="small" color="primary" />
                </IconButton>
                
                <IconButton size="small" title="Edit Review">
                  <EditIcon fontSize="small" />
                </IconButton>
                
                <IconButton 
                  size="small" 
                  onClick={() => handleDelete(review.id)}
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
      {reviews.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
             No reviews yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Share your experiences to help other shoppers!
          </Typography>
          <Button variant="contained">
            Browse Products
          </Button>
        </Box>
      )}
    </Box>
        </DialogContent>

      <DialogActions>
        <Button onClick={onclose}>Cancel</Button>
        
      </DialogActions>        
      </Dialog>
  );

}
export default MyReviewDialog;