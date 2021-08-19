import React, { useState, useContext } from "react";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { useTheme } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";
import "./editProfile.css";

const EditProfile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState(user.desc);
  const [currentCity, setCurrentCity] = useState(user.city);
  const [hometown, setHometown] = useState(user.from);
  const [relationshipStatus, setRelationshipStatus] = useState(
    user.relationship
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className="profileInfoButton"
        style={{ width: "15%" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        <EditIcon />
        <span style={{ marginLeft: 10 }}>Edit Profile</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Profile Picture</DialogTitle>
        <DialogContent className="editProfilePictureContainer">
          <img
            src={
              user?.profilePicture
                ? `${PF}${user?.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
            alt=""
            className="editProfilePicture"
          />
        </DialogContent>
        <DialogTitle id="responsive-dialog-title">Cover Photo</DialogTitle>
        <DialogContent className="editProfilePictureContainer">
          <img
            src={
              user?.coverPicture
                ? `${PF}${user?.coverPicture}`
                : `${PF}person/noCover.png`
            }
            alt=""
            className="editCoverPicture"
          />
        </DialogContent>
        <DialogTitle id="responsive-dialog-title">Bio</DialogTitle>
        <DialogContent>
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline={4}
          />
        </DialogContent>
        <DialogTitle id="responsive-dialog-title">
          Personal Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Current City"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              fullWidth
            />
            <TextField
              label="Hometown"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
              fullWidth
            />
            <FormControl>
              <InputLabel>Relationship Status</InputLabel>
              <Select
                style={{ marginTop: 25 }}
                value={relationshipStatus}
                onChange={(e) => setRelationshipStatus(e.target.value)}
                defaultValue={1}
              >
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>Married</MenuItem>
                <MenuItem value={3}>Complicated</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfile;
