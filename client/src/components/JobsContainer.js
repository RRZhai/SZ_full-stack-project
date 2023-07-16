import React from "react";
import { useState } from "react";
import Job from "./Job";

const JobContainer = ({ userRole, jobs, currentUser }) => {

  return (
      <div>{jobs ? jobs.map(job => <Job key={job.id} job={job} currentUser={currentUser} userRole={userRole} />) : null}</div>
  );
};

export default JobContainer;
