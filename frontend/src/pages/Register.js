import { Avatar, Box, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { userSignUpAction } from '../redux/actions/userAction'
import { useState } from 'react';


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
    passwordConfirmation: yup
        .string('Enter your password confirmation')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Confirmation Password is required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
        .oneOf([yup.ref('password')], 'Passwords does not match'),
    socialsecuritynumber: yup
        .string('Enter your social security number')
        .required('Social Security Number is required'),
    yearsOfExperience: yup
        .string('Enter your year of experience ')
        .required('Enter Your Years Number of Experience'),
    workfields: yup
        .string('Enter your workfield')
        .required('workfield is required'),
    workfield: yup
        .string('Enter your workfield')
        .required('Workfield is required'),
    gender: yup
        .string('Enter Your Gender')
        .required('Enter Your Gender'),
    bio: yup
        .string('Enter Your bio')
        .required('Enter Your bio'),


});

const VIEW_OPTIONS = {
    JOB_SEEKER: 1,
    CORPORATE: 0
}



const Register = () => {
    const [view, setView] = useState(null);
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            address: '',
            socialsecuritynumber: '',
            workfield: '',
            yearsOfExperience: '',
            bio: '',
            mobilenumber: '',
            role: view === VIEW_OPTIONS.JOB_SEEKER
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }

    })






    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                            <LockOpenIcon />
                        </Avatar>
                        {view === VIEW_OPTIONS.JOB_SEEKER ? (
                            <>
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name='firstName'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name='lastName'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name='email'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="E-mail"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type='password'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="passwordConfirmation"
                                    value={formik.values.PasswordConfirmation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                    helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="socialsecuritynumber"
                                    name="socialsecuritynumber"
                                    label="Social Security Number"
                                    type="socialsecuritynumber"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Social Security Number"
                                    value={formik.values.socialsecuritynumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.socialsecuritynumber && Boolean(formik.errors.socialsecuritynumber)}
                                    helperText={formik.touched.socialsecuritynumber && formik.errors.socialsecuritynumber}


                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="workfield"
                                    name="workfield"
                                    label="Work fields"
                                    type='textarea'

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Work field"
                                    value={formik.values.workfield}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.workfield && Boolean(formik.errors.workfield)}
                                    helperText={formik.touched.workfield && formik.errors.workfield}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    label="Years Of Experience"
                                    type='number'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Years Of Experience"
                                    value={formik.values.yearsOfExperience}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
                                    helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}


                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="gender"
                                    name="gender"
                                    label="Gender"
                                    type='number'

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="bio"
                                    name="bio"
                                    label="Bio "
                                    type='textarea'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Bio"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />
                            </>
                        ) : null}
                        {view === VIEW_OPTIONS.CORPORATE ? (
                            <>
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name='firstName'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />

                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name='lastName'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="nameOfCorporation"
                                    label="Name Of Corporation"
                                    name='nameOfCorporation'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="Name Of Corporation"
                                    value={formik.values.nameOfCorporation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nameOfCorporation && Boolean(formik.errors.nameOfCorporation)}
                                    helperText={formik.touched.nameOfCorporation && formik.errors.nameOfCorporation}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="email"
                                    label="E-mail"
                                    name='email'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="E-mail"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary',
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="mobilenumber"
                                    label="Mobile Number"
                                    name='mobilenumber'
                                    type='tel'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                    placeholder="Mobile Number"
                                    value={formik.values.mobilenumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobilenumber && Boolean(formik.errors.mobilenumber)}
                                    helperText={formik.touched.mobilenumber && formik.errors.mobilenumber}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="passwordConfirmation"
                                    value={formik.values.PasswordConfirmation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                    helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="workfield"
                                    name="workfield"
                                    label="Work fields"
                                    type='textarea'

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Work fields"
                                    value={formik.values.workfield}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.workfield && Boolean(formik.errors.workfield)}
                                    helperText={formik.touched.workfield && formik.errors.workfield}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="Address"

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: { borderColor: "rgb(231, 235, 240)" }
                                    }}
                                    fullWidth
                                    id="bio"
                                    name="bio"
                                    label="Bio of Corporate"
                                    type='textarea'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Bio of Corporate"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />
                            </>
                        ) : null}

                        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '100%', gap: 16, marginBottom: 12 }}>
                            <div style={{ paddingInlineEnd: 8 }}>
                                <FormLabel id="demo-radio-buttons-group-label">Type :</FormLabel>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <FormControlLabel value="as a job seeker" control={<Radio />} onClick={() => {
                                        setView(VIEW_OPTIONS.JOB_SEEKER);
                                    }}
                                        label="As a Job Seeker" />
                                    <FormControlLabel value="as a corporate" control={<Radio />} onClick={() => {
                                        setView(VIEW_OPTIONS.CORPORATE);
                                    }} label="As a Corporate" />
                                </div>
                            </RadioGroup>
                        </div>

                        <Button fullWidth variant="contained" type='submit' >Register</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Register