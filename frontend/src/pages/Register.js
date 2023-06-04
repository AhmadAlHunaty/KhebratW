import {Avatar, Box, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup} from '@mui/material'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux'
import {userSignUpAction} from '../redux/actions/userAction'
import {useEffect, useState} from 'react';
import {USER_ROLES} from '../helper/enums';
import Country from "../api/Country";
import WorkField from "../api/WorkField";
import Select from "@mui/material/Select";


const validationSchema = yup.object({
    first_name: yup
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    last_name: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(2, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    password_confirmation: yup
        .string('Enter your password confirmation')
        .min(2, 'Password should be of minimum 8 characters length')
        .required('Confirmation Password is required')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
        .oneOf([yup.ref('password')], 'Passwords does not match'),
    social_security_number: yup
        .string('Enter your social security number'),
    years_of_experience: yup
        .string('Enter your year of experience '),
    work_field_id: yup
        .string('Enter your workfield'),
    nameOfCorporation: yup
        .string('Enter your workfield'),

});


const Register = () => {

    /* countries state */
    const [countries, setCountries] = useState([]);
    const [workFields, setWorkFields] = useState([]);
    useEffect(() => {
        Country.getCountries().then((res) => {
            setCountries(res.data);
        });

        WorkField.getWorkFields().then((res) => {
            setWorkFields(res.data);
        });

    }, []);
    const [view, setView] = useState('job_seeker');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            const data = {...values, role: view}
            dispatch(userSignUpAction(data));
            actions.resetForm();
        }

    })

    return (
        <>
            <Navbar/>
            <Box sx={{
                height: '81vh',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.white"
            }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
                        <Avatar sx={{m: 1, bgcolor: "primary.main", mb: 3}}>
                            <LockOpenIcon/>
                        </Avatar>
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
                            }}
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name='first_name'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="First Name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
                            }}
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name='last_name'
                            InputLabelProps={{
                                shrink: true,
                            }}

                            placeholder="Last Name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                        />

                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
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
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
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
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
                            }}
                            fullWidth
                            id="password_confirmation"
                            name="password_confirmation"
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
                                    color: 'text.secondary',
                                },
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
                            }}
                            fullWidth
                            id="phone_number"
                            label="Mobile Number"
                            name='phone_number'
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
                        {
                            (countries && workFields && countries.length > 0 && workFields.length > 0) && (
                                <>
                                <Select
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: {borderColor: "rgb(231, 235, 240)"}
                                    }}
                                    fullWidth
                                    id="country_id"
                                    name="country_id"
                                    label="Country"
                                    type="country"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.country_id && Boolean(formik.errors.country_id)}
                                    helperText={formik.touched.country_id && formik.errors.country_id}
                                >
                                    {countries && countries.map((country) => (
                                        <MenuItem key={country.code} value={country.id}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <Select
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: {borderColor: "rgb(231, 235, 240)"}
                                    }}
                                    fullWidth
                                    id="work_field_id"
                                    name="work_field_id"
                                    label="Work Field"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Work Field"
                                    value={formik.values.work_field_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.work_field_id && Boolean(formik.errors.work_field_id)}
                                    helperText={formik.touched.work_field_id && formik.errors.work_field_id}
                                >
                                    {workFields && workFields.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                </>
                            )

                        }
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary'
                                },
                                fieldset: {borderColor: "rgb(231, 235, 240)"}
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
                        {view === USER_ROLES.JOB_SEEKER ? (
                            <>
                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: {borderColor: "rgb(231, 235, 240)"}
                                    }}
                                    fullWidth
                                    id="socialsecuritynumber"
                                    name="social_security_number"
                                    label="Social Security Number"
                                    type="social_security_number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="Social Security Number"
                                    value={formik.values.social_security_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.social_security_number && Boolean(formik.errors.social_security_number)}
                                    helperText={formik.touched.social_security_number && formik.errors.social_security_number}


                                />

                                <TextField
                                    sx={{
                                        mb: 3,
                                        "& .MuiInputBase-root": {
                                            color: 'text.secondary'
                                        },
                                        fieldset: {borderColor: "rgb(231, 235, 240)"}
                                    }}
                                    fullWidth
                                    id="years_of_experience"
                                    name="years_of_experience"
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

                            </>
                        ) : null}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            width: '100%',
                            gap: 16,
                            marginBottom: 12
                        }}>
                            <div style={{paddingInlineEnd: 8}}>
                                <FormLabel id="demo-radio-buttons-group-label">Type :</FormLabel>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <FormControlLabel value="as a job seeker" control={<Radio/>} onClick={() => {
                                        setView(USER_ROLES.JOB_SEEKER);
                                    }}
                                                      label="As a Job Seeker"
                                                      checked={true}
                                    />
                                    <FormControlLabel value="as a corporate" control={<Radio/>} onClick={() => {
                                        setView(USER_ROLES.EMPLOYER);
                                    }} label="As a Corporate"/>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button fullWidth variant="contained" type='submit'>Register</Button>
                    </Box>
                </Box>
            </Box>
            <Footer/>
        </>
    )
}

export default Register
