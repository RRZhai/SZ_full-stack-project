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
import MyJob from "./MyJob";
import { set } from "react-hook-form";
import { JobContext } from "../context/jobContext";
import { UserContext } from "../context/userContext";

const App = () => {
  const { jobs, dispatch } = useContext(JobContext);
  const { user } = useContext(UserContext);

  const [userRole, setUserRole] = useState("");

  const [filterJobs, setFilterJobs] = useState(jobs);
  const [applyJob, setApplyJob] = useState(null);
  const [profileUser, setProfileuser] = useState(null);

  const handleSubmitJob = (data) => {
    setFilterJobs((current) => [data, ...current]);
  };

  const handleJobDelete = (job) => {
    fetch(`/jobs/${job.id}`, {
      method: "DELETE",
    }).then((res) => {
      setFilterJobs((current) => current.filter((item) => item.id !== job.id));
    });
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

  const handleActiveJob = (active) => {
    if (active) {
      setFilterJobs(
        jobs.filter(
          (job) => job.status === "active" || job.status === "pending"
        )
      );
    } else {
      setFilterJobs(jobs.filter((job) => job.status === "completed"));
    }
  };

  const handleApplyJob = (e, job) => {
    const newHire = {
      job_id: job.id,
      job_seeker_id: user.id,
    };
    e.preventDefault();
    fetch("/hires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHire),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`/jobs/${job.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "pending", hire_id: data.id }),
        })
          .then((res) => {
            if (res.ok) {
              const pendingJob = res.json();
              setApplyJob(pendingJob);
              setFilterJobs((current) =>
                current.filter((item) => item.id !== pendingJob.id)
              );
            }
          })
          .catch((err) => console.error(err));
      });
  };

  const handleProfileUser = (user) => {
    setProfileuser(user);
  };

  return (
    <div className="app">
      <HeaderBar
        currentUser={user}
        userRole={userRole}
        handleActiveJob={handleActiveJob}
        handleSetRole={handleSetRole}
        handleJobsByLocation={handleJobsByLocation}
        handleProfileUser={handleProfileUser}
      />
      <Routes>
        <Route
          path="/"
          element={<Home currentUser={user} handleSetRole={handleSetRole} />}
        />
        <Route path="/login" element={<LoginForm currentUser={user} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/profile/:name"
          element={<Profile profileUser={profileUser} />}
        />
        <Route
          path="/myjobs"
          element={
            <MyJob
              userRole={userRole}
              jobs={filterJobs}
              currentUser={user}
              handleProfileUser={handleProfileUser}
              handleJobDelete={handleJobDelete}
            />
          }
        />
        <Route
          path="/newjob"
          element={
            <JobForm currentUser={user} handleSubmitJob={handleSubmitJob} />
          }
        />
        <Route
          path="/jobs"
          element={
            <JobsContainer
              userRole={userRole}
              currentUser={user}
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
