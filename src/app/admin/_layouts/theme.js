import { createTheme } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
const Theme = createTheme({
  
  
  

  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
        background: {
          default: grey[300],
          paper: grey[200],
        },
        text: {
          primary:  grey[800], 
          secondary:  grey[700], 
        },
          

        grey: {
        400: grey[400], 
        800: grey[800],  
      },
     
      },
    },
    dark: {
      palette: {
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" },
        background: {
          default: grey[900], 
          paper: grey[800],  
        },
        text: {
          primary: grey[300],
          secondary: grey[400], 
        },
       
          grey: {
        400: blueGrey[100],  
        800: blueGrey[700],  
      },
      
      },
    },
  },
  components: {
  MuiTooltip: {
    defaultProps: {
        enterDelay: 500,    
        leaveDelay: 200,    
        arrow: true,        
      },
    styleOverrides: {
      tooltip: {
          backgroundColor: 'var(--mui-palette-grey-400)', //  Light: grey[400], Dark: blueGrey[800]
          color: 'var(--mui-palette-grey-800)', 
      },
      arrow: {
        color:  'var(--mui-palette-grey-400)',        
      },
    },
  },

  
  MuiAppBar: {
      defaultProps: {
        color: 'default', 
       
      },
      styleOverrides: {
        root: {
         
          backgroundColor: 'var(--mui-palette-background-paper)',
          color: 'var(--mui-palette-text-primary)',
        },
      },
      
    },
},
   
  cssVariables: {
    colorSchemeSelector: "class", // Enables manual toggling
  },
});

export default Theme;
