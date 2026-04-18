

'use client';


import useSWR from "swr";
import axios from "axios"; 
import Link from "next/link";


import Badge from '@mui/material/Badge';




import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import ModeToggle from "@/Components/ModeToggle";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));



const fetcher = (url) => axios.get(url).then((res) => res.data);


const TopBar = ({ open, handleDrawerOpen }) => {

 
  const { data, error, isLoading } = useSWR("/api/admin/pending-count", fetcher, {
    refreshInterval: 30000, 
    revalidateOnFocus: true, 
  });


  const pendingCount = data?.count || 0;

  if (error) console.error("Failed to load notifications");





  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          Administrator control panel
        </Typography>
       

        <Box flexGrow={1} />
        <Stack direction={"row"} gap={20} alignItems={"center"}>
          

         
<Link href="/admin/users">
 <Badge
            badgeContent={ !isLoading && pendingCount > 0 ? pendingCount : ""} 
            color="error"
            sx={{marginRight:"12px"}}
            >
            <NotificationsOutlinedIcon />
    </Badge>


<span>Pending Users</span>
</Link>


<ModeToggle />
          

        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
