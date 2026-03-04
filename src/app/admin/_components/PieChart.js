'use client';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';


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

const data = [
  { "id": "products", "label": "Products", "value": 469, "color": "hsl(156, 70%, 50%)" },
  { "id": "users", "label": "Users", "value": 333, "color": "hsl(338, 70%, 50%)" },
  { "id": "reviews", "label": "Reviews", "value": 321, "color": "hsl(72, 70%, 50%)" },
];

const PieChart = () => {
 
  const [isClient, setIsClient] = useState(false);

   
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
        data={data}
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
