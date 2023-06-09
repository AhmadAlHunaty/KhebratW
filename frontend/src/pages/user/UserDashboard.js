import {Typography, Box} from '@mui/material'
import {Stack} from '@mui/system'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import WorkRequest from "../../api/WorkRequest";


const UserDashboard = () => {
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [userWorkRequests, setUserWorkRequests] = useState([]);

    useEffect(() => {
        WorkRequest.getWorkRequests().then((res) => {
            setUserWorkRequests(res.data);
        });
    }, []);



    return (
        <>
            <Box>

                <Typography variant="h4" sx={{color: "white", pb: 3}}>
                    Dashboard
                </Typography>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 1, sm: 2, md: 4}}
                >

                    <StatComponent
                        value={user && moment(user.created_at).format('YYYY / MM / DD')}
                        icon={<CalendarMonthIcon sx={{color: "#fafafa", fontSize: 30}}/>}
                        description="Member since"
                        money=''
                    />
                    <StatComponent
                        value={userWorkRequests.length}
                        icon={<WorkIcon sx={{color: "#fafafa", fontSize: 30}}/>}
                        description="Number of jobs submitted"
                        money=''
                    />

                </Stack>
            </Box>


        </>
    )
}

export default UserDashboard