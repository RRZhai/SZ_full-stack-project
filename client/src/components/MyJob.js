import * as React from "react";
import {
  Stack,
  Card,
  Paper,
  styled,
  Grid,
  Button,
  CardActions,
  CardContent,
  Typography,
  Container,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Job from "./Job";

const MyJob = ({
  currentUser,
  userRole,
  handleJobDelete,
  jobs,
  handleProfileUser,
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const relatedJobsAsEmployee = jobs.filter(
    (job) => job.employee_id === currentUser?.id
  );

  const relatedJobsAsJobseeker = jobs.filter(
    (job) => job.hires?.job_seeker_id === currentUser?.id
  );
  if (userRole === "employee") {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Hire
        </Typography>
        {relatedJobsAsEmployee.map((job) => (
          <Job
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
          />
        ))}
      </Container>
    );
  } else if (userRole === "jobseeker") {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Work
        </Typography>
        {relatedJobsAsJobseeker.map((job) => (
          <Job
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
          />
        ))}
      </Container>
    );
  } else {
    return (
      <Container>
        <Typography variant="h5" component="div">
          My Work and My Hire
        </Typography>
        {relatedJobsAsEmployee.map((job) => (
          <Job
            job={job}
            currentUser={currentUser}
            handleJobDelete={handleJobDelete}
          />
        ))}
        {relatedJobsAsJobseeker.map((job) => (
          <Job
          job={job}
          currentUser={currentUser}
          handleJobDelete={handleJobDelete}
        />
        ))}
      </Container>
    );
  }
};

export default MyJob;
