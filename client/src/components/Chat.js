import { Container, List, ListItem, Paper, Typography, ListItemText, Grid, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ChatMessageDto } from "../models/chatMessageDto";
import Job from "./Job";

const Chat = ({currentUser, job}) => {

    const [messages, setMessages] = useState([
        new ChatMessageDto("Hello"),
    ])

    const listChatMessages = messages.map((chatMessageDto, index) => {
        <ListItem key={index}>
            <ListItemText primary={`${currentUser.name}: ${chatMessageDto}`} />
        </ListItem>
    })

  const WebSocket = require("ws");
  return (
      <Container>
        <Paper elevation={5}>
            {job ? <Job job={job}></Job> : null}
        </Paper>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4" align="center" color="primary">
              Please enter your message
            </Typography>
            <Divider />
            <Grid container spacing={4}>
                <List>
                    {listChatMessages}
                </List>
            </Grid>
          </Box>
        </Paper>
      </Container>
  );
};

export default Chat;
