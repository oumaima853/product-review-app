"use client";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ReviewFilter = ({
  productFilter,
  onSetProductFilterChange,
  
  products
  
  
}) => {


  const handleProductChange = (event) => {
    onSetProductFilterChange(event.target.value);
  };

  
  
 // check for duplication

   const uniqueProducts = [];
  const checkedIds = [];

  products.forEach((item) => {
    
    if (item.product && !checkedIds.includes(item.product.id)) {
      checkedIds.push(item.product.id);       
      uniqueProducts.push(item.product);  
    }
  });

  

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
              Review management
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Grid container spacing={2} alignItems="center">




              {/* Products Filter */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Products</InputLabel>
                  <Select
                    label="Products"
                    value={productFilter}
                    onChange={handleProductChange}
                  >
                    <MenuItem value="all">All Products</MenuItem>

                    {uniqueProducts.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name} 
                      </MenuItem>
                    ))}
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

export default ReviewFilter;
