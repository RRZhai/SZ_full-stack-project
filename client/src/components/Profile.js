import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

import Reviews from "./Reviews";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ReviewContext } from "../context/reviewContext";


const Profile = ({ profileUser, updateCurrentUser }) => {
  const navigate = useNavigate();
  const { username } = useParams();

  const { reviews } = useContext(ReviewContext);

  const jobIds = profileUser?.jobs.map((job) => job.id);
  const filterReview = reviews.filter((review) => jobIds?.includes(review.job_id));


  const aveRating = (user) => {
    let sum = 0;
    if (user && user.filterReview?.length !== 0) {
      user?.filterReview?.forEach((review) => {
        sum += review.rating;
      });
      return sum / filterReview?.length;
    }
  };

  return (
    <Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            height: 250,
            boxSizing: "border-box",
            marginTop: "60px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "none",
            width: "100vw",
            position: "sticky",
          },
        }}
        variant="permanent"
      >
        <Box sx={{ display: "flex", width: "800px", marginInline: "auto" }}>
          <Avatar
            alt={profileUser?.username}
            src={profileUser?.profile_pic_url}
            sx={{ width: 100, height: 100 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 150,
              maxWidth: 350,
              alignItems: "left",
              mx: "auto",
              my: "auto",
            }}
          >
            <Typography variant="h5" component="div">
              {profileUser?.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {profileUser?.email}
            </Typography>
            <Rating
              name="text-feedback"
              value={aveRating(profileUser)}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              bio:
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                width: 300,
                my: "auto",
                mx: "auto",
                alignContent: "center",
              }}
            >
              {profileUser?.bio}
            </Typography>
          </Box>
        </Box>
      </Drawer>
      <Reviews profileUser={profileUser} filterReview={filterReview}/>
    </Box>
  );
};

export default Profile;
