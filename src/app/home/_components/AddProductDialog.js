"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { useColorScheme } from "@mui/material";
import Stack from "@mui/material/Stack";

import { useState } from "react";
import { Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { ListItem, ListItemIcon } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";

import DragAndDrop from "@/app/home/_components/DragAndDrop";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import { FormControlLabel, Checkbox } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/*for rating */
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const AddProductDialog = ({ open, onclose }) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  // Validation rules
  const validationRules = {
    name: {
      required: "Name is required",

      maxLength: {
        value: 20,
        message: "Name must be at most 20 characters",
      },
    },
    price: {
      required: "Price is required",
    },
    description: {
      required: "Description is required",

      maxLength: {
        value: 20,
        message: "Description must be at most 200 words",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
    currentPassword: {
      required: "Current password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    newPassword: {
      required: "New password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    confirmPassword: {
      required: "Please confirm your password",
      /* validate: value => 
        value === newPassword || "Passwords do not match"*/
    },
  };

  const onSubmit = async (data) => {
    try {
      console.log("Changing password:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // handleClick();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to change password");
    }
  };

  /*for rating */
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  /*for checkbox */
  const [isVerified, setIsVerified] = useState(false);

  /*proof of purchase */

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Creates a temporary local URL for the image
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleClear = () => {
    setFile(null);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onclose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle
        textAlign={"center"}
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Add your product
        <Typography textAlign={"center"} variant="body1" sx={{ opacity: 0.9 }}>
          add your product to share experience with others or to get feedbacks
          before purchasing !
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Header Section */}

        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,

            mx: "auto",
            p: 3,
            border: "2px solid red",
            width: "80%",
          }}
          noValidate
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={5}
            justifyContent={"space-evenly"}
          >
            {/*name */}
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              sx={{
                width: "50%",
              }}
              {...register("name", validationRules.name)}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              required
            />
            {/*price */}
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              sx={{
                width: "50%",
              }}
              {...register("price", validationRules.price)}
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
              required
            />
          </Stack>

          {/*description */}
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            {...register("description", validationRules.description)}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            required
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
            <Typography> Your Rating :</Typography>
            <Rating
              name="hover-feedback"
              size="large"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2, color: "primary.main" }}>
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>

          {/*images */}
          <DragAndDrop />

          <Stack
            spacing={2}
            sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography variant="h6"> Product information</Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  color="success"
                />
              }
              label={
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography>
                    Is this product a confirmed purchase?{" "}
                  </Typography>
                  {isVerified && (
                    <VerifiedIcon color="success" fontSize="small" />
                  )}
                </Stack>
              }
            />
            {isVerified && (
              <Paper sx={{ p: 3, maxWidth: "100%", textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Please upload a photo of your receipt or a screenshot of your
                  confirmation email.
                </Typography>

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload Receipt
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                {file && (
                  <Stack alignItems="center" spacing={1}>
                    <img
                      src={file}
                      alt="Receipt preview"
                      style={{ width: "40%", borderRadius: "8px" }}
                    />
                    <Stack
                      direction="row"
                      alignItems="center"
                      color="success.main"
                      gap={1}
                    >
                      <CheckCircleIcon />
                      <Typography>Proof attached successfully!</Typography>
                    </Stack>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={handleClear}
                    >
                      Clear All
                    </Button>
                  </Stack>
                )}
              </Paper>
            )}
          </Stack>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                textTransform: "capitalize",
                px: 4,
                py: 1,
                minWidth: 150,
              }}
            >
              {isSubmitting ? "Processing..." : "Add product"}
            </Button>
            <Button
              type="reset"
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                px: 4,
                py: 1,
                ml: 2,
                minWidth: 150,
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onclose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
