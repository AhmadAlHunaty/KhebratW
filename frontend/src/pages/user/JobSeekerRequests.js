import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import RequestCard from "../../component/RequestCard";

const JobSeekerRequests = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "#fafafa" }}>
          {" "}
          Job Requests
        </Typography>
        <Box>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {user?.jobsRequests?.map((request, i) => 
           {
            debugger
            return <RequestCard
              key={request?.user?._id}
              id={request?.user?._id}
              jobTitle={`${request?.user?.nameOfCorporation}`}
              description={request?.user?.skills || ""}
              category={request?.user?.jobType}
              location={request?.user?.address || ""}
              user={request?.user}
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
