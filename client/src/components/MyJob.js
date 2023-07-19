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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Job from "./Job";

const MyJob = ({ currentUser, handleJobDelete, jobs }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const relatedJobsAsEmployee = jobs.filter(
    (job) => job.employee_id === currentUser?.id && job.hires !== null
  );

  const relatedJobsAsJobseeker = jobs.filter(
    (job) => job.hires?.job_seeker_id === currentUser?.id
  );
  return (
    <Container>
      <Stack direction={{ sm: "row" }}>
        <Container>
          <Typography variant="h5" component="div">
            My Hire
          </Typography>
          {relatedJobsAsEmployee.map((job) => (
            <Job job={job}/>
          ))}
        </Container>
        <Container>
          <Typography variant="h5" component="div">
            My Work
          </Typography>
          {relatedJobsAsJobseeker.map((job) => (
            <Job job={job}/>
          ))}
        </Container>
      </Stack>
    </Container>
  );
};

export default MyJob;
