import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Button, Badge } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";

const defaultTheme = createTheme();

function HeaderBar({
  currentUser,
  updateCurrentUser,
  userRole,
  handleActiveJob,
  handleSetRole,
  handleJobsByLocation,
  handleProfileUser
}) {
  const isActive = true;
  const notActive = false;
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        updateCurrentUser(null);
        navigate("/");
      }
    });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/" onClick={(e) => handleSetRole(null)}>
              Company
            </Link>
          </Typography>

          {userRole === "employee" ? (
            <Typography
              variant="button"
              color="text.primary"
              component={Link}
              to="/newjob"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Add New
            </Typography>
          ) : null}
          <Typography
            noWrap
            sx={{ flexGrow: 1 }}
            variant="button"
            color="text.primary"
            component={Link}
            to="/jobs"
          >
            All Active Jobs
          </Typography>
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
          </div>
          <nav>
            {currentUser ? (
              <nav>
                <Link>
                  <Badge
                    color="secondary"
                    variant="dot"
                    component={Link}
                    to="/chat"
                  >
                    <MailIcon />
                  </Badge>
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={currentUser?.username}
                          src={`../${currentUser.profile_pic_num}.png`}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key="profile"
                        onClick={() => {
                          handleCloseUserMenu();
                          handleProfileUser(currentUser)
                        }}
                        component={Link}
                        to="/profile/:name"
                      >
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem
                        key="My Active Job"
                        onClick={(e) => handleActiveJob(isActive)}
                        component={Link}
                        to="/myjobs"
                      >
                        <Typography textAlign="right">My Active Job</Typography>
                      </MenuItem>
                      <MenuItem
                        key="My Past Job"
                        onClick={(e) => handleActiveJob(notActive)}
                        component={Link}
                        to="/myjobs"
                      >
                        <Typography textAlign="right">My Past Job</Typography>
                      </MenuItem>
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          handleCloseUserMenu();
                          logout();
                        }}
                        component={Link}
                        to="/"
                      >
                        <Typography textAlign="right">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                </Link>
              </nav>
            ) : null}
          </nav>
          {currentUser ? null : (
            <Button href="login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default HeaderBar;
