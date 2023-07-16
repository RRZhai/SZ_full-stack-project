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
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { ChatMessageDto } from "../models/chatMessageDto";
import Job from "./Job";

const Chat = ({ currentUser, job }) => {
  const [messages, setMessages] = useState([
    new ChatMessageDto(`${currentUser.name}`, "Hello"),
  ]);

  const listChatMessages = messages.map((chatMessageDto, index) => {
    <Avatar
      alt={currentUser?.username}
      src={`../${currentUser.profile_pic_num}.png`}
    />;
  });

  return (
    <Container>
      <Paper elevation={5}>{job ? <Job job={job}></Job> : null}</Paper>
      <Paper elevation={10}>
        <Box p={10}>
          <Typography variant="h6" align="center" color="primary">
            Please enter your message
          </Typography>
          <Divider />
          <Grid container spacing={4}>
            {listChatMessages}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
