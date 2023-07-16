import {
  Container,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ChatMessageDto } from "../models/chatMessageDto";
import Job from "./Job";

const Chat = ({ currentUser, job }) => {
  const [messages, setMessages] = useState([
    new ChatMessageDto(`${currentUser.name}`, "Hello"),
  ]);

  const listChatMessages = messages.map((chatMessageDto, index) => {
    return (<ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}
      />
    </ListItem>)
  });

  const WebSocket = require("ws");
  return (
    <Container>
      <Paper elevation={5}>{job ? <Job job={job}></Job> : null}</Paper>
      <Paper elevation={5}>
        <Box p={3}>
          <Grid container spacing={4}>
            <Grid>
              <List>{listChatMessages}</List>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
