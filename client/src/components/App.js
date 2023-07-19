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
import { set } from "react-hook-form";

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);
  const [applyJob, setApplyJob] = useState(null);
  const [profileUser, setProfileuser] = useState(null);

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
      .then((data) => {
        setJobs(data);
        setFilterJobs(data.filter((job) => job.status === "active"));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmitJob = (data) => {
    setJobs((current) => [data, ...current]);
  };

  const handleJobDelete = (id) => {
    fetch(`/jobs/${id}`, {
      method: "DELETE",
    })
      .then(setJobs((current) => current.filter((item) => item.id !== id)))
      .then(
        setFilterJobs((current) => current.filter((item) => item.id !== id))
      );
  };

  const updateCurrentUser = (updated_user) => {
    setCurrentUser(updated_user);
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
    (job) => job.employee_id === currentUser.id
  );
  const myJobsAsSeeker = jobs.filter(
    (job) => job.hires?.job_seeker_id === currentUser
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
        updateCurrentUser={updateCurrentUser}
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
          element={<Profile profileUser={profileUser} />}
        />
        <Route
          path="/account_deletion"
          element={<DeleteUser updateCurrentUser={updateCurrentUser} />}
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
