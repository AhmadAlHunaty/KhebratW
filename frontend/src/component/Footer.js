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

                bgcolor: '#385978',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                clear: 'both',
                padding:'50px 0'
            }}>
                <Box component='span' sx={{
                    color: '#fff', display: 'flex',
                }}>

                    


                </Box>
               

                <Box component='span' sx={{
                    color: '#fff', flexdirection: 'column', position: 'absoulte', width: '33%', alignItems: 'flex-bottom'
                }}>
                    <div style={{ marginTop: '70px' }}>
                        <h3>About</h3>
                        <p style={{ display: 'flex' }}>Khebrat website project aims to provide a comprehensive solution for companies to find and hire the right candidates and provide retirees with additional income that improves their life. It will also serve as important support for the national economy.
                            The website will allow companies to manage their recruitment process and retirees to receive work requests from anywhere, at any time.</p>
                    </div>
                   





                </Box >
                <div style={{borderColor:'#fff'}} class="vl"></div>
                <Box sx={{ color: '#fff', flexdirection: 'column', position: 'relative', width: '33%', alignItems: 'flex-bottom' }}>
              <div style={{display:'flex' ,alignItems:'center' , gap:'3rem', paddingTop:'50px'}}>
              <div className='Co'>
                        <div>
                            <h3 style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>Contact </h3>
                            <p style={{ position: 'relative' }}>Our Social Media  </p>
                            <p >
                                <Button type="button">
                                    <FacebookIcon style={{fill:'#fff'}} alt='FB Page' >
                                    </FacebookIcon>
                                </Button>
                                <Button type="button">
                                    <LinkedInIcon style={{fill:'#fff'}}>

                                    </LinkedInIcon>
                                </Button>
                                <Button type="button">
                                    <TwitterIcon style={{fill:'#fff'}}>

                                    </TwitterIcon>
                                </Button>



                            </p>
                            <p>Email</p>
                            <p>
                                <Button type='button'>
                                    <EmailIcon style={{fill:'#fff'}} alt='Email'></EmailIcon>
                                </Button>
                            </p>

                        </div>
                    </div>
                    <div>
                        <div>
                            <h3> Khebrat</h3>
                        </div>
                        <div style={{}}>
                            <h5> All rights reserved! 2023.</h5>
                        </div>
                    </div>
              </div>
                </Box>



            </Box >
        </>
    )
}

export default Footer