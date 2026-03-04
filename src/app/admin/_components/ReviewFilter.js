"use client";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const SimpleReviewFilter = ({
  productFilter,
  onSetProductFilterChange,
  products = [],
  usefulnessFilter,
  onSetUsefulnessFilterChange,
  statusReviewFilter,
  onStatusFilterChange,
}) => {
  const handleProductChange = (event) => {
    onSetProductFilterChange(event.target.value);
  };
  const handleReviewChange = (event) => {
    onStatusFilterChange(event.target.value);
  };

  const handleStatusChange = (event) => {
    onSetUsefulnessFilterChange(event.target.value);
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

                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name} ({product.rating})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Usefulness Filter */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Usefulness</InputLabel>
                  <Select
                    label="Usefulness"
                    value={usefulnessFilter}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="all"> All Usefulness </MenuItem>
                    <MenuItem value="Not Useful" sx={{ gap: 1 }}>
                      Not Useful{" "}
                    </MenuItem>
                    <MenuItem value="Somewhat Useful">
                      Somewhat Useful{" "}
                    </MenuItem>
                    <MenuItem value="Useful">Useful</MenuItem>
                    <MenuItem value="Very Useful">Very Useful</MenuItem>
                    <MenuItem value="Extremely Useful">
                      Extremely Useful
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

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
                      <IconButton color="success" size="small"></IconButton>
                      Accepted products
                    </MenuItem>
                    <MenuItem value="inactive" sx={{ gap: 0.5 }}>
                      <IconButton color="warning" size="small"></IconButton>
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

export default SimpleReviewFilter;
