import * as React from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../context/userContext";

const Job = ({
  job,
  currentUser,
  userRole,
  handleApplyJob,
  handleJobDelete,
  handleProfileUser,
}) => {
  const [readMore, setReadMore] = useState(false);
  const { users } = useContext(UserContext);

  const navigate = useNavigate();

  const handleReadMore = () => {
    setReadMore((current) => !current);
  };

  const employee = users?.find((employee) => employee.id === job.employee_id);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const convertDate = (date) => {
    return date.slice(0, 10).replaceAll("-", "/");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" spacing={20}>
          <Stack direction="row" spacing={2}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Job of the Day
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {convertDate(job.date)}
            </Typography>
          </Stack>
          <IconButton
            onClick={(e) => handleProfileUser(job.user)}
            component={Link}
            to="/profile/:name"
            sx={{ p: 0 }}
          >
            <Avatar alt={job.user?.name} src={job.user?.profile_pic_url} />
          </IconButton>
        </Stack>
        <Typography variant="h5" component="div">
          {job.job_type}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job.city}, {job.state}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 10 }}
        >
          <Item>${job.pay_rate}/hr</Item>
          <Item>{job.start_time}</Item>
          <Item>{job.end_time}</Item>
          <Item>{job.status.toUpperCase()}</Item>
        </Stack>
      </CardContent>
      <CardActions>
        {userRole === "jobseeker" && job.status === "active" ? (
          <Button
            variant="contained"
            onClick={(e) => {
              handleApplyJob(e, job);
              navigate("/chat/:id");
            }}
          >
            Apply
          </Button>
        ) : (
          <Button disabled>Apply</Button>
        )}
        <Button onClick={handleReadMore} size="small">
          Learn More
        </Button>
        {job.employee_id === currentUser?.id ? (
          <Button onClick={(e) => handleJobDelete(job.id)} size="small">
            Delete
          </Button>
        ) : null}
      </CardActions>
      <CardContent>
        {readMore ? (
          <Typography variant="body2">{job.description}</Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Job;
