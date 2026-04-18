'use client';



import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import  { useState, useMemo, useEffect, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReviewFilter from "@/app/home/_components/reviewFilter";

import axios from "axios";

import { useSnackbar } from "@/providers/snackbarProvider";









const ratingLabels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};










const Reviews = () => {


  
  const theme = useTheme();
  const [selectedProductId, setSelectedProductId] = useState("all"); 
 

  




  const [isClient, setIsClient] = useState(false); 

  const [reviews, setReviews] = useState([]);



   const fetchFlaggedReviews = useCallback(async()=>{
       try {

     const response = await axios.get('/api/admin/flagged-reviews');
    setReviews(response.data);

  } catch (error) {
    console.error("Failed to fetch flagged reviews :", error);
  }

    } , [] ) ;



useEffect( ()=>{

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsClient(true); 

  

  fetchFlaggedReviews();

},[fetchFlaggedReviews]);

console.log(reviews)






  // Filter function
  const filteredData = useMemo(() => {
    let result = [...reviews]; 
    
    // Product filter
    if (selectedProductId !== "all") {
      const productId = parseInt(selectedProductId);
      result = result.filter((row) => row.product?.id === productId);
    }

   
    

    return result;
  }, [reviews,selectedProductId]);

  



  const handleClearFilters = () => {

    setSelectedProductId("all");
    setUsefulnessFilter("all");
    setStatusReviewFilter("all");
    
  };




 

  


   const {showSnackbar} = useSnackbar();

   const handleAction = useCallback( async (id, actionType)=>{

    try{
      console.log("Action ID:", id);
      if (actionType === 'accept') {
      await axios.patch('/api/admin/manage-reviews', { id });
      showSnackbar("Review approved successfully !", "success");
    } else {

      


      await axios.delete('/api/admin/manage-reviews', { data: { id: id } });
      showSnackbar("Review rejected successfully !", "error");
    }
    fetchFlaggedReviews(); // Refresh the list

    } catch(error){

       console.error("Action failed:", error);
    showSnackbar(error.response?.data?.error || "An error occurred. Please try again.", "error");

    }


     

    } , [fetchFlaggedReviews, showSnackbar]); 












const columns = useMemo(()=>{
  return [
  { field: "id", headerName: "ID", width: 70 , align: "center", headerAlign: "center",},
  
  // Accessing Product Name from the nested object
  { 
    field: "productName", 
    headerName: "Product", 
    width: 200,
    align: "center",
    headerAlign: "center",
    valueGetter: (value, row) => row.product?.name || "No Product" 
  },

  //  Accessing Reviewer Name (Combining first and last name)
  { 
    field: "reviewer", 
    headerName: "Reviewer", 
    width: 180,
    align: "center",
    headerAlign: "center",
    valueGetter: (value, row) => 
      row.user ? `${row.user.firstName} ${row.user.lastName}` : "Anonymous"
  },

  { field: "description", headerName: "Comment", flex: 1, minWidth: 200, align: "center", headerAlign: "center",},

  { 
    field: "rating", 
    headerName: "Rating", 
    width: 100,
    align: "center",
    headerAlign: "center",
    valueGetter: (value, row) => {
      
      return ratingLabels[row.rating] || "No Rating";
    },
  },

  {
    field: "createdAt",
    headerName: "Date",
    width: 130,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => new Date(value).toLocaleDateString(),
  },

  
  {
    field: "actions",
    headerName: "Actions",
    width: 280,
    align: "center",
    headerAlign: "center",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          
            <Box>
              <Tooltip title="Accept review">
                <Button
                  variant="outlined"
                  startIcon={<DoneOutlinedIcon />}
                  color="success"
                  sx={{ mx: 1 }}
                  onClick={() => handleAction(params.row.id, 'accept')}
                >
                  Accept
                </Button>
              </Tooltip>
              <Tooltip title="Reject review">
                <Button
                  variant="outlined"
                  startIcon={<CloseOutlinedIcon />}
                  color="error"
                  sx={{ mx: 1 }}
                  onClick={() => handleAction(params.row.id, 'reject')}
                >
                  Reject
                </Button>
              </Tooltip>
            </Box>
          
        </Box>
      );
    },
  },





];
},[handleAction]);



















// Prevent rendering until the component is mounted
if (!isClient) return null;







  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
     
      <ReviewFilter
        productFilter={selectedProductId}
        onSetProductFilterChange={setSelectedProductId}
        products={reviews}
        
        
        
       
      />

      <Box
        sx={{
          flex: 1,
          p: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: 500,
            width: "100%",
            "& .MuiDataGrid-root": {
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.grey[100],
                borderBottom: `2px solid ${theme.palette.divider}`,
              },
            },
          }}
        >
        
         <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              
              {filteredData.length === reviews.length
                ? `All ${reviews.length} reviews`
                : `${filteredData.length} of ${reviews.length} reviews`}
            </Typography>

            
            {filteredData.length !== reviews.length && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                sx={{
                  ml: "auto", 
                  minWidth: "140px", 
                }}
              >
                Clear Filters
              </Button>
            )}
          </Box>

          <DataGrid
            rows={filteredData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Reviews;
