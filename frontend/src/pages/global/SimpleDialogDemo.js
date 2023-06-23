import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {blue} from '@mui/material/colors';
import {useEffect} from "react";
import Pusher from "pusher-js";
import {JOB_STATUS, USER_ROLES, WORK_REQUEST_STATUS} from "../../helper/enums";


function SimpleDialog(props) {
    const {onClose, selectedValue, open} = props;
    const [employerNotification, setEmployerNotification] = React.useState([]);
    const[jobSeekerNotification, setJobSeekerNotification] = React.useState([]);
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    useEffect(() => {
        const pusher = new Pusher('1d2155e8f9d2d65bf322', {
            cluster: 'ap2',
            encrypted: true,
        });

        const channel = pusher.subscribe('requests.' + user?.id);

        channel.bind('App\\Events\\NewWorkRequest', function (data) {
            setJobSeekerNotification([...jobSeekerNotification, data.workRequest]);
        });
        channel.bind('App\\Events\\WorkRequestSubmit', function (data) {
            setEmployerNotification([...employerNotification, data.workRequest]);

        });
    }, []);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Notifications</DialogTitle>
            <List sx={{pt: 0, minWidth: 400, minHeight: 400}}>
                {user.role === USER_ROLES.EMPLOYER ?
                    (
                    employerNotification?.map((workRequest) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(workRequest)} key={workRequest}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                    <PersonIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={workRequest.jop_seeker?.first_name}/>
                            <ListItemText primary={WORK_REQUEST_STATUS[workRequest.status]}/>
                        </ListItemButton>
                    </ListItem>
                ))):(
                jobSeekerNotification?.map((workRequest) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(workRequest)} key={workRequest}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                    <PersonIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={workRequest.employer.first_name}/>
                            <ListItemText primary={workRequest.description}/>
                        </ListItemButton>
                    </ListItem>
                )))
                }

                {/* <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(``);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <IconButton sx={{mr: 4}} onClick={handleClickOpen}>
                <NotificationsActiveIcon sx={{color: "#ffffff", fontSize: "25px", cursor: 'pointer'}}/>
            </IconButton>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}