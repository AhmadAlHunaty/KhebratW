import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, menuClasses, useProSidebar, } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box, TextField, useTheme } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Person3Icon from '@mui/icons-material/Person3';
import Avatar from '@mui/material/Avatar';
import logoDashboard from '../../images/hr-project.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import ReactDOM from 'react-dom';
import { USER_ROLES } from '../../helper/enums';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
import Input from '@mui/material/Input';
// import React from 'react';
// import './SideBar.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Auth from "../../api/Auth";


const SidebarAdm = () => {
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const defaultAvatar = user.image ? 'http://localhost:8000/storage/images/' + user.image.path : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000';
    const [image, setImage] = useState('');
    const { palette } = useTheme();
    const { collapsed } = useProSidebar();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    };

    const handleImageEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);
        Auth.editProfilePicture(formData).then((res) => {
            localStorage.setItem('userInfo', JSON.stringify(res.data.user));
            e.target.reset();
        }).catch((error) => {
            console.log(error);
        });

    }


    //log out
    const logOut = () => {
        dispatch(userLogoutAction());
        // window.location.reload(true);
        navigate('../', { replace: true })
        // setTimeout(() => {
        //     navigate('/');
        // }, 500)
    }


    return (
        <>
            <Sidebar backgroundColor="#003366" style={{ borderRightStyle: "none" }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "100%",
                    position: 'relative'
                }}>
                    <Box>
                        <Box sx={{
                            width: '100%', display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            p: 1,
                            m: 1,
                            borderRadius: 1,
                        }}>

                            {/* {
                                collapsed ?
                                    <Avatar alt="logo dashboard" src={logoDashboard} /> : */}
                            <Box component={"form"}
                                sx={{ display: "flex", justifyContent: "center", position: 'relative' }}
                                // component={"form"}
                                onSubmit={handleImageEdit}
                            >

                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '400px',
                                    flexDirection: 'column',
                                    overflow: 'auto',
                                }}>

                                    <img src={avatarSrc} alt="Profile Picture" style={{
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: '10px',
                                        padding: '10px',
                                        width: '100%', /* Adjust the width as needed */
                                        height: '200px',/* Maintain the aspect ratio of the image */
                                        border: 'none',

                                    }} />

                                    <div style={{
                                        width: '100%',
                                        textalign: 'left',
                                        color: 'white',
                                        marginTop: '10px'
                                    }}></div>

                                    <Input className="profile-picture" type="file"
                                        name={"image"}
                                        onChange={handleFileChange} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            marginTop: '70px',
                                            width: '100%', /* Adjust the width as needed */
                                            height: '200px',/* Maintain the aspect ratio of the image */
                                            borderRadius: '50%', /* Make the image round */
                                        }}
                                    />
                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        backgroundColor: '#003366',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }} type={"submit"}>Save
                                    </button>

                                </div>
                            </Box>
                            {/* } */}

                            <Box sx={{
                                maxWidth: "100%",
                                margin: "auto",
                                pt: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}>
                                <Card sx={{ minWidth: 100, bgcolor: palette.secondary.midNightBlue }}>
                                    <CardContent>


                                        <Typography
                                            variant="h7" component="div" sx={{ color: "#fafafa" }}>
                                            {user && user.first_name} {user && user.last_name}
                                            {user && user.workfield?.name}
                                            {user && user.phone_number}
                                        </Typography>


                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Menu

                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#fafafa",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "rgba(23,105,170, 1)",
                                        color: "#fafafa",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        // color: "blue",
                                        color: palette.secondary.main,
                                        //color: "red",
                                    }
                                },
                            }}

                        >
                            {
                                user && user?.role === USER_ROLES.ADMIN ?
                                    <>
                                        <MenuItem component={<Link to="/admin/dashboard" />}
                                            icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem component={<Link to="/admin/users" />}
                                            icon={<GroupAddIcon />}> Users </MenuItem>
                                        <MenuItem component={<Link to="/admin/jobs" />}
                                            icon={<WorkIcon />}> Jobs </MenuItem>
                                        <MenuItem component={<Link to="/admin/category" />}
                                            icon={<CategoryIcon />}> Category </MenuItem>
                                    </> :
                                    user && user?.role === USER_ROLES.EMPLOYER ?
                                        <>
                                            <MenuItem component={<Link to="/user/dashboard" />}
                                                icon={<DashboardIcon />}> Dashboard </MenuItem>
                                            <MenuItem component={<Link to="/user/jobs" />}
                                                icon={<WorkHistoryIcon />}> User List </MenuItem>
                                            {/* ??<MenuItem component={<Link to="/user/jobsList" />} icon={<WorkIcon />}> Jobs List  </MenuItem> */}
                                            <MenuItem component={<Link to="/user/info" />}
                                                icon={<Person3Icon />}> Personal Info </MenuItem>
                                        </>
                                        : user && user?.role === USER_ROLES.JOB_SEEKER ?
                                            <>
                                                <MenuItem component={<Link to="/user/dashboard" />}
                                                    icon={<DashboardIcon />}> Dashboard </MenuItem>
                                                {/* <MenuItem component={<Link to="/job-seeker/jobs" />} icon={<WorkHistoryIcon />}> Applied Jobs </MenuItem> */}
                                                <MenuItem component={<Link to="/job-seeker/job-requests" />}
                                                    icon={<WorkHistoryIcon />}> Work Requests </MenuItem>
                                                <MenuItem component={<Link to="/user/info" />}
                                                    icon={<Person3Icon />}> Personal Info </MenuItem>
                                            </> : null
                            }

                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#fafafa",
                                    },

                                    '&:hover': {
                                        backgroundColor: "rgba(23,105,170, 1)",
                                        color: "#fafafa",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        // color: "blue",
                                        color: palette.secondary.main,
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={logOut} icon={<LoginIcon />}> Log out </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
}

export default SidebarAdm