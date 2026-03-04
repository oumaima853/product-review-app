'use client';

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const ProductManagementFooter = ({ stats }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, my: 2, mx: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ flexGrow: 1, m: 2 }}
            >
              <CheckCircleOutlineOutlinedIcon
                color="success"
                fontSize="small"
              />
              <Typography variant="body2">
                Active products : {stats.active}
              </Typography>
            </Stack>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderRightWidth: 3, borderColor: "primary.default" }}
            />
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ flexGrow: 1, m: 2 }}
            >
              <WarningAmberOutlinedIcon color="warning" fontSize="small" />
              <Typography variant="body2">
                under review : {stats.inactive}
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default ProductManagementFooter;
