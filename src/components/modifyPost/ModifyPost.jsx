import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShareIcon from "@material-ui/icons/Share";
import { removePost } from "../../services/posts";
import "./modifyPost.css";

const ModifyPost = ({ userId, post, deletePost }) => {
  const handleDelete = async () => {
    try {
      await removePost(post._id, userId);
      deletePost(post._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton {...bindTrigger(popupState)}>
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
          >
            <div className="modifyPostContainer">
              {userId === post.userId && (
                <>
                  <Button className="modifyPostButtons">
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
