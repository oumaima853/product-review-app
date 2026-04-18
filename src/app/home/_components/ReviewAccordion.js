'use client';

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { 
  Accordion, AccordionActions, AccordionSummary, AccordionDetails, 
  Box, Typography, Button, TextField, Rating 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { useSnackbar } from "@/providers/snackbarProvider";


const labels = {
  0.5: "Useless", 1: "Useless+", 1.5: "Poor", 2: "Poor+", 2.5: "Ok",
  3: "Ok+", 3.5: "Good", 4: "Good+", 4.5: "Excellent", 5: "Excellent+",
};







const ReviewAccordion = ({ productId }) => {



   const {showSnackbar} = useSnackbar();



  const [hover, setHover] = useState(-1);
  const [expanded, setExpanded] = useState(false);

  const { register, handleSubmit, control, reset, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      content: "",
      rate: 3,
    }
  });

  const ratingValue = watch("rate");

  //  Handle Form Submission
  const onSubmit = async (data) => {
    try {
      // Add the productId  to the data being sent
      const payload = { ...data, productId  };
      
      await axios.post('/api/registred-users/add-review', payload);
      
      
      showSnackbar(" Review submitted successfully!", "success")
      reset(); // Clear form
      setExpanded(false); // Close accordion
     
    } catch (error) {
      console.error("Submission error:", error);
      
      showSnackbar(" Failed to submit review ! Please try again", "error")
    }
  };

  return (
    <Box sx={{ mt: 1, mb: 2 }}>

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            sx={{ border: 2, borderColor: "primary.main" }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RateReviewOutlinedIcon color="primary" fontSize="small" />
              <Typography color="text.primary">Write a review</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>Description :</Typography>
              <TextField
                {...register("content", { required: "Please write a comment" })}
                multiline
                rows={3}
                fullWidth
                placeholder="Share your experience..."
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography>Your Rating :</Typography>
              
              
              <Controller
                name="rate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => onChange(newValue)}
                    onChangeActive={(event, newHover) => setHover(newHover)}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                )}
              />
              
              <Box sx={{ ml: 2, color: "primary.main" }}>
                {labels[hover !== -1 ? hover : ratingValue]}
              </Box>
            </Box>
          </AccordionDetails>

          <AccordionActions>
            <Button onClick={() => { reset(); setExpanded(false); }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </AccordionActions>
        </Accordion>
      </form>
    </Box>
  );
};

export default ReviewAccordion;
