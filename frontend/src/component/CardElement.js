import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, TextField, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { ALL_USER_LOAD_SUCCESS } from "../redux/constants/userConstant";
import { useDispatch } from "react-redux";

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  user,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [rate, setRate] = React.useState(user?.rate || 0);
  const [feedback, setFeedback] = React.useState(user?.feedback || []);

  const updateUserDetails = async () => {
    try {
      // setIsUserListLoading(true);
      const { data } = await axios.put(`/api/user/edit/${id}`, {
        ...user,
        rate: rate,
        feedback: [...user?.feedback, feedback],
      });
    } catch (error) {
      console.log("test");
    } finally {
      // setIsUserListLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 325, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}
          gutterBottom
        >
          <IconButton>
            <LocationOnIcon
              sx={{ color: palette.secondary.main, fontSize: 18 }}
            />
          </IconButton>{" "}
          {location}
        </Typography>
        <Typography variant="h5" component="div">
          {jobTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user?.gender ? 'Male' : 'Female'}
        </Typography>
        <Typography variant="body2">
          Skills: {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
        </Typography>
        <div
          style={{ margin: "20px 0", display: "flex", alignItems: "center" }}
        >
          <Typography component="body2">Rate:</Typography>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </div>
        <TextField
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              color: "text.secondary",
            },
            fieldset: { borderColor: "rgb(231, 235, 240)" },
          }}
          fullWidth
          id="feedback"
          name="feedback"
          label="Feedback"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Provide your feedback!"
          value={feedback}
          onChange={(e) => setFeedback(e?.target?.value)}
          helperText={"Provide your feedback"}
        />
      </CardContent>
      <CardActions>
        <Button disableElevation variant="contained" startIcon={<AddIcon />}>
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            onClick={updateUserDetails}
          >
            Save
          </Link>
        </Button>
        <Button disableElevation variant="contained" startIcon={<AddIcon />}>
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            to={`/job/${id}`}
          >
            More Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardElement;
