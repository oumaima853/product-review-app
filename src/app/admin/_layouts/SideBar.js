'use client';


import { styled, useTheme } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import React, { useState } from "react";
import { Collapse, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Avatar from "@mui/material/Avatar";

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useColorScheme } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";


import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

// handle logout 
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";








const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Array1 = [
  {
    icon: <QueryStatsOutlinedIcon />,
    text: "Statistics",
    path: "/admin",
  },

  { icon: <Inventory2OutlinedIcon />, text: "Products", path: "/admin/products" },
  { icon: <ReviewsOutlinedIcon />, text: "Reviews", path: "/admin/reviews" },
  { icon: <PermContactCalendarOutlinedIcon />, text: "Users", path: "/admin/users" },
  { icon: <BarChartOutlinedIcon />, text: "Bar chart", path: "/admin/barchart" },
  { icon: <PieChartOutlineOutlinedIcon />, text: "Pie chart", path: "/admin/piechart" },
  
];

const settingsItems = [
  
  {
    icon: <LockResetOutlinedIcon />,
    text: "Change Password",
    path: "/admin/changePassword",
  },
  { icon: <LogoutOutlinedIcon />, text: "Logout", path: "/logout" },
];




const SideBar = ({ open, handleDrawerClose }) => {

    const { data: session, status } = useSession();




  const theme = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };
   const router = useRouter();
 const pathname = usePathname();
  const { mode } = useColorScheme(); 


   const handleLogout = async () => {
      
      await signOut({ 
        callbackUrl: "/home", 
        redirect: true 
      });
  
    
      showSnackbar("You have been logged out", "info");
    };

















  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Avatar
        alt="Remy Sharp"
        sx={{
          mx: "auto",
          width: open ? 88 : 46,
          height: open ? 88 : 46,
          my: 1,
          border: "2px solid grey",
          transition: "0,25s",
        }}
        src= {`${session?.user.img}  `}
      />
      <Typography
        align="center"
        sx={{ fontSize: open ? 17 : 0, transition: "0,25s" }}
      >
         {`${session?.user.firstName}  ${session?.user.lastName}`}
      </Typography>
      <Typography
        align="center"
        sx={{
          fontSize: open ? 17 : 0,
          transition: "0,25s",
          color: "info.main",
        }}
      >
        Admin
      </Typography>

      <Divider />

      <List>
       
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                router.push(item.path);
              }}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,

                  bgcolor:
                    pathname === item.path
                      ? mode === "dark"
                        ?  blueGrey[500]
                        : grey[400]
                      : null,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />

        {/* Settings Section */}

       
        
        <ListItem key="settings" disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={handleSettingsClick}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />

            {open && (settingsOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* Show sub-menu only if both sidebar(Drawer) is open AND settings is expanded */}
        <Collapse in={settingsOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {settingsItems.map((item) => (
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  item.text === "Logout" && handleLogout()
                }}
                key={item.path}
                sx={{
                  pl: open ? 6 : 4, 
                  minHeight: 40,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem", 
                      },
                      
                    }}
                  />
                )}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};
export default SideBar;
