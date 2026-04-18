'use client';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';

import {Stack,Typography} from "@mui/material";


import axios from 'axios';



const Pie = dynamic(
  () => import('@nivo/pie').then((m) => m.Pie),
  { 
    ssr: false, 
    loading: () => (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <CircularProgress /> 
      </Box>
    ) 
  }
);




const PieChart = () => {


   const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

   
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    const fetchPieData = async () => {
      try {
        const res = await axios.get('/api/admin/pieChart-stats');
        setChartData(res.data);
      } catch (err) {
        console.error("Failed to load pie data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPieData();




  }, []);



  

 if (!isClient || loading ) return (
     <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" 
      sx={{ backgroundColor: 'background.default' }} 
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress size={50} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary" fontWeight="medium">
          Loading session...
        </Typography>
      </Stack>
    </Box>
  );



  const theme = {
     text: {
      fill: 'var(--mui-palette-text-primary, #485aaf)',
      fontSize: 13,
    },
    tooltip: {
      container: {
        background: 'var(--mui-palette-grey-400, #485aaf)',
        color: 'var(--mui-palette-grey-800, #485aaf)',
      }
    }
  };

  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <Pie
        width={900}  
        height={520} 
        data={chartData}
        theme={theme}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
       
        arcLinkLabelsTextColor='var(--mui-palette-text-primary, #485aaf)'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            symbolShape: 'circle',
            itemTextColor: 'var(--mui-palette-text-secondary, #485aaf)',
          }
        ]}
      />
    </Box>
  );
}

export default PieChart;
