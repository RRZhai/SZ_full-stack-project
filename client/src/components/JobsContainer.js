import React, { useContext } from "react";
import { useState } from "react";
import Job from "./Job";
import { JobContext } from "../context/jobContext";

const JobsContainer = ({
  userRole,
  jobs,
  handleJobComplete,
  currentUser,
  handleApplyJob,
  handleJobDelete,
  handleProfileUser,
}) => {
  return (
    <div>
      {jobs
        ? jobs.map((job) => (
            <Job
              key={job.id}
              job={job}
              currentUser={currentUser}
              userRole={userRole}
              handleApplyJob={handleApplyJob}
              handleJobComplete={handleJobComplete}
              handleProfileUser={handleProfileUser}
              handleJobDelete={handleJobDelete}
            />
          ))
        : null}
    </div>
  );
};

export default JobsContainer;
