import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindPopover } from "material-ui-popup-state";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShareIcon from "@material-ui/icons/Share";
import { removePost } from "../../services/posts";
import "./modifyPost.css";

const ModifyPost = ({ userId, post, deletePost, handleEditClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this post?")) {
      try {
        await removePost(post._id, userId);
        deletePost(post._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = () => {
    handleEditClick();
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton onClick={handleClick}>
            <MoreVert className="updatePost" />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            open={open}
          >
            <div className="modifyPostContainer">
              {userId === post.userId && (
                <>
                  <Button className="modifyPostButtons" onClick={handleEdit}>
                    <EditOutlinedIcon />
                    <div className="editText">Edit</div>
                  </Button>
                  <Button className="modifyPostButtons" onClick={handleDelete}>
                    <DeleteForeverIcon />
                    <div className="editText">Delete</div>
                  </Button>
                </>
              )}
              <Button className="modifyPostButtons">
                <ShareIcon />
                <div className="editText">Share</div>
              </Button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default ModifyPost;
