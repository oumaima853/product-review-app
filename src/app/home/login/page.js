'use client'



import HomePageHeaederPart1 from "@/app/home/_components/HomePageHeaederPart1";


import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Avatar 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import axios from 'axios';
import { useSnackbar } from "@/providers/snackbarProvider";

import { useRouter } from 'next/navigation';


//import signIn function from nextAuth created  
import { signIn } from 'next-auth/react'; 




export default function Login(){

    const router = useRouter();
  

    const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {showSnackbar} = useSnackbar();

 

const onSubmit = async (data) => {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false, 
  });

  if (result.error) {
    

    if (result.error === "pending-approval" || result.code === "pending-approval") {
      showSnackbar("Account pending admin approval. Please wait.", "warning");
    } else {
      showSnackbar("Invalid email or password.", "error");
    }
    return;
  }

  /* manage favorite products  */
    if (result?.ok) {
    // 1. Check for guest favorites
    const guestFavs = localStorage.getItem("guest_favorites");

    if (guestFavs) {
      const productIds = JSON.parse(guestFavs);
      
      if (productIds.length > 0) {
        // 2. Send them to  SYNC API 
        await axios.post('/api/registred-users/add-favorites', { productIds });
        
        // 3. Clear the localStorage
        localStorage.removeItem("guest_favorites");
      }
    }}



  


   // If no error, proceed with success logic
  showSnackbar("Login successful!", "success");



    // 1. Fetch the session we just created to see the role
    const res = await fetch('/api/auth/session');
    const session = await res.json();

    // 2. Redirect based on the role
    if (session?.user?.role === 'ADMIN') {
      router.push('/admin'); // Send Admin to Dashboard
    } else {
      router.push('/home');  // Send regular User to Home
    }

    router.refresh(); 
  
};








 



    return(<Box sx={{ border: 1, borderColor: "rgba(215, 187, 30, 1)",m :3 }}>

        <HomePageHeaederPart1/>
        

        <Container maxWidth="xs">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ProductReview Hub
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>


          </Box>

           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>

            <Typography component="h1" variant="h5">
              Demo Credentials :
            </Typography>
          <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
            <Typography variant="body1" color="text.primary">
              <strong>Admin:</strong>
              admin@test.com / password123
            </Typography>

            <Typography variant="body1" color="text.primary">
              <strong>User:</strong>
             Petra@test.com / password123
            </Typography>
          
  

          </Box>


         

          







          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Sign In
            </Button>
          </form>

        </Paper>
      </Box>
    </Container>
        
        
        
        </Box>);
}