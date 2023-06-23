import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../images/jobbg.jpg';

import SearchInputEl from './SearchInputEl';


const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => (
        {
            marginTop:'50px',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 400,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: theme.palette.secondary.main
        }

    ));
    return (
        <>
            <StyleHeader >
       
            </StyleHeader>
        </>
    )
}

export default Header