'use client';



import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ProductManagementHeader from "@/app/admin/_components//ProductManagementHeader";
import ProductManagementFooter from "@/app/admin/_components/ProductManagementFooter";
import StarIcon from "@mui/icons-material/Star";
import React, { useState, useMemo } from "react";
import SimpleProductFilter from "@/app/admin/_components/ProductFilter";
import ClearIcon from "@mui/icons-material/Clear";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "products",
    headerName: "Products",
    width: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "rate",
    headerName: "Rate",
    type: "number",
    width: 110,
    editable: true,
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <Typography component="span" variant="inherit">
            {params.value}
          </Typography>
          <StarIcon fontSize="small" color="warning" />
        </Box>
      );
    },
  },

  {
    field: "users",
    headerName: "Users",
    width: 110,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "reviews",
    headerName: "Reviews",
    type: "number",
    width: 110,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Date",
    width: 110,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 110,
    flex: 1,
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
          <Tooltip title="View details">
            <IconButton color="primary" size="small">
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit product">
            <IconButton color="info" size="small">
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete product">
            <IconButton color="error" size="small">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={status === "inactive" ? "Pending review" : "Approved"}
          >
            <IconButton
              color={status === "inactive" ? "warning" : "success"}
              size="small"
            >
              {status === "inactive" ? (
                <WarningAmberOutlinedIcon />
              ) : (
                <CheckCircleOutlineOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    products: "iphone15",
    category: "electronics",
    rate: 4,
    users: "Ahmed sami",
    reviews: 120,
    status: "active",
    date: "2025-08-12",
  },
  {
    id: 2,
    products: "nike Air max",
    category: "clothes",
    rate: 3,
    users: "Sara",
    reviews: 70,
    status: "inactive",
    date: "2026-01-08",
  },
  {
    id: 3,
    products: "Dress",
    category: "clothes",
    rate: 3,
    users: "Amel",
    reviews: 70,
    status: "inactive",
    date: "2026-01-01",
  },
  {
    id: 4,
    products: "Dell Computer",
    category: "electronics",
    rate: 5,
    users: "Ali",
    reviews: 120,
    status: "active",
    date: "2025-12-15",
  },
  {
    id: 5,
    products: "Samsung",
    category: "electronics",
    rate: 2,
    users: "Ahmed",
    reviews: 88,
    status: "inactive",
    date: "2025-08-22",
  },
  {
    id: 6,
    products: "Samsung",
    category: "electronics",
    rate: 2,
    users: "Ahmed",
    reviews: 88,
    status: "inactive",
    date: "2026-01-05",
  },
];


const Products = () => {
  // search state
  const [searchTerm, setSearchTerm] = useState("");

  // actual data state
  const [allData] = useState(rows);

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

  //  FILTER function
  const filteredData = useMemo(() => {
    let result = [...allData];

    // search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((user) => user.users.toLowerCase().includes(term));
    }

    // date filter
    if (dateFilter !== "all") {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      result = result.filter((date) => {
        if (!date.date) return false;

        const userDate = new Date(date.date);
        userDate.setHours(0, 0, 0, 0);
        const diffInDays = Math.floor(
          (today - userDate) / (1000 * 60 * 60 * 24)
        );
        if (diffInDays < 0) return false; // Exclude future dates

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
        return category.category.toLowerCase() === categoryFilter.toLowerCase();
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
        return status.status.toLowerCase() === statusFilter.toLowerCase();
      });
    }
    return result;
  }, [
    allData,
    searchTerm,
    dateFilter,
    categoryFilter,
    ratingFilter,
    statusFilter,
  ]); 

  
  
  
  
  const stats = useMemo(() => {
    const activeStatus = allData.filter(
      (item) => item.status === "active"
    ).length;
    const inactiveStatus = allData.filter(
      (item) => item.status === "inactive"
    ).length;

    return {
      active: activeStatus,
      inactive: inactiveStatus,
    };
  }, [allData]);

  const theme = useTheme();
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

      <SimpleProductFilter
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        categoryFilter={categoryFilter}
        oncategoryFilterChange={setcategoryFilter}
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
             
              {filteredData.length === allData.length
                ? `All ${allData.length} products`
                : `${filteredData.length} of ${allData.length} products`}
            </Typography>

            {/*  Show clear button only when filters are active */}
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

      <ProductManagementFooter stats={stats} />
    </Box>
  );
};
export default Products;

