'use client';




import React from "react";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import  { useState, useEffect } from "react";






function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
   
    return <IconButton color="inherit"><DarkModeOutlinedIcon /></IconButton>;
  }





  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const currentIcon =
    mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />;

    

  return (
    <Tooltip
      title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      arrow
    >
      <IconButton
        onClick={toggleColorMode}
        aria-label="toggle light/dark mode"
        aria-pressed={mode === "dark"} 
        color="inherit"
        sx={{
          "&:hover": {
            backgroundColor: "action.hover",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {currentIcon}
      </IconButton>
    </Tooltip>
  );
}

export default ModeToggle;
