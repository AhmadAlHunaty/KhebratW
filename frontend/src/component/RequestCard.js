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

const RequestCard = ({
  jobTitle,
  description,
  category,
  location,
  id,
  user,
  request
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  // const [rate, setRate] = React.useState(user?.rate || 0);
  // const [feedback, setFeedback] = React.useState(user?.feedback || []);
  const [isRequestSent, setIsRequested] = React.useState(null);
  const { userInfo: loggingUser } = useSelector((state) => state.signIn);

  const saveUserRequestJob = async (status) => {
    try {
      // setIsUserListLoading(true);
      const update = { user: user, applicationStatus: status };

      const updateJobRequests = loggingUser?.user?.jobsRequests?.map(item => {
        if (item?.user?._id === update?.user?._id) {
          return update;
        }

        return item;
      })

      const { data } = await axios.put(`/api/user/edit/${loggingUser?.user?._id}`, {
        ...loggingUser?.user,
        jobsRequests: updateJobRequests,
      });

      // if (data?.success) {
      //   setIsRequested(true);
      // }
    } catch (error) {
      console.log("test");
    } finally {
      // setIsUserListLoading(false);
    }
  };

  const getCorpRequestStatus = (statusId) => {
    switch(statusId) {
      case JOB_STATUS.Pending: return 'Pending';
      case JOB_STATUS.Approved: return 'Approved';
      case JOB_STATUS.Reject: return 'Reject';
      default: return '';
    }
  }

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
          {user?.bio}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Status: {getCorpRequestStatus(request?.applicationStatus)}
        </Typography>
      </CardContent>
      { request?.applicationStatus === JOB_STATUS.Pending ? <CardActions>
        <Button disableElevation variant="contained" startIcon={<AddIcon />} style={{ backgroundColor: "#008000" }}
        onClick={saveUserRequestJob(JOB_STATUS.Approved)}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
          >
            Approved
          </Link>
        </Button>
        <Button
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
          style={{ backgroundColor: "#FF0000" }}
          onClick={() => {
            // if (!isRequestSent) {
              saveUserRequestJob(JOB_STATUS.Reject);
            // }
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            // to={`/job/${id}`}
          >
            Reject
          </Link>
        </Button>
      </CardActions> : null}
    </Card>
  );
};

export default RequestCard;
