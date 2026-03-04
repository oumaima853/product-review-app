

'use client';


import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { useState } from "react";


 const ExpandableDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "unset" : 2,
          overflow: "hidden",
          color: "text.secondary",
        }}
      >
        {text}
      </Typography>
      <Link
        component="button"
        variant="caption"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsExpanded(!isExpanded);
        }}
        sx={{ mt: 0.5, fontWeight: "bold", cursor: "pointer", textDecoration: "none" }}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </Link>
    </Box>
  );
};
export default ExpandableDescription;
