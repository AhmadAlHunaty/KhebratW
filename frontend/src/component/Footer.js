import { Box, Button, SvgIcon } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {
    const { palette } = useTheme();
    return (
        <>

            <Box sx={{

                bgcolor: palette.secondary.midNightBlue,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',

                alignItems: 'center',
                clear: 'both'

            }}>
                <Box component='span' sx={{
                    color: palette.primary.main, display: 'flex',
                    // flexdirection: 'column',

                    // justifyitems: 'start',

                    // marginleft: '3%',
                    // paddingtop: '10%',
                    // width: '100px',
                    // paddingbottom: '3%',
                    // height: '100px',
                    // position: 'relative',
                    // // paddingRight: '10%'
                }}>

                    <img className='img-footer' src={require('./../images/fotor_2023-5-27_20_47_23.png')} style={{

                    }}  ></img>


                </Box>
                <div class="vl"></div>

                <Box component='span' sx={{
                    color: palette.primary.main, flexdirection: 'column', position: 'absoulte', width: '33%', alignItems: 'flex-bottom'
                }}>
                    <div style={{ marginTop: '70px' }}>
                        <h3>About</h3>
                        <p style={{ display: 'flex' }}>Khebrat website project aims to provide a comprehensive solution for companies to find and hire the right candidates and provide retirees with additional income that improves their life. It will also serve as important support for the national economy.
                            The website will allow companies to manage their recruitment process and retirees to receive work requests from anywhere, at any time.</p>
                    </div>
                    < div style={{ paddingTop: '50px', position: 'absoulte', }} >
                        <div>
                            <h3> Khebrat</h3>
                        </div>
                        <div style={{}}>
                            <h5> All rights reserved! 2023.</h5>
                        </div>
                    </div>





                </Box >
                <div class="vl"></div>
                <Box sx={{ color: palette.primary.main, flexdirection: 'column', position: 'relative', width: '33%', alignItems: 'flex-bottom' }}>
                    <div className='Co'>
                        <div>
                            <h3 style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>Contact </h3>
                            <p style={{ position: 'relative' }}>Our Social Media  </p>
                            <p >
                                <Button type="button">
                                    <FacebookIcon alt='FB Page' >
                                    </FacebookIcon>
                                </Button>
                                <Button type="button">
                                    <LinkedInIcon>

                                    </LinkedInIcon>
                                </Button>
                                <Button type="button">
                                    <TwitterIcon>

                                    </TwitterIcon>
                                </Button>



                            </p>
                            <p>Email</p>
                            <p>
                                <Button type='button'>
                                    <EmailIcon alt='Email'></EmailIcon>
                                </Button>
                            </p>

                        </div>
                    </div>

                </Box>



            </Box >
        </>
    )
}

export default Footer