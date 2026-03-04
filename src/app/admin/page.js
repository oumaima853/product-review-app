'use client';



import { Grid, Box, Typography, Paper, useTheme } from '@mui/material';
import ContentGrowthChart from "@/app/admin/_components/BarChart";
import PieChart from "@/app/admin/_components/PieChart";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';

import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';



const Statistics = () => {
  const theme = useTheme();
  
  return ( 
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          color="primary"
          fontWeight="600"
        >
          Platform Insights
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: '800px' }}
        >
          A comprehensive view of your community&apos;s growth and engagement over the last 30 days. 
          Track how products, reviews, and users are evolving to better understand platform dynamics.
        </Typography>
        
        {/* updated timestamp */}
        <Typography 
          variant="caption" 
          color="text.disabled"
          sx={{ display: 'block', mt: 1 }}
        >
          Last updated: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
      </Paper>
     
    
        <Grid container spacing={2} sx={{ m: 2 ,display:'flex', justifyContent:'space-evenly'}}>
          <Grid item xs={12} sm={4} sx={{minWidth:'200px'}}>
            <Paper 
              sx={{ 
                p: 2.5, 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.primary.light}05 100%)`,
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <ShoppingBagIcon 
                  sx={{ 
                    mr: 1.5, 
                    color: theme.palette.primary.main,
                    fontSize: 28
                  }} 
                />
                <Typography variant="h6" fontWeight="600">
                  Total Products
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="700" color="primary">
                1,234
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +12% from last month
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper 
              sx={{ 
                p: 2.5, 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.secondary.light}10 0%, ${theme.palette.secondary.light}05 100%)`,
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <RateReviewIcon 
                  sx={{ 
                    mr: 1.5, 
                    color: theme.palette.secondary.main,
                    fontSize: 28
                  }} 
                />
                <Typography variant="h6" fontWeight="600">
                  Total Reviews
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="700" color="secondary">
                8,901
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +24% from last month
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Paper 
              sx={{ 
                p: 2.5, 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.success.light}10 0%, ${theme.palette.success.light}05 100%)`,
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <PeopleIcon 
                  sx={{ 
                    mr: 1.5, 
                    color: theme.palette.success.main,
                    fontSize: 28
                  }} 
                />
                <Typography variant="h6" fontWeight="600">
                  Active Users
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="700" color="success.main">
                5,678
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +18% from last month
              </Typography>
            </Paper>
          </Grid>
        </Grid>

      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>


        {/* Bar Chart */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            width: '100%',
            height:'650px',
           
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            
          }}
        >

          
<div
style={{
  display:"flex", gap:"20px"
}} 
>
   <TrendingUpOutlinedIcon color="primary" fontSize="large"/>
    <Typography 
            variant="h5" 
            gutterBottom
            fontWeight="500"
          >
            30-Day Growth Trends
          </Typography>
</div>
         
        
          
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Daily activity for products, reviews, and user signups
          </Typography>



          
          
          
          <Box style={{ margin: "0 auto", display: "block" }}>
            <ContentGrowthChart />
          </Box>
        </Paper>

        {/* Pie Chart */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            width: '100%',
            height:'600px',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >

<div
style={{
  display:"flex", gap:"20px"
}} 
>
  <DonutSmallOutlinedIcon color="primary" fontSize="large"/>
   <Typography 
            variant="h5" 
            gutterBottom
            fontWeight="500"
          >
            
             Content Distribution
          </Typography>
</div>
          
         
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Current breakdown of platform content
          </Typography>
          
          <Box sx={{ 
            height: '400px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            <div  style={{ margin: "0 auto", display: "block" }}><PieChart /></div>
            
          </Box>
        </Paper>
      </Box>

     
    </Box>
  );
};

export default Statistics;