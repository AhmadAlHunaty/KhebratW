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
import newImage from '../images/Khebrat Home Page Image1.jpg'; // Path to your image file





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
            <Box sx={{ bgcolor: "#f7f7f7", minHeight: "100vh" }}>

                <Navbar />
                <Header />
                <div className='Middel-contanier' style={{ backgroundColor: '#f7f7f7', height: '500px' }}>
                    <div className='p-middle' style={{padding:'30px',display:'flex',alignItems:'center'}}>
                        <div className='' style={{ color:'#385978',fontSize:'30px',textAlign:'left' ,marginTop:'40px',marginLeft:'270px',marginBottom:'1px'}} ><h1> What is <br/>KHEBRAT</h1></div>
                            <p style={{fontSize:'30px',lineHeight:'40px',marginTop: '90px', marginLeft: '100px',marginBottom: 'px'}}> Khebrat website is a national developmental project <br/>that aims to form a link between retirees looking <br/> for work (as part time or full-time consultants) <br/>and companies or businesses which looking <br/>for experienced persons, whether as consultants <br/> or employees for limited or unlimited periods.</p>
                    </div>





                </div>
                <div className='newimage' style={{ backgroundColor: '#f7f7f7', height: '500px' }}>
                <img src={newImage} alt="New Image" />
                    </div>




            </Box >
            <Footer />


        </>
    )
}

export default Home