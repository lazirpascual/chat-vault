import React, { useContext, useState, useEffect, useRef } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import {
  deleteConversation,
  getAllConversations,
} from "../../services/conversations";
import { getUserMessages, createMessage } from "../../services/messages";
import Divider from "@material-ui/core/Divider";
import { Search } from "@material-ui/icons";
import { IconButton, TextField } from "@material-ui/core";
import AddConversation from "../../components/addConversation/AddConversation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SendIcon from "@material-ui/icons/Send";
import "./messenger.css";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    // set current chat to first conversation upon initial load
    conversations.length > 0 &&
      !currentChat &&
      setCurrentChat(conversations[0]);
  }, [conversations, currentChat]);

  useEffect(() => {
    socket.current = io("https://chatvault.herokuapp.com");
    // fetch message from socket server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [onlineUsers]);

  useEffect(() => {
    socket.current.emit("addUser", user._id); // send user id to socket server
    socket.current.on("getUsers", (users) => {
      // retreive user's friends
      // for each friend, check if their user id matches the id of user who connected to the socket
      // if it does, set to onlineUsers state
      setOnlineUsers(
        user?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    // if socket message exists and if current chat is from sender, update message
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    // prev is used so messages do not have to be included in dependency list
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversations = await getAllConversations(user._id);
        setConversations(conversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const initialMessages = await getUserMessages(currentChat?._id);
        setMessages(initialMessages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // send message to socket server
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const newMessage = await createMessage(message);
      setMessages([...messages, newMessage]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      try {
        await deleteConversation(currentChat._id);
        setConversations(
          conversations.filter((convo) => convo._id !== currentChat._id)
        );
      } catch (error) {
        console.log(error);
      }
      conversations.length > 0
        ? setCurrentChat(conversations[0])
        : setCurrentChat(null);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuHeading">
            <span>Chats</span>
            <AddConversation
              conversations={conversations}
              setConversations={setConversations}
              setCurrentChat={setCurrentChat}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          </div>
          <div className="chatMenuWrapper">
            <div>
              <TextField
                onClick={(e) => setAnchorEl(e.currentTarget)}
                placeholder="Search for friends"
                className="chatMenuInput"
                InputProps={{
                  startAdornment: (
                    <Search style={{ marginRight: 10, marginLeft: 5 }} />
                  ),
                }}
              />
            </div>
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={user}
                  currentChat={currentChat}
                />
              </div>
            ))}
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxHeading">
                  <Conversation
                    conversation={currentChat}
                    currentUser={user}
                    linkToProfile={true}
                  />
                  <IconButton
                    className="chatBoxDeleteIcon"
                    onClick={handleDelete}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <form className="chatBoxBottom" onSubmit={handleSubmit}>
                  <input
                    value={newMessage}
                    className="chatMessageInput"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                  ></input>
                  <IconButton type="submit">
                    <SendIcon className="chatSubmitButton" />
                  </IconButton>
                </form>
              </>
            ) : (
              <div className="noConversationContainer">
                <span className="noConversationText">
                  Open/Create a Conversation to Start a Chat
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="chatOnline">
          {onlineUsers.length > 0 ? (
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          ) : (
            <div className="chatOnlineNoFriendsMessage">
              <h3 className="rightbarTitle">Online Friends</h3>
              <div>There are currently no friends online.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messenger;
