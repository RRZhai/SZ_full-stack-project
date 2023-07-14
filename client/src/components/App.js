import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);

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
        setFilterJobs(data)
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
  };

  const handleJobsByLocation = (type) => {
      setFilterJobs(
        jobs.filter((job) => job.city.toLowerCase().includes(type.toLowerCase()))
      );
    }

  return (
    <div className="app">
      <HeaderBar
        currentUser={currentUser}
        userRole={userRole}
      />
      <Routes>
        <Route path="/" element={<Home handleSetRole={handleSetRole} />} />
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
          element={<SignupForm updateCurrentUser={updateCurrentUser} />}
        />
        <Route
          path="/:name"
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
          path="/jobs"
          element={
            <JobsContainer
              userRole={userRole}
              currentUser={currentUser}
              jobs={filterJobs}
              handleJobDelete={handleJobDelete}
              handleSubmitJob={handleSubmitJob}
              handleJobsByLocation={handleJobsByLocation}
            />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
