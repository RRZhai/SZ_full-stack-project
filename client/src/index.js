import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { ReviewProvider } from "./context/reviewContext";
import { JobProvider } from './context/jobContext'
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <JobProvider>
  <ReviewProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReviewProvider>
  </JobProvider>
);
