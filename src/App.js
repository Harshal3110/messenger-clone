import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Icon,
  IconButton,
} from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  // use state to do it fast and without refreshing
  // useState is a short term memory every time we refresh it erases the memory
  // useState = variable in react
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // use effect allows us to run a piece of code once it loads in
  // useEffect is a piece of code which executes on a condition
  // useEffect = run code on a condition in React

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // if its blank inside [],this code runs ONCE when the app component loads
    // if we have a variable like input, it will run everytime input changes
    setUsername(prompt("Please enter your name"));
  }, []); //condition

  const sendMessage = (event) => {
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // all the logic to send the message goes here
    setInput("");
    event.preventDefault(); // To avoid form from refreshing after every enter
  };

  return (
    <div className="app">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"
        alt=""
      />
      <h2>Welcome {username}</h2>
      {/* wrap it in a form for user input this will refresh it every time user hits enter */}
      {/* Use form to allow user to hit enter and submit instead of pressing send message button */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>

          {/* <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button> */}
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}
export default App;
