'use client';



import * as React from "react";

import HeroSection from "@/app/home/_components/HeroSection";

import Box from "@mui/material/Box";
import ModeToggle from "@/Components/ModeToggle";
import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Tooltip from "@mui/material/Tooltip";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import Avatar from '@mui/material/Avatar';

import {
 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
 
  
} from "@mui/material";

const languages = ["EN", "DE"];
const categories = ["All categories", "Clothes", "Electronics", "Books"];

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  border: "1px solid #777",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  minWidth: "300px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const HomePageHeader = ({
  isGuest,
  isRegisteredUser,
  isAdmin,
  currentUser,
  searchTerm, 
  onSearchChange,
   categoryFilter,
  oncategoryFilterChange,
}) => {
  
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [selectedlanguageIndex, setSelectedlanguageIndex] = useState(0);
  const languageOpen =
    Boolean(
      languageAnchorEl
    ); /*to handle open and close state, or simply it can use anchorEl directly instead of creating open variable*/
  const handleLanguageClickListItem = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuItemClick = (event, index) => {
    setSelectedlanguageIndex(index);
    setLanguageAnchorEl(null);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  /* states for category selector !  */
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const categoryOpen =
    Boolean(
      categoryAnchorEl
    ); 
  const handleCategoryClickListItem = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuItemClick = (event, index) => {
    setSelectedCategoryIndex(index);
    setCategoryAnchorEl(null);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };
  

  const { mode } = useColorScheme(); 

  // Manually check mode and set color
  const myColor = mode === "dark" ? "#4b4d51ff" : "#dde0e3ff";
  console.log(myColor);


   const handleCategoryChange = (event) => {
    oncategoryFilterChange(event.target.value);
  };

  return (
    <Box sx={{ border: 1, borderColor: "blue" }}>
      
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

          border: 1,
          borderColor: "blue",
        }}
      >
        <Container
          maxWidth={false} 
          disableGutters 
          sx={{
            "&.MuiContainer-root": { px: 6 } ,
            border: 1,
            borderColor: "red",
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

            {/*language selector */}

            <List
              component="nav"
              aria-label="Device settings"
             

              sx={{
                bgcolor: "background.paper",
                ".MuiTypography-root": { fontSize: "14px", fontWeight: 500 },
                p: 0,
                m: 0,
              }}
            >
              <ListItem
                id="language-button"
                aria-haspopup="listbox"
                aria-controls="language-menu"
                aria-label="when device is locked"
                onClick={handleLanguageClickListItem}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    bgcolor: "action.hover",
                    borderRadius: 1,
                  },
                  px: 1.5,
                  py: 0.5,
                  minHeight: "auto",
                }}
              >
                <ListItemText secondary={languages[selectedlanguageIndex]} />
                {/*<ExpandMoreOutlinedIcon sx={{ fontSize: "14px" }} />*/}
                {languageOpen ? (
                  <ExpandLess sx={{ fontSize: "14px" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "14px" }} />
                )}
              </ListItem>
            </List>
            <Menu
              id="language-menu"
              anchorEl={languageAnchorEl}
              open={languageOpen}
              onClose={handleLanguageClose}
              slotProps={{
                list: {
                  "aria-labelledby": "language-button",
                  role: "listbox",
                },
              }}
            >
              {languages.map((option, index) => (
                <MenuItem
                  sx={{ fontSize: "14px", p: "3px 10px", minHeight: "10px" }}
                  key={option}
                  selected={index === selectedlanguageIndex}
                  onClick={(event) => handleLanguageMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <ModeToggle />
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          my: 1,

          py: 1,
          px: 10,
          bgcolor:
            mode === "dark" ? "rgba(5, 5, 5, 1)" : "rgba(240, 245, 244, 1)",
          borderBottom: 1,
          borderTop: 1,
          borderColor: "divider",
          borderRadius: 2,
          border: 1,
          borderColor: "blue",
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "&.MuiContainer-root": { px: 6 },
            border: 1,
            borderColor: "red",
          }}
        >
          <Stack alignItems={"center"}>
            <QuestionAnswerTwoToneIcon color="primary" />
            <Typography variant="body2" sx={{ ml: "5px" }}>
              Social Commerce
            </Typography>
          </Stack>

          <Search
            sx={{
              borderRadius: "22px",
              display: "flex",
              justifyContent: "space-between",
              borderColor: "divider",

              boxShadow: 1,
              "&:hover": {
                boxShadow: 2,
                borderColor: "primary.main",
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <div >
              {/* category Filter */}
        <Grid item xs={12} sm={6} md={3} >
          <FormControl fullWidth size="small" >
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={categoryFilter}
              onChange={handleCategoryChange}
              style={{ borderRadius:"15px"}}
            >
              <MenuItem value="all">Any category</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Clothes">Clothes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
            </div>
          </Search>

          <Stack direction={"row"} textAlign={"center"}>
            
            {isGuest && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    mx: 1,
                    textTransform: "capitalize",
                    fontSize: "14px",
                  }}
                  startIcon={<LoginOutlinedIcon />}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "120px",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    backgroundColor: "primary.main",
                  }}
                >
                  Register
                </Button>
              </>
            )}

            {isRegisteredUser && (
             <>
    <Box 
    sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 1.5,
      padding: "4px 8px",
      borderRadius: "24px",
      transition: "0.3s",
      "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } 
    }}>
      <Avatar 
        alt={currentUser.name} 
        src="/static/images/avatar/1.jpg" 
        sx={{ width: 32, height: 32, border: "1px solid #ddd" }} 
      />
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600, 
          color: "text.primary",
          letterSpacing: "0.5px"
        }}
      >
        {currentUser.name}
      </Typography>
    </Box>

    <Button
      variant="outlined" 
      color="info" 
      sx={{
        height: "42px",
        borderRadius: "18px",
        px: 2,
        mx: 1,
        textTransform: "none", 
        fontSize: "13px",
        fontWeight: 500,
        "&:hover": {
          borderColor: "error.main",
          bgcolor: "rgba(211, 47, 47, 0.04)"
        }
      }}
      startIcon={<LogoutOutlinedIcon sx={{ fontSize: 18 }} />}
    >
      Logout
    </Button>
  </>
            )}
          </Stack>
        </Container>
      </Box>

      {/*hero section */}
      {isGuest && (
      <HeroSection />
      )}
    </Box>
  );
};
export default HomePageHeader;
