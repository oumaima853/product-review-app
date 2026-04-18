'use client';



import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ProductManagementHeader from "@/app/admin/_components//ProductManagementHeader";
import ProductManagementFooter from "@/app/admin/_components/ProductManagementFooter";
import StarIcon from "@mui/icons-material/Star";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProductFilter from "@/app/admin/_components/ProductFilter";
import ClearIcon from "@mui/icons-material/Clear";

import axios from "axios";

import ViewProductDialog from "@/app/admin/_components/viewProductDialogue";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from "@/providers/snackbarProvider";









const Products = () => {






   const [isClient, setIsClient] = useState(false); 

  const [products, setProducts] = useState([]);

     const fetchProducts = useCallback(async()=>{
         try {
  
       const response = await axios.get('/api/admin/products');
      setProducts(response.data);
  
    } catch (error) {
      console.error("Failed to fetch products :", error);
    }
  
      } , [] ) ;
  
  
  
  useEffect( ()=>{
  
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true); 
  
    
  
    fetchProducts();
  
  },[fetchProducts]);
  




    const [selectedProduct, setSelectedProduct] = useState(null); //  handle current selected product 


  /*add product state */
const [openProductDialog, setOpenProductDialog] = useState(false);



  const handleClickOpenProductDialog = useCallback ((id) => {
    
    setOpenProductDialog(true);
    // find the product to edit 
      const productToEdit = products.find((p) => p.id === id);
      setSelectedProduct(productToEdit);
      
   
  },[products]);

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    
    
  };






    const {showSnackbar} = useSnackbar();

  const handleAction = useCallback(async (id, actionType) => {
  try {
    console.log("Action ID:", id);
    

   
    
    if (actionType === 'accept') {

       await axios.patch('/api/admin/manage-products', { id });
      showSnackbar("Product approved successfully !", "success");
      
    } 
   
    else {
      await axios.delete('/api/admin/manage-products', { data: { id: id } });
      showSnackbar("Product rejected successfully!", "error");
    }

    fetchProducts(); // Refresh the list



  } catch (error) {
    console.error("Action failed:", error);
    showSnackbar(error.response?.data?.error || "An error occurred.", "error");
  }
}, [fetchProducts,showSnackbar]);









const columns = useMemo(() => {
  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Products",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "categoryName", 
      headerName: "Category",
      width: 150,
      align: "center",
      headerAlign: "center",
      // Accessing the nested category name from Prisma include
      valueGetter: (value, row) => row.category?.name || "No category",
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
          <Typography component="span" variant="inherit">
            {params.value}
          </Typography>
          <StarIcon fontSize="small" color="warning" />
        </Box>
      ),
    },
    {
      field: "creator", 
      headerName: "User",
      width: 150,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => 
        row.creator ? `${row.creator.firstName} ${row.creator.lastName}` : "Anonymous"
    },
   
    {
      field: "createdAt",
      headerName: "Date",
      width: 130,
      align: "center",
      headerAlign: "center",
      valueFormatter: (value) => value ? new Date(value).toLocaleDateString() : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        const { isVerified, id } = params.row;
        return (
          <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>

            {isVerified === false ? 
            
            <Tooltip title="Check product">
              <IconButton color="info" size="small" onClick={() =>  handleClickOpenProductDialog(id)}>
                <VisibilityIcon/>
              </IconButton>
            </Tooltip>

            :
            <Tooltip title="Delete product">
              <IconButton color="error" size="small" onClick={() => handleAction(id, 'delete')}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>

            
          
          }
           

            

            
          </Box>
        );
      },
    },
  ];
}, [handleAction,handleClickOpenProductDialog]);








  // search state
  const [searchTerm, setSearchTerm] = useState("");

  

  // date state
  const [dateFilter, setDateFilter] = useState("all");

  // category state
  const [categoryFilter, setcategoryFilter] = useState("all");

  // rating state
  const [ratingFilter, setratingFilter] = useState("all");

  // status state
  const [statusFilter, setstatusFilter] = useState("all");

  const handleClearFilters = () => {
    // Reset to default value
    setDateFilter("all");
    setcategoryFilter("all");
    setstatusFilter("all");
    setratingFilter("all");
  };


  console.log(products);

  //  FILTER function
  const filteredData = useMemo(() => {
    let result = [...products];

    // search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((user) => user.users.toLowerCase().includes(term));
    }

    
   // date filter
if (dateFilter !== "all") {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  result = result.filter((item) => {
   
    if (!item.createdAt) return false;

    const userDate = new Date(item.createdAt);
    userDate.setHours(0, 0, 0, 0);

    const diffInDays = Math.floor((today - userDate) / (1000 * 60 * 60 * 24));

    console.log(`Product: ${item.name}, Diff: ${diffInDays} days`);


    if (diffInDays < 0) return false; 

    switch (dateFilter) {
      case "today":
        return diffInDays === 0;
      case "week":
        return diffInDays <= 7;
      case "month":
        return diffInDays <= 30;
      case "year":
        return diffInDays <= 365;
      default:
        return true;
    }
  });


  
}






    // category filter
    if (categoryFilter !== "all") {
      result = result.filter((category) => {
        return category.category.name.toLowerCase() === categoryFilter.toLowerCase();
      });
    }



    // rating filter
    if (ratingFilter !== "all") {
      result = result.filter((rating) => {
        return Number(rating.rate) >= Number(ratingFilter);
      });
    }

    // status filter
    if (statusFilter !== "all") {
      result = result.filter((status) => {
        return String(status.isVerified) === statusFilter;
      });
    }
    return result;
  }, [
    products,
    searchTerm,
    dateFilter,
    categoryFilter,
    ratingFilter,
    statusFilter,
  ]); 
  

  

// categories state
  const [availableCategories, setAvailableCategories] = useState([]);

useEffect(() => {
  const loadCategories = async () => {
    try {
      const response = await axios.get('/api/admin/categories');
      setAvailableCategories(response.data);
    } catch (err) {
      console.error("Categories fetch failed", err);
    }
  };
  loadCategories();
}, []);







  
  
  
  const productsType = useMemo(() => {
    const verifiedProducts = products.filter(
      (item) => item.isVerified === false
    ).length;
    const unVerifiedProducts = products.filter(
      (item) => item.isVerified === true
    ).length;

    return {
      verified: verifiedProducts,
      unverified: unVerifiedProducts,
    };
  }, [products]);

  const theme = useTheme();


























  if (!isClient) return null;











  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ProductManagementHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ProductFilter
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}

        categoryFilter={categoryFilter} // to handle selected category
        oncategoryFilterChange={setcategoryFilter} 

        
         categories={availableCategories} // to get available categories

        ratingFilter={ratingFilter}
        onRatingFilterChange={setratingFilter}

        statusFilter={statusFilter}
        onStatusFilterChange={setstatusFilter}
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
          {/* SEARCH RESULTS INFO */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
             
              {filteredData.length === products.length
                ? `All ${products.length} products`
                : `${filteredData.length} of ${products.length} products`}
            </Typography>

            {/*  Show clear button only when filters are active */}
            {filteredData.length !== products.length && (
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

      <ProductManagementFooter productsType={productsType} />

      <ViewProductDialog
open={openProductDialog}
onclose={handleCloseProductDialog}
productData={selectedProduct}
handleAction={handleAction}
/>

    </Box>
  );
};
export default Products;

