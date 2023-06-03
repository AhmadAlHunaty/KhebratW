import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'
import Navbar from '../../component/Navbar';
import { Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, useTheme } from '@mui/material'
import SelectComponent from '../../component/SelectComponent';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../../component/Header';
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../../component/LoadingBox'
import { jobLoadAction } from '../../redux/actions/jobAction'
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardElement from '../../component/CardElement'



const UserDashboard = () => {
    const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { keyword, location } = useParams();
    const [cat, setCat] = React.useState('');
    const handleChangeCategory = (e) => {
        setCat(e.target.value);
    }


    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location]);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, []);


    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    Dashboard
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value={user && moment(user.createdAt).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Member since"
                        money=''
                    />
                    <StatComponent
                        value={user && user.jobsHistory.length}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Number of jobs submitted"
                        money=''
                    />





                </Stack>
            </Box>


        </>
    )
}

export default UserDashboard