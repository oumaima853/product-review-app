




'use client';

import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

import React, { useState, useEffect } from 'react'; 


import {Stack,Typography} from "@mui/material";

import axios from 'axios';





const Bar = dynamic(
  () => import('@nivo/bar').then((m) => m.Bar),
  { ssr: false }
);








const ContentGrowthChart = () => {


   const [chartData, setChartData] = useState([]); 
  const [loading, setLoading] = useState(true);
   const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    const fetchData = async () => {
      try {
        const res = await axios.get('/api/admin/barChart-stats');
        setChartData(res.data);
      } catch (err) {
        console.error("Chart data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  console.log(chartData);
    
  

  const BarchartTheme = {
    
    
    "text": {
        "fontSize": 11,
        "fill": 'var(--mui-palette-text-primary,  #485aaf)',
        "outlineWidth": 0,
        "outlineColor": "#ffffff"
    },
    "axis": {
        "domain": {
            "line": {
                "stroke": 'var(--mui-palette-text-primary, #485aaf)',
                "strokeWidth": 1
            }
        },
        "legend": {
            "text": {
                "fontSize": 12,
                "fill": 'var(--mui-palette-text-primary, #485aaf)',// for count and 30days label
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            }
        },
        "ticks": {
            "line": {
                "stroke": 'var(--mui-palette-text-primary, #485aaf)',
                "strokeWidth": 1
            },
            "text": {
                "fontSize": 11,
                "fill": 'var(--mui-palette-text-primary, #485aaf)',// for axis values
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            }
        }
    },
    "grid": {
        "line": {
            "stroke": 'var(--mui-palette-text-primary, #485aaf)',
            "strokeWidth": 1
        }
    },
    "legends": {
        "title": {
            "text": {
                "fontSize": 11,
                "fill":  'var(--mui-palette-text-primary, #485aaf)' ,
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            }
        },
        "text": {
            "fontSize": 13,
            "fill":  'var(--mui-palette-text-primary, #485aaf)',// for products reviews users labels
            "outlineWidth": 0,
            "outlineColor": "#ffffff"
        },
        "ticks": {
            "line": {},
            "text": {
                "fontSize": 10,
                "fill": "red",
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            }
        }
    },
    "annotations": {
        "text": {
            "fontSize": 13,
            "fill": 'var(--mui-palette-text-primary, #485aaf)',
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "link": {
            "stroke": "#000000",
            "strokeWidth": 1,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "outline": {
            "stroke": "#000000",
            "strokeWidth": 2,
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        },
        "symbol": {
            "fill": "#000000",
            "outlineWidth": 2,
            "outlineColor": "#ffffff",
            "outlineOpacity": 1
        }
    },
    "tooltip": {
        "wrapper": {},
        "container": {
            "background": 'var(--mui-palette-grey-400, #485aaf)',
            "color":'var(--mui-palette-grey-800, #485aaf)',
            "fontSize": 12
        },
        "basic": {},
        "chip": {},
        "table": {},
        "tableCell": {},
        "tableCellValue": {}
    }
}




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



  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <Bar
        width={900}  
        height={520} 
      theme={BarchartTheme}

        data={chartData}
        keys={['products', 'reviews', 'users']} 
        indexBy="date" //  the x-axis (
        margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
        padding={0.3} 
        groupMode="grouped" 
        colors={{ scheme: 'set2' }} 
        borderRadius={3}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45, 
          legend: 'Last 30 Days',
          legendPosition: 'middle',
          legendOffset: 50,
           

        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
       
         
        
        animate={true} 
        motionStiffness={90}
        motionDamping={15}
      />
    </Box>
  )
}

export default ContentGrowthChart;