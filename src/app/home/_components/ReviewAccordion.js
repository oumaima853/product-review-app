'use client';




import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import TextField from "@mui/material/TextField";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewAccordion = () => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  return (
    <Box sx={{mt:1, mb:2 }}>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{
            border:2,
            borderColor:"primary.main"
          }}
         
        >
        
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,textAlign: "center" }}>
          <RateReviewOutlinedIcon color="primary" fontSize="small" />
          <Typography color="text.primary">Write a review</Typography>
        </Box>
          
        
        </AccordionSummary>
        <AccordionDetails>
             <Box sx={{  alignItems: "center", gap: 2 }}>
                <Typography sx={{mb:1}}>Description : </Typography>
                
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              placeholder="Share your experience with this product..."
                              
                              sx={{ mb: 2 }}
                            />
             </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography> Your Rating :</Typography>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon  style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box  sx={{ ml: 2, color:"primary.main" }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button type="submit"
          onClick={()=>{
            alert("review is submitted successfully!")
          }}
          >Submit</Button>
        </AccordionActions>
      </Accordion>
    </Box>
  );
};
export default ReviewAccordion;
