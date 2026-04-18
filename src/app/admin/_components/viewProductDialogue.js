"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide,
  DialogContent, TextField, Box, Stack, Rating,  Paper,Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

import WarningAmberIcon from '@mui/icons-material/WarningAmber';






const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const labels = {
  0.5: "Useless", 1: "Useless+", 1.5: "Poor", 2: "Poor+", 2.5: "Ok",
  3: "Ok+", 3.5: "Good", 4: "Good+", 4.5: "Excellent", 5: "Excellent+",
};

const ViewProductDialog = ({ open, onclose, productData, handleAction }) => {

  const [value, setValue] = useState(0);//  handle rate  when rendering 
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (productData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(productData.rate || 0);
      setIsVerified(productData.isVerified || false);
    }
  }, [productData, open]);

  return (
    <Dialog fullScreen open={open} onClose={onclose} TransitionComponent={Transition}>

      {/* Header  */}
      <AppBar sx={{ position: "relative", bgcolor: "info.main" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Product Inspection Mode
          </Typography>
          <Button autoFocus color="inherit" onClick={onclose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
          <Typography variant="h4" fontWeight={600}>Reviewing: {productData?.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            Carefully check the product details and proof image before approving.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mx: "auto", width: "80%", pb: 5 }}>
          
          {/* Main Info  */}
          <Stack direction={"row"} gap={5}>
            <TextField
              label="Product Name"
              fullWidth
              value={productData?.name || ""}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
            <TextField
              label="Category"
              fullWidth
              value={productData?.category?.name || "No Category"}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
            <TextField
              label="Price ($)"
              fullWidth
              value={productData?.price || ""}
              InputProps={{ readOnly: true }}
              variant="filled"
            />
          </Stack>

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={productData?.description || ""}
            InputProps={{ readOnly: true }}
            variant="filled"
          />

          {/* Rating Display */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">User Rating:</Typography>
            <Rating
              value={value}
              precision={0.5}
              readOnly
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography sx={{ color: "primary.main", fontWeight: 'bold' }}>
              {labels[value] || ""}
            </Typography>
          </Box>


          {/* PROOF IMAGE  */}
          <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>Verification Proof Image</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
              {productData?.verifiedProofImg ? (
                <Box 
                  component="img"
                  src={productData.verifiedProofImg}
                  alt="Verification Proof"
                  sx={{ 
                    maxWidth: "100%", 
                    maxHeight: 500, 
                    borderRadius: 2, 
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" 
                  }}
                />
              ) : (
                <Typography color="error" variant="h6">
                  <WarningAmberIcon/> No Verification Image Uploaded
                </Typography>
              )}
            </Box>
          </Paper>

          {/*  actions */}

          <Stack direction="row" justifyContent="center" spacing={3}>
            {!isVerified && (
              <Button 
                variant="contained" 
                color="success" 
                size="large"
                onClick={() => { handleAction(productData.id, 'accept'); onclose(); }}
              >
                 Approve
              </Button>
            )}
            <Button 
              variant="outlined" 
              color="error" 
              size="large"
              onClick={() => { handleAction(productData.id, 'delete'); onclose(); }}
            >
              Reject 
            </Button>
          </Stack>

          

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProductDialog;
