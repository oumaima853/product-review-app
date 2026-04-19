'use client'



import HomePageHeaederPart1 from "@/app/home/_components/HomePageHeaederPart1";


import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, Button, Box, Typography, Container, 
  Paper, Avatar, Grid,  
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import axios from 'axios';

import { useSnackbar } from "@/providers/snackbarProvider";


export default function Login(){

    const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      position: '',
      image: null
    }
  });

  const {showSnackbar} = useSnackbar();


const onSubmit = async (data) => {
    try {
        let imageUrl = "";

        // 1. Upload to Cloudinary
        if (data.image) {
            const formData = new FormData();
            
           
            formData.append("file", data.image); 
            formData.append("upload_preset", "product_reviews");

            const cloudResponse = await axios.post(
                "https://api.cloudinary.com/v1_1/duoilxylp/image/upload",
                formData
            );
            
            imageUrl = cloudResponse.data.secure_url; 
        }

        // 2. Send to   API
        const response = await axios.post('/api/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            age: parseInt(data.age),
            email: data.email,
            password: data.password,
            position: data.position,
            
            img: imageUrl, 
        });

        if (response.status === 201 || response.status === 200) {
            console.log("Success:", response.data);
            showSnackbar("Account created successfully!", "success");
        }

    } catch (error) {
         showSnackbar("Email already exists!", "error");
    }
};









    return(<Box sx={{m :3 }}>

        <HomePageHeaederPart1/>
        

         <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Create Account</Typography>
            <Typography variant="body2" color="text.secondary">Join the ProductReview Hub community</Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={2}>
              
              {/* First Name & Last Name */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="First Name" error={!!errors.firstName} helperText={errors.firstName?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Last Name" error={!!errors.lastName} helperText={errors.lastName?.message} />
                  )}
                />
              </Grid>

              {/* Age & Position */}
              <Grid item xs={12} sm={4}>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: 'Age is required', min: { value: 13, message: 'Must be 13+' } }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="number" label="Age" error={!!errors.age} helperText={errors.age?.message} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Job Position (Optional)" />
                  )}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Email Address" error={!!errors.email} helperText={errors.email?.message} />
                  )}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} />
                  )}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12} >
                <Typography variant="body2" sx={{ mb: 1 }}>Profile Picture</Typography>
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files[0])}
                      />
                    </Button>
                  )}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 4, py: 1.5 }}>
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
        
        
        
        </Box>);
}