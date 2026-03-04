'use client';


import {
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";

function SimpleProductFilter({
  dateFilter,
  onDateFilterChange,
  categoryFilter,
  oncategoryFilterChange,
  ratingFilter,
  onRatingFilterChange,
  statusFilter,
  onStatusFilterChange,
}) {
  const handleDateChange = (event) => {
    onDateFilterChange(event.target.value);
  };
  const handleCategoryChange = (event) => {
    oncategoryFilterChange(event.target.value);
  };
  const handleRatingChange = (event) => {
    onRatingFilterChange(event.target.value);
  };
  const handleStatusChange = (event) => {
    onStatusFilterChange(event.target.value);
  };

  const rating_options = [2, 3, 4, 5];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        my: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        mx:3
      }}
    >
      <Typography variant="subtitle1" fontWeight={500} gutterBottom>
        Filter Products
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {/* Date  Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Date Added</InputLabel>
            <Select
              label="Date Added"
              value={dateFilter}
              onChange={handleDateChange}
            >
              <MenuItem value="all">All Dates</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">Last 7 days</MenuItem>
              <MenuItem value="month">Last 30 days</MenuItem>
              <MenuItem value="year">Last year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* category Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">Any category</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Clothes">Clothes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

       

        {/* Rating Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Min Rating</InputLabel>
            <Select
              label="Min Rating"
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {selected === "all" ? "Any Rating" : `${selected}+ `}
                  {selected !== "all" && (
                    <StarIcon fontSize="small" color="warning" />
                  )}
                </Box>
              )}
              value={ratingFilter}
              onChange={handleRatingChange}
            >
              <MenuItem value="all">Any Rating</MenuItem>

              {rating_options.map((value) => (
                <MenuItem key={value} value={value.toString()}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {value}
                    {value < 5 ? "+" : ""}
                    <StarIcon fontSize="small" color="warning" />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Product Status Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active" sx={{ gap: 0.5 }}>
                <IconButton color="success" size="small">
                  <CheckCircleOutlineOutlinedIcon />
                </IconButton>
                Active
              </MenuItem>
              <MenuItem value="inactive" sx={{ gap: 0.5 }}>
                <IconButton color="warning" size="small">
                  <WarningAmberOutlinedIcon />
                </IconButton>
                Inactive
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SimpleProductFilter;
