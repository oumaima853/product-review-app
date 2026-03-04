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
import SimpleUserFilter from "@/app/admin/_components/UserFilter";


const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Full name",
    width: 120,
    editable: true,
    align: "center",
    headerAlign: "center",
    
  },

  {
    field: "email",
    headerName: "Email",
    width: 170,
    editable: true,
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Registration date",
    width: 140,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    editable: true,
    align: "center",
    headerAlign: "center",
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
            gap: 1,
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
              sx={{ my: 1 }}
              
            >
              Block
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
    name: "sara sara",
    email: "sara.sara@gmail.com",
    date: "2026-01-04",
    status: "active",
  },
  {
    id: 2,
    name: "ahmed sara",
    email: "admed.sara@gmail.com",
    date: "2026-01-10",
    status: "inactive",
  },
  
];

const Users = () => {
  const theme = useTheme();

  const [statusReviewFilter, setStatusReviewFilter] = useState("all");

  const [allData] = useState(rows);

  const filteredData = useMemo(() => {
    let result = [...allData]; 
    
    
    
    // status filter
    if (statusReviewFilter !== "all") {
  result = result.filter((row) => {
    return row.status === statusReviewFilter.toLowerCase();
  });
}

    return result;
  }, [allData,statusReviewFilter]);

  
  const handleClearFilters = () => {
   
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
      
      <SimpleUserFilter
       
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
export default Users;
