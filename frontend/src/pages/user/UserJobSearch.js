import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Container, Box, Typography, Stack, MenuItem, MenuList, Pagination, useTheme, Card } from '@mui/material';
import LoadingBox from './../../component/LoadingBox';
import CardElement from './../../component/CardElement';
import SearchInputEl from './../../component/SearchInputEl';
import SelectComponent from './../../component/SelectComponent';
import { jobLoadAction } from '../../redux/actions/jobAction'
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction'



const UserJobSearch = () => {
    const dispatch = useDispatch();
    const { jobs, setUniqueLocation, loading, pages } = useSelector(state => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const { keyword, location } = useParams();
    const [page, setPage] = useState(1);
    const [cat, setCat] = useState('');
    const { palette } = useTheme();

    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location, dispatch]);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, []);

    const handleChangeCategory = (e) => {
        setCat(e.target.value);
        setPage(1);
    }
    return (
        <>
            <Box sx={{ minHeight: "100vh" }}>
                <Container>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />
                            </Card>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by location
                                    </Typography>
                                    <MenuList>
                                        {setUniqueLocation?.map((location, i) => (
                                            <MenuItem key={i}>
                                                <Link style={{ color: palette.secondary.main }} to={`/user/jobList/${location}`}>
                                                    {location}
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Box>
                            </Card>
                        </Box>
                        <Container>
                            <Stack spacing={2}>
                                <SearchInputEl />
                                <Box sx={{ flex: 5, p: 2, position: 'relative', flexDirection: 'column' }}>
                                    {loading ? (
                                        <LoadingBox />
                                    ) : jobs?.length === 0 ? (
                                        <Box sx={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2>No result found!</h2>
                                        </Box>
                                    ) : (
                                        jobs?.map((job, i) => (
                                            <CardElement
                                                key={i}
                                                id={job._id}
                                                jobTitle={job.title}
                                                description={job.description}
                                                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                                                location={job.location}
                                            />
                                        ))
                                    )}
                                    <Stack spacing={2}>
                                        <Pagination
                                            color="primary"
                                            variant="outlined"
                                            page={page}
                                            count={pages === 0 ? 1 : pages}
                                            onChange={(event, value) => setPage(value)}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Container>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default UserJobSearch;