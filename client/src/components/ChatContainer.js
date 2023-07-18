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
import Avatar from "@mui/material/Avatar";
import { HireContext } from "../context/hireContext";

const ChatContainer = ({ jobs, currentUser }) => {
  const { hires } = useContext(HireContext);

  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const relatedJobAsEmployee = jobs.filter(
    (job) => job.employee_id === currentUser.id && job.hires !== null
  );

  const relatedJobsAsJobseeker = jobs.filter(
    (job) => job.hires?.job_seeker_id === currentUser.id
  );

  return (
    <Container>
      <Grid>
        <Stack direction={{ sm: "row" }}>
          <Container>
            {relatedJobAsEmployee.map((job) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Stack direction={{ sm: "column" }}>
                    <Stack direction={{ sm: "row" }}>
                      <Typography variant="h5" component={Link} to="/chat/:id">
                        {job.job_type}
                      </Typography>
                      <Item>{job.status.toUpperCase()}</Item>
                    </Stack>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {job.city}, {job.state}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Container>
          <Container>
            {relatedJobsAsJobseeker.map((job) => (
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Stack direction={{ sm: "column" }}>
                    <Stack direction={{ sm: "row" }}>
                      <Typography variant="h5" component={Link} to="/chat/:id">
                        {job.job_type}
                      </Typography>
                      <Item>{job.status.toUpperCase()}</Item>
                    </Stack>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {job.city}, {job.state}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Container>
        </Stack>
      </Grid>
    </Container>
  );
};

export default ChatContainer;
