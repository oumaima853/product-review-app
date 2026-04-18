'use client';



import { Box, Typography, Paper, useTheme } from '@mui/material';
import ContentGrowthChart from "@/app/admin/_components/BarChart";
import PieChart from "@/app/admin/_components/PieChart";

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
        
       
      </Paper>
     
    
       

      
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