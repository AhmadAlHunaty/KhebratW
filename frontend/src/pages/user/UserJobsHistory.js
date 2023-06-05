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
      setUserList(data?.users || []);
      setFilteredUserList(data?.users || []);
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
    } else if (isFemale){
        const filtered = userList?.filter(user => user?.gender == GENDER.Female);
        setFilteredUserList(filtered);
    } else {
        const filtered = userList?.filter(user => user?.gender == GENDER.Male);
        setFilteredUserList(filtered);
    }
  }, [checkBox]);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "#fafafa" }}>
          {" "}
          User List{" "}
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
            style={{ color: '#FFF' }}
            control={
              <Checkbox
                checked={checkBox?.femaleChecked}
                style={{ color: '#FFF' }}
                onChange={(e) =>
                  setCheckbox({ ...checkBox, femaleChecked: e?.target?.checked })
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <FormControlLabel
            label="Male"
            style={{ color: '#FFF' }}
            control={
              <Checkbox
                checked={checkBox?.maleChecked}
                style={{ color: '#FFF' }}
                onChange={(e) =>
                  setCheckbox({ ...checkBox, maleChecked: e?.target?.checked })
                }
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </div>
        <Box>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap:20}}>
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
