'use client';



import * as React from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useColorScheme } from '@mui/material';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  // Validation rules
  const validationRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address"
      }
    },
    currentPassword: {
      required: "Current password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    },
    newPassword: {
      required: "New password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    },
    confirmPassword: {
      required: "Please confirm your password",
      validate: value => 
        value === newPassword || "Passwords do not match"
    }
  };

    

 const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };






  const onSubmit = async (data) => {
    try {
      console.log("Changing password:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleClick();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to change password");
    }
  };


  const { mode } = useColorScheme();



  return (


    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>

    {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
         
          
          borderRadius: 2
        }}
      >
        <Typography textAlign={'center'} variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
           Change Password
        </Typography>
        <Typography textAlign={'center'} variant="body1" sx={{ opacity: 0.9 }}>
          Update your account password to keep your account secure
        </Typography>
      </Paper>
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 3,
       
        mx: "auto",
        p: 3,
      }}
      noValidate
    >
      <TextField
        label="Email"
        type="email"
        variant="filled"
        fullWidth
        {...register("email", validationRules.email)}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        label="Current Password"
        type="password"
        variant="filled"
        fullWidth
        {...register("currentPassword", validationRules.currentPassword)}
        error={Boolean(errors.currentPassword)}
        helperText={errors.currentPassword?.message}
      />

      <TextField
        label="New Password"
        type="password"
        variant="filled"
        fullWidth
        {...register("newPassword", validationRules.newPassword)}
        error={Boolean(errors.newPassword)}
        helperText={errors.newPassword?.message}
      />

      <TextField
        label="Confirm New Password"
        type="password"
        variant="filled"
        fullWidth
        {...register("confirmPassword", validationRules.confirmPassword)}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />

      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ 
            textTransform: "capitalize",
            px: 4,
            py: 1,
            minWidth: 150
          }}
        >
          {isSubmitting ? "Processing..." : "Change Password"}
        </Button>
      </Box>

       {/* Snackbar  */}
    <Snackbar anchorOrigin={{ vertical:"top", horizontal:"right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Password changed successfully!
        </Alert>
      </Snackbar>
    </Box>

   </Box>





  );
};

export default ChangePassword;