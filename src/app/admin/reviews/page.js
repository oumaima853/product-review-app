'use client';



import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import  { useState, useMemo } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SimpleReviewFilter from "@/app/admin/_components/ReviewFilter";

const products = [
  { id: 1, name: "iPhone 15", rating: 5 },
  { id: 2, name: "Nike Airmax", rating: 2},
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "reviews",
    headerName: "Reviews",
    width: 250,
    editable: true,
    align: "center",
    headerAlign: "center",
    flex: 1,
  },

  {
    field: "users",
    headerName: "Users",
    width: 120,
    editable: true,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "usefulness",
    headerName: "Usefulness",
    width: 150,
    align: "center",
    headerAlign: "center",
    // Calculate usefulness based on product rating
    renderCell: (params) => {
      const productId = params.row.productId;
      const product = products.find((p) => p.id === productId);
      const rating = product ? product.rating : 1;

     
      let usefulness;
      if (rating >= 4) usefulness = "Extremely Useful";
      else if (rating >= 3) usefulness = "Very Useful";
      else if (rating >= 2) usefulness = "Useful";
      else if (rating >= 1) usefulness = "Somewhat Useful";
      else usefulness = "Not Useful";

      return (
        <Box
          sx={{
            fontWeight: "bold",
            color:
              rating >= 3
                ? "success.main"
                : rating >= 2
                ? "warning.main"
                : "error.main",
          }}
        >
          {usefulness}
        </Box>
      );
    },
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
      const { status } = params.row;
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {status === "inactive" ? (
            <Box>
              <Tooltip title="Accept review">
                <Button
                  variant="outlined"
                  startIcon={<DoneOutlinedIcon />}
                  color="success"
                  sx={{ mx: 1 }}
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
                >
                  Reject
                </Button>
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="outlined"
              startIcon={<CheckCircleOutlineOutlinedIcon />}
              color="info"
              sx={{
                pointerEvents: "none",
                cursor: "not-allowed",
                my: 1,
              }}
            >
              Accepted
            </Button>
          )}
        </Box>
      );
    },
  },
];
const rows = [
  {
    id: 1,
    productId: 1,
    reviews: "Great phone! Love the camera quality.",
    users: "sara amal",
    status: "active",
  },
  {
    id: 2,
    productId: 2,
    reviews: "Shoes are uncomfortable after long use.",
    users: "john doe",
    status: "inactive",
  },
  {
    id: 3,
    productId: 1,
    reviews: "Battery life could be better.",
    users: "alex smith",
    status: "active",
  },
  {
    id: 4,
    productId: 2,
    reviews: "Perfect for running.",
    users: "emma wilson",
    status: "inactive",
  },
  {
    id: 5,
    productId: 1,
    reviews: "Best iPhone ever!",
    users: "mike brown",
    status: "active",
  },
];

const Reviews = () => {
  const theme = useTheme();
  const [selectedProductId, setSelectedProductId] = useState("all"); 
  const [usefulnessFilter, setUsefulnessFilter] = useState("all");
  const [statusReviewFilter, setStatusReviewFilter] = useState("all");

  // actual data state
  const [allData] = useState(rows);

  // Filter function
  const filteredData = useMemo(() => {
    let result = [...allData]; // Use spread operator Start with all rows
    
    // Product filter
    if (selectedProductId !== "all") {
      const productId = parseInt(selectedProductId);
      result = result.filter((row) => row.productId === productId);
    }

    // Usefulness filter
    if (usefulnessFilter !== "all") {
      result = result.filter((row) => {
        // Calculate usefulness for each row
        const product = products.find((p) => p.id === row.productId);
        const rating = product ? product.rating : 0;

        let usefulness;
        if (rating >= 4) usefulness = "Extremely Useful";
        else if (rating >= 3) usefulness = "Very Useful";
        else if (rating >= 2) usefulness = "Useful";
        else if (rating >= 1) usefulness = "Somewhat Useful";
        else usefulness = "Not Useful";

        return usefulness === usefulnessFilter;
      });
    }
    // status filter
    if (statusReviewFilter !== "all") {
  result = result.filter((row) => {
    return row.status === statusReviewFilter.toLowerCase();
  });
}

    return result;
  }, [allData,selectedProductId, usefulnessFilter,statusReviewFilter]);

  
  const handleClearFilters = () => {

    setSelectedProductId("all");
    setUsefulnessFilter("all");
    setStatusReviewFilter("all");
    
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
     
      <SimpleReviewFilter
        productFilter={selectedProductId}
        onSetProductFilterChange={setSelectedProductId}
        products={products}
        usefulnessFilter={usefulnessFilter}
        onSetUsefulnessFilterChange={setUsefulnessFilter}
        statusReviewFilter={statusReviewFilter}
        onStatusFilterChange={setStatusReviewFilter}
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
              
              {filteredData.length === allData.length
                ? `All ${allData.length} reviews`
                : `${filteredData.length} of ${allData.length} reviews`}
            </Typography>

            
            {filteredData.length !== allData.length && (
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
