import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Header from '../component/Header'
import { Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { jobLoadAction } from '../redux/actions/jobAction'
import { Link, useParams } from 'react-router-dom'
import CardElement from '../component/CardElement'
import Footer from '../component/Footer'
import LoadingBox from '../component/LoadingBox'
import SelectComponent from '../component/SelectComponent'
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './Home.css';



const Home = () => {
    const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);

    const { palette } = useTheme();
    // const dispatch = useDispatch();
    // const { keyword, location } = useParams();

    // const [page, setPage] = useState(1);

    // useEffect(() => {
    //     dispatch(jobLoadAction(page, keyword, cat, location));
    // }, [page, keyword, cat, location]);

    // useEffect(() => {
    //     dispatch(jobTypeLoadAction());
    // }, []);

    // const [cat, setCat] = React.useState('');
    // const handleChangeCategory = (e) => {
    //     setCat(e.target.value);
    // }

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>

                <Navbar />
                <Header />
                <div className='Middel-contanier' style={{ backgroundColor: '#8696FE', height: '500px' }}>
                    <div className='p-middle' style={{ width: '50%', float: 'left' }}>
                        <img className='img-home' src={require('./../images/fotor_2023-5-27_20_47_23.png')} />

                    </div>
                    <div className='p-middle' style={{ width: '50%', float: 'right', marginTop: '6%' }}>
                        <div className='' style={{ width: '100%' }} ><h1> Welcome To Khebrat App</h1></div>
                        <div className='' style={{ width: '100%' }}>
                            <p> Khebrat website is a national developmental project that aims to form a link between retirees looking for work (as part time or full-time consultants) and companies or businesses which looking for experienced persons, whether as consultants or employees for limited or unlimited periods.</p>
                        </div>
                    </div>





                </div>




            </Box >
            <Footer />


        </>
    )
}

export default Home