import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { ReviewProvider } from "./context/reviewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReviewProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReviewProvider>
);
