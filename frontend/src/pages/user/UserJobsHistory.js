import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardElement from "../../component/CardElement";
import axios from "axios";
import { GENDER, USER_ROLES } from "../../helper/enums";

const UserJobsHistory = () => {
  const { user } = useSelector((state) => state.userProfile);
  const [userList, setUserList] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(null);
  const [rateSort, setRateSort] = useState(null);
  const [checkBox, setCheckbox] = useState({
    femaleChecked: false,
    maleChecked: false,
  });
  const [filterUserList, setFilteredUserList] = useState(null);
  const [search, setSearch] = useState(null);
  const [isUserListLoading, setIsUserListLoading] = useState(false);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      setIsUserListLoading(true);
      const { data } = await axios.get("/api/allusers");
      const sortData = data?.users?.sort(
        (previousValue, currentValue) =>
          Number(currentValue.rate) - Number(previousValue.rate)
      );

      setUserList(sortData || []);
      setFilteredUserList(sortData || []);
    } catch (error) {
      console.log("test");
    } finally {
      setIsUserListLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      const filterUsers = userList?.filter(
        (user) =>
          user?.firstName.includes(search) ||
          user?.lastName.includes(search) ||
          user?.skills.includes(search) ||
          user?.address.includes(search)
      );
      setFilteredUserList(filterUsers);
    } else {
      setFilteredUserList(userList);
    }
  }, [search]);

  useEffect(() => {
    const isFemale = checkBox?.femaleChecked;
    const isMale = checkBox?.maleChecked;

    if (isFemale && isMale) {
      setFilteredUserList(userList);
      return;
    } else if (isFemale) {
      const filtered = userList?.filter(
        (user) => user?.gender == GENDER.Female
      );
      setFilteredUserList(filtered);
    } else {
      const filtered = userList?.filter((user) => user?.gender == GENDER.Male);
      setFilteredUserList(filtered);
    }
  }, [checkBox]);

  useEffect(() => {
    if (yearsOfExperience) {
      const filterUsers = userList?.filter(
        (user) => user?.yearsOfExperience == yearsOfExperience
      );
      setFilteredUserList(filterUsers);
    } else {
      setFilteredUserList(userList);
    }
  }, [yearsOfExperience]);

  useEffect(() => {
    if (rateSort) {
      const filterUsers = userList?.filter((user) => user?.rate == rateSort);
      setFilteredUserList(filterUsers);
    } else {
      setFilteredUserList(userList);
    }
  }, [rateSort]);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "#fafafa" }}>
          User List
        </Typography>
        <TextField
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              color: "#FFF",
            },
            fieldset: { borderColor: "#FFF" },
          }}
          fullWidth
          id="search"
          name="search"
          label="Search"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <FormControlLabel
            label="Female"
            style={{ color: "#FFF" }}
            control={
              <Checkbox
                checked={checkBox?.femaleChecked}
                style={{ color: "#FFF" }}
                onChange={(e) =>
                  setCheckbox({
                    ...checkBox,
                    femaleChecked: e?.target?.checked,
                  })
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <FormControlLabel
            label="Male"
            style={{ color: "#FFF" }}
            control={
              <Checkbox
                checked={checkBox?.maleChecked}
                style={{ color: "#FFF" }}
                onChange={(e) =>
                  setCheckbox({ ...checkBox, maleChecked: e?.target?.checked })
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <TextField
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                color: "#FFF",
              },
              fieldset: { borderColor: "#FFF" },
            }}
            width='30%'

            type="number"
            min={0}
            id="yearsOfExperience"
            name="yearsOfExperience"
            label="Years Of Experience"
            InputLabelProps={{
              shrink: true,
            }}
            // placeholder="Search..."
            value={yearsOfExperience}
            onChange={(e) => {
              if (e?.target?.value >= 0) setYearsOfExperience(e?.target?.value);
            }}
          />
          <TextField
            sx={{
              mb: 3,
              "& .MuiInputBase-root": {
                color: "#FFF",
              },
              fieldset: { borderColor: "#FFF" },
            }}
            width='30%'
            type="number"
            min={0}
            max={5}
            id="rateSort"
            name="rateSort"
            label="Rate Sort"
            InputLabelProps={{
              shrink: true,
            }}
            value={rateSort}
            onChange={(e) => {
              if (e?.target?.value >= 0 && e?.target?.value <= 5)
                setRateSort(e?.target?.value);
            }}
          />
        </div>
        <Box>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {filterUserList?.map((user, i) => {
              if (!user?.role === USER_ROLES.JOB_SEEKER) return;

              return (
                <CardElement
                  key={user._id}
                  id={user._id}
                  jobTitle={`${user.firstName} ${user.lastName}`}
                  description={user.skills || ""}
                  category={user.jobType}
                  location={user.address || ""}
                  user={user}
                />
              );
            })}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default UserJobsHistory;
