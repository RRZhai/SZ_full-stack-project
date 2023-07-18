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
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ChatMessageDto } from "../models/chatMessageDto";
import Job from "./Job";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { set } from "react-hook-form";

const Chat = ({ currentUser, job }) => {
  console.log(job)
  const webSocket = useRef(null);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Opening websocket connection");
    webSocket.current = new WebSocket("ws://localhost:4000/chat");
    webSocket.current.onopen = (e) => {
      console.log("Websocket connection opened", e);
    };
    webSocket.current.onclose = (e) => {
      console.log("Websocket message close", e);
    };
    return () => {
      console.log("Closing websocket connection");
      webSocket.current.close();
    };
  }, []);

  useEffect(() => {
    webSocket.current.onmessage = (e) => {
      const chatMessageDto = JSON.parse(e.data);
      console.log("Websocket message received", chatMessageDto);
      setMessages((messages) => [
        ...messages,
        {
          user: currentUser,
          message: chatMessageDto.message,
        },
      ]);
    };
  }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message) {
      webSocket.current.send(
        JSON.stringify(new ChatMessageDto(currentUser, message))
      );
      setMessage("");
    }
  };

  const listChatMessages = messages.map((chatMessageDto, index) => {
    return (
      <ListItem key={index}>
        <Avatar
          alt={chatMessageDto.user.name}
          src={`../${chatMessageDto.user.profile_pic_num}.png`}
        />
        <ListItemText
          primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}
        />
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
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  name="message"
                  value={message}
                  label="Type your message..."
                  onChange={handleMessage}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="send"
                color="primary"
                onClick={sendMessage}
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
