import {
  Container,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
  Grid,
  Divider,
  FormControl,
  TextField,
  Icon,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ChatMessageDto } from "../models/chatMessageDto";
import Job from "./Job";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { set } from "react-hook-form";

import io from "socket.io-client";

import React from "react";
import { ReactDOM } from "react";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const socket = io("ws://localhost:8080");

const Chat = ({ currentUser, job }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    // debugger
    socket.on("message", (payload) => {
      setMessages((messages) => [...messages, payload]);
    })
  });

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit("message", {message});
    setMessage("");
  };

  console.log(message)

  const listChatMessages = messages.map((payload, index) => {
    return (
      <ListItem key={index}>
        <Item>{moment(new Date()).format("h:mm:ss a")}</Item>
        <Avatar alt={currentUser.name} src={`../${currentUser.profile_pic_num}.png`} />
        <ListItemText primary={`${currentUser.name}: ${payload.message}`} />
      </ListItem>
    );
  });

  return (
    <Container>
      <Paper elevation={5}>{job ? <Job job={job}></Job> : null}</Paper>
      <Paper elevation={5}>
        <Box p={3}>
          <Grid container spacing={4}>
            <Grid xs={12} item>
              <List>{listChatMessages}</List>
            </Grid>
            <Grid xs={10} item>
              <FormControl fullWidth onSubmit={sendMessage}>
                <TextField
                  fullWidth
                  name="message"
                  value={message}
                  label="Type your message..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Grid item>
                  <IconButton aria-label="send" color="primary">
                    <SendIcon />
                  </IconButton>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
