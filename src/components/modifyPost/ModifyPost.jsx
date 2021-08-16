import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import "./modifyPost.css";

const ModifyPost = () => {
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
              <Button className="modifyPostButtons">Edit Post</Button>
              <Button className="modifyPostButtons">Delete Post</Button>
              <Button className="modifyPostButtons">Share Post</Button>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default ModifyPost;
