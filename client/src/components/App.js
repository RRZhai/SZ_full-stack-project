import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import JobsContainer from "./JobsContainer";
import Profile from "./Profile";
import Error404 from "./Error404";
import JobForm from "./JobForm";
import { set } from "react-hook-form";
import { JobContext } from "../context/jobContext";
import { UserContext } from "../context/userContext";

const App = () => {
  const { jobs, dispatch } = useContext(JobContext);
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);

  const [userRole, setUserRole] = useState("");
  
  const [filterJobs, setFilterJobs] = useState(jobs);
  const [applyJob, setApplyJob] = useState(null);
  const [profileUser, setProfileuser] = useState(null);

  const handleSubmitJob = (data) => {
    setFilterJobs((current) => [data, ...current]);
  };

  const handleJobDelete = (id) => {
    fetch(`/jobs/${id}`, {
      method: "DELETE",
    })
      .then(
        setFilterJobs((current) => current.filter((item) => item.id !== id))
      );
  };

  const handleSetRole = (role) => {
    setUserRole(role);
    setFilterJobs(jobs.filter((job) => job.status === "active"));
  };

  const handleJobsByLocation = (type) => {
    setFilterJobs(
      jobs.filter((job) => job.city.toLowerCase().includes(type.toLowerCase()))
    );
  };

  const myJobsAsEmployee = jobs.filter(
    (job) => job.employee_id === currentUser?.id
  );
  const myJobsAsSeeker = jobs.filter(
    (job) => job.hires?.job_seeker_id === currentUser?.id
  );

  const handleActiveJob = (active) => {
    if (userRole === "employee") {
      if (!active) {
        setFilterJobs(
          myJobsAsEmployee.filter(
            (job) => job.hires.length() || job.status === "completed"
          )
        );
      } else {
        setFilterJobs(myJobsAsEmployee.filter((job) => !job.hires.length()));
      }
    } else {
      if (!active) {
        setFilterJobs(
          myJobsAsSeeker.filter(
            (job) => job.status === "completed" || job.status === "cancelled"
          )
        );
      } else {
        setFilterJobs(
          myJobsAsSeeker.filter(
            (job) => job.status === "active" || job.status === "pending"
          )
        );
      }
    }
  };

  const handleApplyJob = (e, job) => {
    const newHire = {
      job_id: job.id,
      job_seeker_id: currentUser.id,
    };
    e.preventDefault();
    fetch("/hires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHire),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    fetch(`/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "pending" }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setApplyJob(data);
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleProfileUser = (user) => {
    setProfileuser(user);
  };

  return (
    <div className="app">
      <HeaderBar
        currentUser={currentUser}
        userRole={userRole}
        handleActiveJob={handleActiveJob}
        handleSetRole={handleSetRole}
        handleJobsByLocation={handleJobsByLocation}
        handleProfileUser={handleProfileUser}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home currentUser={currentUser} handleSetRole={handleSetRole} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignupForm />}
        />
        <Route
          path="/profile/:name"
          element={<Profile profileUser={profileUser} />}
        />
        <Route
          path="/newjob"
          element={
            <JobForm
              currentUser={currentUser}
              handleSubmitJob={handleSubmitJob}
            />
          }
        />
        <Route
          path="/jobs"
          element={
            <JobsContainer
              userRole={userRole}
              currentUser={currentUser}
              jobs={filterJobs}
              handleJobDelete={handleJobDelete}
              handleSubmitJob={handleSubmitJob}
              handleJobsByLocation={handleJobsByLocation}
              handleApplyJob={handleApplyJob}
              handleProfileUser={handleProfileUser}
            />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
