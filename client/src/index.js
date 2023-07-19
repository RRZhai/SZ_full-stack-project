import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { ReviewProvider } from "./context/reviewContext";
import { HireProvider } from "./context/hireContext";
import { JobProvider } from "./context/jobContext";
import { UserProvider } from "./context/userContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
  <JobProvider>
    <HireProvider>
      <ReviewProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReviewProvider>
    </HireProvider>
  </JobProvider>
  </UserProvider>
);
