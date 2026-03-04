'use client';




import { Box, Container, Typography, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: 'divider',
        borderRadius:"5px"
      }}
    >
      <Container maxWidth="lg">
       
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
            ProductReview Hub
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            Your trusted source for honest product reviews from real people
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack 
          direction="row" 
          justifyContent="center" 
          spacing={3} 
          sx={{ mb: 1 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <FacebookIcon sx={{ fontSize: 30, color: '#1877F2', }} />
            <Typography variant="caption" display="block" color="text.secondary">
              Facebook
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <TwitterIcon sx={{ fontSize: 30, color: '#1DA1F2', }} />
            <Typography variant="caption" display="block" color="text.secondary">
              Twitter
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <InstagramIcon sx={{ fontSize: 30, color: '#E4405F', }} />
            <Typography variant="caption" display="block" color="text.secondary">
              Instagram
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <InfoIcon sx={{ fontSize: 30, color: 'primary.main',  }} />
            <Typography variant="caption" display="block" color="text.secondary">
              Blog
            </Typography>
          </Box>
        </Stack>

        

        <Box sx={{ 
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(0,0,0,0.02)' 
              : 'rgba(255,255,255,0.05)',
          p: 2,
          borderRadius: 1,
          mb: 2,
        }}>
          <Typography variant="body2" color="text.secondary" align="center">
           
            <strong >Transparency Notice:</strong> All reviews are from verified purchases. 
            We never accept payment for reviews. Our community is built on honesty and trust.
          </Typography>
        </Box>

        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ fontSize: '0.875rem' }}
        >
          © {new Date().getFullYear()} ProductReview Hub. 
          <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            Making online shopping transparent since 2024.
          </Typography>
        </Typography>
        
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="center"
          sx={{ display: 'block', mt: 1, opacity: 0.7 }}
        >
          This is a demonstration platform. All content is for showcase purposes.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;