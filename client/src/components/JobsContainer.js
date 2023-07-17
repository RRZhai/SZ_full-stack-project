import React, { useContext } from "react";
import { useState } from "react";
import Job from "./Job";
import { JobContext } from "../context/jobContext";

const JobContainer = ({ userRole, jobs, currentUser, handleApplyJob, handleJobDelete, handleProfileUser }) => {
  // const { jobs } = useContext(JobContext)

  return (
      <div>{jobs ? jobs.map(job => <Job key={job.id} job={job} currentUser={currentUser} userRole={userRole} handleApplyJob={handleApplyJob} handleProfileUser={handleProfileUser} handleJobDelete={handleJobDelete} />) : null}</div>
  );
};

export default JobContainer;
