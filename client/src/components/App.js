import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import DeleteUser from "./DeleteUser";
import JobsContainer from "./JobsContainer";
import Job from "./Job";
import Profile from "./Profile";
import Reviews from "./Reviews";
import Error404 from "./Error404";
import JobForm from "./JobForm";
import Chat from "./Chat";
import { set } from "react-hook-form";

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);
  const [applyJob, setApplyJob] = useState(null);
  // const ThemeContext = createContext('light')

  // const [theme, setTheme] = useState('light')
  // if (userRole === "jobseeker") {
  //   setTheme('dark')
  // } else {
  //   setTheme('light')
  // }

  useEffect(() => {
    fetch("/checksession").then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser);
      }
    });
  }, []);

  useEffect(() => {
    fetch("/jobs")
      .then((r) => r.json())
      .then(data => {
        setJobs(data)
        setFilterJobs(data.filter((job) => job.status === 'active'))
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch((err) => console.error(err));
  }, []);

  const handleSetReviews = () => {
    fetch("/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch((err) => console.error(err));
  };

  const handleSubmitJob = (data) => {
    setJobs((current) => [data, ...current]);
  };

  const handleJobDelete = (id) => {
    fetch(`/jobs/${id}`, {
      method: "DELETE",
    }).then(setJobs((current) => current.filter((item) => item.id !== id)));
  };

  const updateCurrentUser = (updated_user) => {
    setCurrentUser(updated_user);
  };

  const handleSetRole = (role) => {
    setUserRole(role);
    setFilterJobs(jobs.filter((job) => job.status === 'active'));
  };

  const handleJobsByLocation = (type) => {
      setFilterJobs(
        jobs.filter((job) => job.city.toLowerCase().includes(type.toLowerCase()))
      );
    }

  const handleActiveJob = (active) => {
    if (userRole === "employee") {
      const filterJobsByRole = jobs.filter((job) => job.employee_id === currentUser.id);
      if (!active) {
        setFilterJobs(filterJobsByRole.filter((job) => job.status === 'completed' || job.status === 'cancelled'));
      } else {
        setFilterJobs(filterJobsByRole.filter((job) => job.status === 'active' || job.status === 'pending'));
      }
    } else {
      const filterJobsByRole = jobs.filter((job) => job.hires?.job_seeker_id === currentUser.id);
      if (!active) {
        setFilterJobs(filterJobsByRole.filter((job) => job.status === 'completed' || job.status === 'cancelled'));
      } else {
        setFilterJobs(filterJobsByRole.filter((job) => job.status === 'active' || job.status === 'pending'));
      }
    }
  }

  const handleApplyJob = (job) => {
    setApplyJob(job);
  }

  return (
    <div className="app">
      <HeaderBar
        currentUser={currentUser}
        userRole={userRole}
        handleActiveJob={handleActiveJob}
        updateCurrentUser={updateCurrentUser}
        handleSetRole={handleSetRole}
        handleJobsByLocation={handleJobsByLocation}
      />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} handleSetRole={handleSetRole} />} />
        <Route
          path="/login"
          element={
            <LoginForm
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignupForm updateCurrentUser={updateCurrentUser} />}
        />
        <Route
          path="/profile/:name"
          element={
            <Profile
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/account_deletion"
          element={<DeleteUser updateCurrentUser={updateCurrentUser} />}
        />
        <Route
          path="/newjob"
          element={<JobForm currentUser={currentUser} handleSubmitJob={handleSubmitJob} />}
        />
        <Route
          path="/chat"
          element={<Chat currentUser={currentUser} job={applyJob}> Chat </Chat>}
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
            />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
