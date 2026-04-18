'use client';
import * as React from 'react';
import { Box, TextField, Button, Snackbar, Alert, Typography, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

import { useSnackbar } from '@/providers/snackbarProvider';



const ChangePassword = () => {
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const { control, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      
      currentPassword: '',
      password: '', // new Password
      confirmPassword: ''
    }
  });

  const passwordValue = watch("password");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };


  const {showSnackbar} = useSnackbar();

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      
      const response = await axios.post('/api/admin/change-password', {
        
        currentPassword: data.currentPassword,
        newPassword: data.password
      });

      showSnackbar(" password changed successfuly","success");
      reset(); // clear form after success

    } catch (error) {
      console.error("Error:", error);
      showSnackbar(error.response?.data?.message || "Failed to change password","success");
      
    }
  };












  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography textAlign='center' variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
           Change Password
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
           


             <Controller
              name="currentPassword"
              control={control}
              rules={{ 
                required: 'Current password is required',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Current Password"
                  type="password"
                  margin="normal"
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                />
              )}
            />







            <Controller
              name="password"
              control={control}
              rules={{ 
                required: 'New Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="New Password"
                  type="password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

             <Controller
              name="confirmPassword"
              control={control}
              rules={{ 
                required: 'Confirm Password is required',
                validate: value => value === passwordValue || "Passwords do not match"
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />

            {errorMsg && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMsg}
              </Typography>
            )}

            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ px: 4, py: 1 }}
              >
                {isSubmitting ? "Processing..." : "Update Password"}
              </Button>
            </Box>
        </Box>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
