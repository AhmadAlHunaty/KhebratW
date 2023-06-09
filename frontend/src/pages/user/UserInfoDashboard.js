
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {
  userLogoutAction,
    userUpdateAction,
} from "../../redux/actions/userAction";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {USER_ROLES} from "../../helper/enums";
import Auth from "../../api/Auth";
import {useNavigate} from "react-router-dom";

const UserInfoDashboard = () => {
    const dispatch = useDispatch();
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [loggingUser, setlogginUser] = React.useState(user || null);
    const navigate = useNavigate();

    const handleChange = (e, key) => {
        setlogginUser((prev) => {
            return {
                ...prev,
                [key]: e?.target?.value
            }
        })
    }


    const updateUserDetails = async (e) => {
        e.preventDefault();
        dispatch(userUpdateAction(loggingUser))

    };

    const deleteUserById = async () => {
        Auth.deleteAccount().then((res) => {
            dispatch(userLogoutAction());
            navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "0 auto",
                padding: "1rem",
                backgroundColor: "#f2f2f2",
                borderRadius: "8px",
            }}
        >
            <Typography marginBottom='20px' variant="h6">Edit Profile</Typography>
            <form
                style={{display: "grid", gap: "1rem"}}
                onSubmit={updateUserDetails}
            >
                <TextField
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={loggingUser?.first_name}
                    onChange={(e) => {
                        handleChange(e, 'first_name')
                    }}
                />

                <TextField
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={loggingUser?.last_name}
                    onChange={(e) => {
                        handleChange(e, 'last_name')
                    }}
                />

                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={loggingUser?.description}
                    onChange={(e) => {
                        handleChange(e, 'description')
                    }}
                />

                {/* <TextField
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              color: "text.secondary",
            },
            fieldset: { borderColor: "rgb(231, 235, 240)" },
          }}
          fullWidth
          id="workfield"
          name="workfield"
          label="Work fields"
          type="textarea"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Work field"
          value={loggingUser?.workfield}
          onChange={(e) => {
            handleChange(e, 'workfield')
          }}
        /> */}
                <TextField
                    sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                            color: "text.secondary",
                        },
                        fieldset: {borderColor: "rgb(231, 235, 240)"},
                    }}
                    fullWidth
                    id="phone_number"
                    label="Mobile Number"
                    name="phone_number"
                    type="tel"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Mobile Number"
                    value={loggingUser?.phone_number}
                    onChange={(e) => {
                        handleChange(e, 'phone_number')
                    }}


                />


                {user?.role === USER_ROLES?.JOB_SEEKER ? (
                    <TextField
                        fullWidth
                        id="years_of_experience"
                        name="years_of_experience"
                        label="Years of Experience"
                        value={loggingUser?.years_of_experience}
                        onChange={(e) => {
                            handleChange(e, 'years_of_experience')
                        }}
                    />
                ) : null
                }
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
                <Button variant="contained" style={{backgroundColor: '#FF0000'}} onClick={() => {
                    deleteUserById(loggingUser?.user?._id);
                }}>
                    Delete My Account
                </Button>
            </form>
        </div>
    );
};

export default UserInfoDashboard;
