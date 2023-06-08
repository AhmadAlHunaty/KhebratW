import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  Avatar,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import {
  allUserAction,
  userSignUpAction,
  userUpdateAction,
} from "../../redux/actions/userAction";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import Button from "@mui/material/Button";
import { userAction } from "./../../redux/actions/userAction";
import { USER_ROLES } from "../../helper/enums";
import axios from "axios";

const UserInfoDashboard = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.signIn);
  const [loggingUser, setlogginUser] = React.useState(userInfo?.user || null);

  const handleChange = (e, key) => {
    setlogginUser((prev) => {
      return {
        ...prev,
        [key]: e?.target?.value
      }
    })
  }


  const updateUserDetails = async () => {
    try {
      // setIsUserListLoading(true);
      const { data } = await axios.put(`/api/user/edit/${loggingUser?._id}`, {
        ...loggingUser,
      });
    } catch (error) {
      console.log(error);
    } finally {
      // setIsUserListLoading(false);
    }
  };

  const deleteUserById = async () => {
    const { data } = await axios.delete(`/api/admin/user/delete/${loggingUser?._id}`);

    if (data?.success) {
      window.open('/', '_self');
    }
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
        style={{ display: "grid", gap: "1rem" }}
        onSubmit={updateUserDetails}
      >
        {userInfo?.role === USER_ROLES?.EMPLOYER ? (
          <TextField
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                color: "text.secondary",
              },
              fieldset: { borderColor: "rgb(231, 235, 240)" },
            }}
            fullWidth
            id="nameOfCorporation"
            label="Name Of Corporation"
            name="nameOfCorporation"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Name Of Corporation"
            value={loggingUser?.nameOfCorporation}
            onChange={(e) => {
              handleChange(e, 'nameOfCorporation')
            }}
          />
        ) : null}
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={loggingUser?.firstName}
          onChange={(e) => {
            handleChange(e, 'firstName')
          }}
        />

        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={loggingUser?.lastName}
          onChange={(e) => {
            handleChange(e, 'lastName')
          }}
        />

        <TextField
          fullWidth
          id="bio"
          name="bio"
          label="Bio"
          multiline
          rows={4}
          value={loggingUser?.bio}
          onChange={(e) => {
            handleChange(e, 'bio')
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
            fieldset: { borderColor: "rgb(231, 235, 240)" },
          }}
          fullWidth
          id="mobilenumber"
          label="Mobile Number"
          name="mobilenumber"
          type="tel"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Mobile Number"
          value={loggingUser?.mobileNumber}
          onChange={(e) => {
            handleChange(e, 'mobileNumber')
          }}


        />


        {userInfo?.role === USER_ROLES?.JOB_SEEKER ? (
          <TextField
            fullWidth
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years of Experience"
            value={loggingUser?.yearsOfExperience}
            onChange={(e) => {
              handleChange(e, 'yearsOfExperience')
            }}
          />
        ) : null
        }
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button variant="contained" style={{ backgroundColor: '#FF0000' }} onClick={() => {
          deleteUserById(loggingUser?.user?._id);
        }}>
          Delete My Account
        </Button>
      </form>
    </div>
  );
};

export default UserInfoDashboard;
