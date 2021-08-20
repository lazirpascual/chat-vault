import React, { useState, useContext, useEffect } from "react";
import { getUserFriends } from "../../services/users";
import { AuthContext } from "../../context/AuthContext";
import Friends from "../friends/Friends";
import {
  createConversation,
  getConversation,
} from "../../services/conversations";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Search } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import "./addConversation.css";

const ITEM_HEIGHT = 48;

const AddConversation = ({
  setCurrentChat,
  conversations,
  setConversations,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await getUserFriends(user?._id);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    user?._id && getFriends();
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const startConversation = async (friendId) => {
    setAnchorEl(null);
    // check if user is already in a convo with the friend
    const existingUser = conversations.filter((convo) =>
      convo.members.some((m) => m === friendId)
    );
    // if convo already exists, go to it. Else, create a new one
    if (existingUser.length > 0) {
      const currentConversation = await getConversation(user._id, friendId);
      setCurrentChat(currentConversation);
    } else {
      if (window.confirm("Start a chat with this friend?")) {
        const savedConversation = await createConversation({
          senderId: user._id,
          receiverId: friendId,
        });
        setConversations([...conversations, savedConversation]);
        setCurrentChat(savedConversation);
      }
    }
  };

  return (
    <div className="addConversationContainer">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonAddIcon className="addConversationIcon" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 10,
            width: "30ch",
          },
        }}
      >
        <TextField
          placeholder="Search for friends"
          className="addConversationMenuSearch"
          InputProps={{
            startAdornment: (
              <Search style={{ marginRight: 10, marginLeft: 5 }} />
            ),
          }}
        />
        {friends.map((friend) => (
          <MenuItem
            key={friend._id}
            onClick={() => startConversation(friend._id)}
          >
            <Friends key={friend.id} user={friend} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AddConversation;
