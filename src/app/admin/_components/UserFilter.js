'use client';

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {  Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SimpleUserFilter = ({ 
  
  statusReviewFilter,
  onStatusFilterChange

 }) => {

   
  const handleReviewChange = (event) => {
    onStatusFilterChange(event.target.value);
  }; 




  return (
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
              User management
            </Typography>
            
            
            
            <Box sx={{ flexGrow: 1 }} />
            
            
              <Grid container spacing={2} alignItems="center">
                
                
                
               

                  {/* Product Status Filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                              label="Status"
                              value={statusReviewFilter}
                              onChange={handleReviewChange}
                            >
                              <MenuItem value="all">All Status</MenuItem>
                              <MenuItem value="active" sx={{ gap: 0.5 }}>
                                <IconButton color="success" size="small">
                                  
                                </IconButton>
                                Accepted products
                              </MenuItem>
                              <MenuItem value="inactive" sx={{ gap: 0.5 }}>
                                <IconButton color="warning" size="small">
                                  
                                </IconButton>
                                Under review products
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                
              </Grid>
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default SimpleUserFilter;