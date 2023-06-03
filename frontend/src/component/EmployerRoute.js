import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { USER_ROLES } from '../helper/enums';

const EmployerRoute = ({ children }) => {

    const { userInfo } = useSelector((state) => state.signIn);
    return userInfo && userInfo.role === USER_ROLES?.EMPLOYER ? children : <Navigate to="/" />;
}

export default EmployerRoute