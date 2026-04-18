'use client';




import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid } from "@mui/x-data-grid";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import  { useState, useMemo, useEffect , useCallback} from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import {  Grid } from "@mui/material";

import { useSnackbar } from "@/providers/snackbarProvider";









const Users = () => {








  const theme = useTheme();



  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsClient(true); }, []);



  
  const [pendingUsers, setPendingUsers] = useState([]);


 const fetchPendingUsers = useCallback(async()=>{
       try {
    const response = await axios.get('/api/admin/pending-users');
    setPendingUsers(response.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

    } , [] ) ;



  useEffect( ()=>{
   
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPendingUsers ();

  }

    
    ,[fetchPendingUsers]); 



    const {showSnackbar} = useSnackbar();

   const handleAction = useCallback( async (id, actionType)=>{

    try{

        console.log("Action ID:", id);
      if (actionType === 'accept') {
      await axios.patch('/api/admin/manage-user', { id });
       showSnackbar("User approved successfully !", "success");
    } else {

      


      await axios.delete('/api/admin/manage-user', { data: { id: id } });
       showSnackbar("User rejected successfully !", "error");
    }
    fetchPendingUsers(); // Refresh the list


    } catch(error){

      console.error("Action failed:", error);
    showSnackbar(error.response?.data?.error || "An error occurred. Please try again.", "error");
      
    }




   

    } , [fetchPendingUsers,showSnackbar]); 


const columns = useMemo(()=>{
  return [
  { field: "id", headerName: "ID", width: 90 },
  { 
  field: 'fullName', 
  headerName: 'Full Name', 
  width: 300,
   align: "center",
    headerAlign: "center",
  valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}` 
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
    field: "createdAt",
    headerName: "Registration date",
    width: 140,
    editable: true,
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
            gap: 1,
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









  const [statusReviewFilter, setStatusReviewFilter] = useState("all");


  const filteredData = useMemo(() => {
    let result = [...pendingUsers]; 
    
    
    
    // status filter
    if (statusReviewFilter !== "all") {
  result = result.filter((row) => {
    return row.status === statusReviewFilter.toLowerCase();
  });
}

    return result;
  }, [pendingUsers,statusReviewFilter]);

  
  const handleClearFilters = () => {
   
    setStatusReviewFilter("all");
    
  };




  if (!isClient) return null;


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >

    
      
     

       <div>
      <Box sx={{ flexGrow: 1, my: 2, mx: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="subtitle1"
              noWrap
              component=""
              sx={{ mx: 2, display: { xs: "none", sm: "block" } }}
            >
              Pending User Management
            </Typography>
            
            
            
            <Box sx={{ flexGrow: 1 }} />
            
            
              <Grid container spacing={2} alignItems="center">
                
                
                
               

                
                
              </Grid>
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>









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
            
              {filteredData.length === pendingUsers.length
                ? `All ${pendingUsers.length} reviews`
                : `${filteredData.length} of ${pendingUsers.length} reviews`}
            </Typography>

            {filteredData.length !== pendingUsers.length && (
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
