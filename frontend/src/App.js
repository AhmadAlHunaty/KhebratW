import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
//import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/LogIn';
import UserDashboard from './pages/user/UserDashboard';
import EmployerRoute from './component/EmployerRoute';
import AdminRoute from './component/AdminRoute';
import JobSeekerRoute from './component/JobSeekerRoute';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/UserJobsHistory';
import JobSeekerRequests from './pages/user/JobSeekerRequests';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';
import Register from './pages/Register';
import DashCategory from './pages/admin/DashCategory';
import DashCreateJob from './pages/admin/DashCreateJob';
import DashCreateCategory from './pages/admin/DashCreateCategory';
import UserJobSearch from './pages/user/UserJobSearch';


import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { USER_ROLES } from './helper/enums';
import ResetPassword from './component/ResetPassword';
import ChangePassword from './component/ChangePassowrd';

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const JobSeekerJobsHistoryHOC = Layout(JobSeekerRequests);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory)
const DashCreateJobHOC = Layout(DashCreateJob)
const DashCreateCategoryHOC = Layout(DashCreateCategory)
const DashSearchHOC = Layout(UserJobSearch);





const App = () => {
    const { mode } = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);
    const { userInfo } = useSelector((state) => state.signIn);

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            {/* <Route path='/search/location/:location' element={<Home />} /> */}
                            {/* <Route path='/job-seeker/jobList/:keyword' element={<EmployerRoute><DashSearchHOC /></EmployerRoute>} /> */}
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/reset-password' element={<ResetPassword />} />
                            <Route path='/change-password' element={<ChangePassword />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                            <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />

                            <Route path='/job-seeker/jobs' element={<JobSeekerRoute><DashJobsHOC /></JobSeekerRoute>} />
                            {/* <Route path='/job-seeker/jobs' element={<JobSeekerRoute><DashJobsHOC /></JobSeekerRoute>} /> */}
                            <Route path='/job-seeker/job/create' element={<JobSeekerRoute><DashCreateJobHOC /></JobSeekerRoute>} />
                            <Route path='/job-seeker/edit/job/:id' element={<JobSeekerRoute><DashCreateJobHOC /></JobSeekerRoute>} />
                            <Route path='/job-seeker/job-requests' element={<JobSeekerRoute>< JobSeekerJobsHistoryHOC /></JobSeekerRoute>} />
                            {/* <Route path='/job-seeker/jobsList/:location' element={<JobSeekerRoute><DashSearchHOC /></JobSeekerRoute>} /> */}

                            
                            <Route path='/user/dashboard' element={(userInfo?.role === USER_ROLES?.JOB_SEEKER || userInfo?.role === USER_ROLES?.EMPLOYER) ? < UserDashboardHOC /> : <Navigate to='/'/>} />
                            <Route path='/user/jobs' element={<EmployerRoute>< UserJobsHistoryHOC /></EmployerRoute>} />
                            <Route path='/user/jobsList' element={<EmployerRoute>< DashSearchHOC /></EmployerRoute>} />
                            <Route path='/user/jobsList/:location' element={<EmployerRoute><DashSearchHOC /></EmployerRoute>} />
                            <Route path='/employer/jobList/:keyword' element={<EmployerRoute><DashSearchHOC /></EmployerRoute>} />
                            <Route path='/user/info' element={< UserInfoDashboardHOC />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App
