import React from "react";
import JobForm from "./JobForm";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const JobContainer = ({ handleJobsByLocation, userRole }) => {
  return (
    <div>
      {userRole === "employee" ? null : (
        <div>
          <TextField
            id="search-bar"
            label="Enter a city name"
            placeholder="Search..."
            onChange={(e) => {
              handleJobsByLocation(e.target.value);
            }}
            variant="outlined"
            size="small"
          />
          <SearchIcon style={{ fill: "blue" }} />
        </div>
      )}
    </div>
  );
};

export default JobContainer;
