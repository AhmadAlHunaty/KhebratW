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
import {useEffect} from "react";
import WorkRequest from "../api/WorkRequest";

const RequestCard = ({
                         jobTitle,
                         description,
                         category,
                         location,
                         id,
                         user,
                         request
                     }) => {
    const {palette} = useTheme();
    const dispatch = useDispatch();
    // const [rate, setRate] = React.useState(user?.rate || 0);
    // const [feedback, setFeedback] = React.useState(user?.feedback || []);
    const [isRequestSent, setIsRequested] = React.useState(null);
    const {userInfo: loggingUser} = useSelector((state) => state.signIn);
    const [status, setStatus] = React.useState();

    const saveUserRequestJob =  (status) => {
        WorkRequest.submitWorkRequest(id, {
            status: status
        })
            .then((res) => {
                setStatus(getCorpRequestStatus(status));
                window.location.reload();
            })
    };

    const getCorpRequestStatus = (statusId) => {
        switch (statusId) {
            case JOB_STATUS.Pending:
                return 'Pending';
            case JOB_STATUS.Approved:
                return 'Approved';
            case JOB_STATUS.Reject:
                return 'Reject';
            default:
                return '';
        }
    }

    useEffect(() => {
        if (request.status === JOB_STATUS.Pending) {
            setStatus('Pending')
        } else if (request.status === JOB_STATUS.Approved) {
            setStatus('Approved')
        } else if (request.status === JOB_STATUS.Reject) {
            setStatus('Reject')
        }
    }, []);

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
                <Typography variant="h5" component="div">
                    {jobTitle}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {category}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {user?.bio}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Status: {status}
                </Typography>
            </CardContent>
            {request?.status === JOB_STATUS.Pending ? <CardActions>
                <Button disableElevation variant="contained" startIcon={<AddIcon/>} style={{backgroundColor: "#008000"}}
                        onClick={() => saveUserRequestJob(JOB_STATUS.Approved, id)}
                >
                    <Typography
                        style={{textDecoration: "none", color: "white", boxShadow: 0}}
                    >
                        Approve
                    </Typography>
                </Button>
                <Button
                    disableElevation
                    variant="contained"
                    startIcon={<AddIcon/>}
                    style={{backgroundColor: "#FF0000"}}
                    onClick={() => saveUserRequestJob(JOB_STATUS.Reject, id)}
                >
                    <Typography
                        style={{textDecoration: "none", color: "white", boxShadow: 0}}
                        // to={`/job/${id}`}
                    >
                        Reject
                    </Typography>
                </Button>
            </CardActions> : null}
        </Card>
    );
};

export default RequestCard;
