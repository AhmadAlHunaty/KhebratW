import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {IconButton, TextField, useTheme} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Rating from "@mui/material/Rating";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {JOB_STATUS} from "../helper/enums";
import Feedback from "../api/Feedback";
import WorkRequest from "../api/WorkRequest";

const CardElement = ({
                         jobTitle,
                         description,
                         category,
                         location,
                         id,
                         user,
                     }) => {
        const {palette} = useTheme();
        const dispatch = useDispatch();
        const [rate, setRate] = React.useState(user?.rating || 0);
        const [feedback, setFeedback] = React.useState(user?.feedback || []);
        const [isRequestSent, setIsRequested] = React.useState(null);
        const {userInfo: loggingUser} = useSelector((state) => state.signIn);

        const updateUserDetails = async () => {
            Feedback.createFeedback({
                jop_seeker_id: id,
                notes: feedback,
                rating: rate,
            }).then((res) => {
                console.log(res);
            })
        };

        const saveUserRequestJob = async () => {
            WorkRequest.createWorkRequest({
                'job_seeker_id': id,
                'description': 'I want to work with you',
            }).then((res) => {
                console.log(res);
                setIsRequested(true);
            })
        };

        return (
            <Card sx={{minWidth: 325, mb: 3, mt: 3, bgcolor: palette.primary.white}}>
                <CardContent>
                    <Typography
                        sx={{fontSize: 15, color: palette.secondary.main, fontWeight: 500}}
                        gutterBottom
                    >
                        <IconButton>
                            <LocationOnIcon
                                sx={{color: palette.secondary.main, fontSize: 18}}
                            />
                        </IconButton>{" "}
                        {location}
                    </Typography>
                    <Typography variant="h5" component="div"
                                style={{color: 'blue', display: 'flex', alignItems: 'center', gap: 8}}>
                        <div style={{
                            borderRadius: '50%',
                            backgroundImage: 'url(https://th.bing.com/th/id/R.359b5fa2df39f0e8e853c1b46394c4f4?rik=ZGASyMnZ9FCxCg&pid=ImgRaw&r=0)',
                            backgroundSize: 'cover',
                            width: 38,
                            height: 38
                        }}></div>
                        {jobTitle}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {category}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {user?.gender} <br/>
                        {`Years of Experience: ${user?.years_of_experience}`}
                    </Typography>
                    <Typography variant="body2">
                        Skills: {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
                    </Typography>
                    <div
                        style={{margin: "20px 0", display: "flex", alignItems: "center"}}
                    >
                        <Typography component="body2">Rate:</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rate / 2}
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
                            fieldset: {borderColor: "rgb(231, 235, 240)"},
                        }}
                        fullWidth
                        id="notes"
                        name="notes"
                        label="Feedback"
                        required={true}
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
                    <Button disableElevation variant="contained" startIcon={<AddIcon/>}>
                        <Link
                            style={{textDecoration: "none", color: "white", boxShadow: 0}}
                            onClick={updateUserDetails}
                        >
                            Save
                        </Link>
                    </Button>
                    <Button
                        disableElevation
                        variant="contained"
                        startIcon={<AddIcon/>}
                        style={{backgroundColor: "#0000FF"}}
                        onClick={saveUserRequestJob}
                    >
                        <Link
                            style={{textDecoration: "none", color: "white", boxShadow: 0}}
                        >
                            {isRequestSent ? "Sent" : "Request Job"}
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        );
    }
;

export default CardElement;
