import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Avatar, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { allUserAction, userSignUpAction } from '../../redux/actions/userAction'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Button from '@mui/material/Button';
import { userAction } from './../../redux/actions/userAction';







const UserInfoDashboard = ({ userProfile }) => {
    const dispatch = useDispatch();

    const validationSchema = yup.object({
        firstName: yup
            .string('Enter your First Name')
            .min(3, 'First Name should be of minimum 3 characters length')
            .required('First Name is required'),
        lastName: yup
            .string('Enter your Last Name')
            .min(3, 'Last Name should be of minimum 3 characters length')
            .required('Last Name is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: yup
            .string('Re-enter your password')
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        yearsOfExperience: yup
            .string('Enter your years of experience')
            .required('Years of Experience is required'),
        bio: yup
            .string('Enter your bio')
            .required('Bio is required'),
        // Add validation schema for other fields
    });

    const initialValues = {
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        email: userProfile?.email || '',
        password: '',
        confirmPassword: '',
        yearsOfExperience: '',
        bio: '',
        // Add initial values for other fields
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(user(values)); // Dispatch the action to update the user's profile
        },
    });
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', backgroundColor: '#f2f2f2', borderRadius: '8px' }}>
            <Typography variant="h6">Edit Profile</Typography>
            <form style={{ display: 'grid', gap: '1rem' }} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    label="Years of Experience"
                    value={formik.values.yearsOfExperience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
                    helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
                />

                <TextField
                    fullWidth
                    id="bio"
                    name="bio"
                    label="Bio"
                    multiline
                    rows={4}
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}
                />


                {/* Add TextField components for other fields */}
                {/* ... */}

                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </form>
        </div>
    );
};





export default UserInfoDashboard

