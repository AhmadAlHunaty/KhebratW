import {Typography} from "@mui/material";
import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import RequestCard from "../../component/RequestCard";
import WorkRequest from "../../api/WorkRequest";

const JobSeekerRequests = () => {
    const [workRequests, setWorkRequests] = useState([]);

    useEffect(() => {
        WorkRequest.getWorkRequests().then((res) => {
            setWorkRequests(res.data);
            console.log(res.data)
        });
    }, []);


    return (
        <>
            <Box>
                <Typography variant="h4" sx={{color: "#fafafa"}}>
                    {" "}
                    Job Requests
                </Typography>
                <Box>
                    <div style={{display: "flex", flexWrap: "wrap", gap: 20}}>
                        {workRequests?.map((request, i) => {
                            debugger
                            return <RequestCard
                                key={request.id}
                                id={request.id}
                                jobTitle={`${request?.employer?.first_name}`}
                                description={request?.employer?.description}
                                category={request.employer?.work_field?.name}
                                location={request.employer?.country?.name}
                                user={request?.employer}
                                request={request}
                            />
                        })}
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default JobSeekerRequests;
