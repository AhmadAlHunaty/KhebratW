import {Typography, Box} from '@mui/material'
import {Stack} from '@mui/system'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import moment from 'moment'
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React, {useEffect, useState} from 'react'
>>>>>>> e7b8251cfddfa53a08f2ea3e32fef504f3368d67
import WorkRequest from "../../api/WorkRequest";


const UserDashboard = () => {
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [userWorkRequests, setUserWorkRequests] = useState([]);

    useEffect(() => {
        WorkRequest.getWorkRequests().then((res) => {
            console.log(res)
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
<<<<<<< HEAD
                        icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
=======
                        icon={<CalendarMonthIcon sx={{color: "#fafafa", fontSize: 30}}/>}
>>>>>>> e7b8251cfddfa53a08f2ea3e32fef504f3368d67
                        description="Member since"
                        money=''
                    />
                    <StatComponent
                        value={userWorkRequests.length}
<<<<<<< HEAD
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Number of work requests submitted"
=======
                        icon={<WorkIcon sx={{color: "#fafafa", fontSize: 30}}/>}
                        description="Number of jobs submitted"
>>>>>>> e7b8251cfddfa53a08f2ea3e32fef504f3368d67
                        money=''
                    />

                </Stack>
            </Box>


        </>
    )
}

export default UserDashboard