import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import DeleteUser from "./DeleteUser";
import JobForm from "./JobForm";
import JobsContainer from "./JobsContainer";
import Job from "./Job";
import Profile from "./Profile";
import Reviews from "./Reviews";
import Error404 from "./Error404";

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser);
      }
    });
  }, []);
  useEffect(() => {
    fetch("/jobs")
      .then((r) => r.json())
      .then(setJobs)
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

  const handleSetJobs = () => {
    fetch("/jobs")
      .then((r) => r.json())
      .then(setJobs)
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

  return(
    <div className='app'>
      <HeaderBar currentUser={currentUser} updateCurrentUser={updateCurrentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<LoginForm currentUser={currentUser} updateCurrentUser={updateCurrentUser} />} />
        <Route path="/signup" element={<SignupForm updateCurrentUser={updateCurrentUser} />} />
        <Route path="/profile/:username" element={<Profile currentUser={currentUser} updateCurrentUser={updateCurrentUser} />} />
        <Route path="/account_deletion" element={<DeleteUser updateCurrentUser={updateCurrentUser} />} />
        <Route
          path="/"
          element={
            currentUser ? (
              [
                <JobForm handleSubmitJob={handleSubmitJob} />,
                <JobsContainer
                  currentUser={currentUser}
                  jobs={jobs}
                  handleJobDelete={handleJobDelete}
                  handleSubmitJob={handleSubmitJob}
                />,
              ]
            ) : (
              <JobsContainer
                currentUser={currentUser}
                jobs={jobs}
                handleJobDelete={handleJobDelete}
                handleSubmitJob={handleSubmitJob}
              />
            )
          }
        />
        <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </div>
  )
}

export default App;
