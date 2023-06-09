import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import CardElement from "../../component/CardElement";
import {GENDER, USER_ROLES} from "../../helper/enums";
import JopSeeker from "../../api/JopSeeker";

const UserJobsHistory = () => {
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

    const handleSearch = (e) => {
        e.preventDefault();
        let gender = null;
        if(checkBox.femaleChecked && checkBox.maleChecked){
            gender = null
        }else{
            if(checkBox.femaleChecked){
                gender = 'female';
            }else if(checkBox.maleChecked){
                gender = 'male';
            }
        }
        console.log({
            'search': search,
            'gender':gender,
            'years_of_experience':yearsOfExperience,
            'rating':rateSort
    })
        JopSeeker.getJopSeekers({
            'search': search,
            'gender':gender,
            'years_of_experience':yearsOfExperience,
            'rating':rateSort * 2
        }).then((res) => {
            console.log(res)
            setUserList(res?.data.data);
        });
    }
    useEffect(() => {
        JopSeeker.getJopSeekers().then((res) => {
            console.log(res)
            setUserList(res?.data.data);
        });

    }, []);


    return (
        <>
            <Box>
                <Typography variant="h4" sx={{color: "#fafafa"}}>
                    User List
                </Typography>
                <TextField
                    sx={{
                        mb: 3,
                        "& .MuiInputBase-root": {
                            color: "#FFF",
                        },
                        fieldset: {borderColor: "#FFF"},
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
                <div style={{display: "flex", gap: 12}}>
                    <FormControlLabel
                        label="Female"
                        style={{color: "#FFF"}}
                        control={
                            <Checkbox
                                checked={checkBox?.femaleChecked}
                                style={{color: "#FFF"}}
                                onChange={(e) =>
                                    setCheckbox({
                                        ...checkBox,
                                        femaleChecked: e?.target?.checked,
                                    })
                                }
                                inputProps={{"aria-label": "controlled"}}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Male"
                        style={{color: "#FFF"}}
                        control={
                            <Checkbox
                                checked={checkBox?.maleChecked}
                                style={{color: "#FFF"}}
                                onChange={(e) =>
                                    setCheckbox({...checkBox, maleChecked: e?.target?.checked})
                                }
                                inputProps={{"aria-label": "controlled"}}
                            />
                        }
                    />
                    <TextField
                        sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                                color: "#FFF",
                            },
                            fieldset: {borderColor: "#FFF"},
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
                            fieldset: {borderColor: "#FFF"},
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
                    <button
                        style={{
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: "#FFF",
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <Box>
                    <div style={{display: "flex", flexWrap: "wrap", gap: 20}}>
                        {userList?.map((user, i) => {
                            return (
                                <CardElement
                                    key={user.id}
                                    id={user.id}
                                    jobTitle={`${user.first_name} ${user.last_name}`}
                                    description={user.description || ""}
                                    category={user.workField?.name}
                                    location={user.country?.name || ""}
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
