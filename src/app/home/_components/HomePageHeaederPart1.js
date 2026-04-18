import Box from "@mui/material/Box";
import ModeToggle from "@/Components/ModeToggle";
import { Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";



export default function HomePageHeaederPart1 (){

    return (
         <Box
                sx={{
                  bgcolor: "background.paper",
                  py: 1,
                  px: 10,
        
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  borderBottom: 1,
                  borderColor: "divider",
                  boxShadow: "0px 2px 8px #686363ff",
        
                
                }}
              >
                <Container
                  maxWidth={false} 
                  disableGutters 
                  sx={{
                    "&.MuiContainer-root": { px: 6 } ,
                   
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: "primary.main",
                          color: "rgba(226, 228, 228, 1)",
                          borderRadius: "12px",
                          fontSize: "16px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                        }}
                        variant="body2"
                      >
                        ProductReview Hub
                      </Typography>
        
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "text.secondary",
                          display: { xs: "none", sm: "block" },
                        }}
                        variant="body2"
                      >
                        Discover the Best, Together.
                      </Typography>
                    </Box>
        
                  
                    <Box flexGrow={1}></Box>
        
                   
        
                    
        
                    <ModeToggle />
                  </Stack>
                </Container>
              </Box>
    );

    
}