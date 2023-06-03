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

const UserInfoDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);
  const { userInfo } = useSelector((state) => state.signIn);
  console.log("user");
  console.log(user);

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your First Name")
      .min(3, "First Name should be of minimum 3 characters length")
      .required("First Name is required"),
    lastName: yup
      .string("Enter your Last Name")
      .min(3, "Last Name should be of minimum 3 characters length")
      .required("Last Name is required"),
    workfield: yup.string("Enter your workfield"),
    yearsOfExperience: yup.string("Enter your years of experience"),
    bio: yup.string("Enter your bio"),
    nameOfCorporation: yup.string("Enter your workfield"),
  });

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    yearsOfExperience: "",
    bio: "",
    // Add initial values for other fields
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(userUpdateAction(values)); // Dispatch the action to update the user's profile
    },
  });
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
      <Typography variant="h6">Edit Profile</Typography>
      <form
        style={{ display: "grid", gap: "1rem" }}
        onSubmit={formik.handleSubmit}
      >
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

        <TextField
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
          value={formik.values.workfield}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.workfield && Boolean(formik.errors.workfield)}
          helperText={formik.touched.workfield && formik.errors.workfield}
        />

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
            value={formik.values.nameOfCorporation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nameOfCorporation &&
              Boolean(formik.errors.nameOfCorporation)
            }
            helperText={
              formik.touched.nameOfCorporation &&
              formik.errors.nameOfCorporation
            }
          />
        ) : null}

        {userInfo?.role === USER_ROLES?.JOB_SEEKER ? (
          <TextField
            fullWidth
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years of Experience"
            value={formik.values.yearsOfExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.yearsOfExperience &&
              Boolean(formik.errors.yearsOfExperience)
            }
            helperText={
              formik.touched.yearsOfExperience &&
              formik.errors.yearsOfExperience
            }
          />
        ) : null}

        {/* Add TextField components for other fields */}
        {/* ... */}

        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UserInfoDashboard;
