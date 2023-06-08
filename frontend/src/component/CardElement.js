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
import { useDispatch, useSelector } from "react-redux";
import { JOB_STATUS } from "../helper/enums";

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
  const [isRequestSent, setIsRequested] = React.useState(null);
  const { userInfo: loggingUser } = useSelector((state) => state.signIn);

  const updateUserDetails = async () => {
    try {
      // setIsUserListLoading(true);
      const { data } = await axios.put(`/api/user/edit/${id}`, {
        ...user,
        rate: rate,
        feedback:
          user?.feedback?.length > 0
            ? [...user?.feedback, feedback]
            : [feedback],
      });
    } catch (error) {
      console.log("test");
    } finally {
      // setIsUserListLoading(false);
    }
  };

  const saveUserRequestJob = async () => {
    try {
      // setIsUserListLoading(true);
      const requestJob = { user: loggingUser?.user, applicationStatus: JOB_STATUS.Pending };
      // const JobSeekerId = loggingUser?.user?._id;

      const updateJobRequests = user?.jobsRequests?.length > 0
      ? [...user?.jobsRequests, requestJob]
      : [requestJob];

      const { data } = await axios.put(`/api/user/edit/${user?._id}`, {
        ...user,
        jobsRequests: updateJobRequests,
      });

      if (data?.success) {
        setIsRequested(true);
      }
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
        <Typography variant="h5" component="div" style={{ color: 'blue', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ borderRadius: '50%', backgroundImage: 'url(https://th.bing.com/th/id/R.359b5fa2df39f0e8e853c1b46394c4f4?rik=ZGASyMnZ9FCxCg&pid=ImgRaw&r=0)', backgroundSize: 'cover', width: 38, height: 38 }}> </div>
          {jobTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user?.gender ? "Male" : "Female"} <br />
          {`Years of Experience: ${user?.yearsOfExperience}`}
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
        <Button
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
          style={{ backgroundColor: "#0000FF" }}
          onClick={() => {
            // if (!isRequestSent) {
              saveUserRequestJob();
            // }
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            // to={`/job/${id}`}
          >
            {isRequestSent ? "Sent" : "Request Job"}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardElement;
