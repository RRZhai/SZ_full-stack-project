import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { ReviewProvider } from "./context/reviewContext";
import { HireProvider } from "./context/hireContext";
import { JobProvider } from "./context/jobContext";
import { UserProvider } from "./context/userContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="198050695398-5ka8gle6rl3duu9hcu758b738mslpfeu.apps.googleusercontent.com">
  <BrowserRouter>
  <UserProvider>
  <JobProvider>
    <HireProvider>
      <ReviewProvider>
          <App />
      </ReviewProvider>
    </HireProvider>
  </JobProvider>
  </UserProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
