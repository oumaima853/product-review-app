'use client';




import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import  useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollToTop=()=>{

    const trigger = useScrollTrigger({
        threshold: 100, 
    });

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return(
        <Zoom in={trigger}>
          
              <Fab 
              onClick={handleClick}
              variant='extended'
              size="small"
                color="primary" 
                aria-label="scroll back to top"
                
                sx={{ 
                    position: "fixed", 
                    bottom: 33, 
                    right: 33, 
                    zIndex: 2000, // Ensure it is above footers/tables
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)' 
                }}
            >
                <KeyboardArrowUpOutlinedIcon />
            </Fab>
        </Zoom>
    )
}
export default ScrollToTop;