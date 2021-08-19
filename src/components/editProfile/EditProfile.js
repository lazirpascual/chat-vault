import React, { useState } from "react";
import { updateUser } from "../../services/users";
import Notification from "../notification/Notification";
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
import "./editProfile.css";

const EditProfile = ({ user, setUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState(user.desc);
  const [currentCity, setCurrentCity] = useState(user.city);
  const [hometown, setHometown] = useState(user.from);
  const [relationshipStatus, setRelationshipStatus] = useState(
    user.relationship
  );
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const updateProfile = async (event) => {
    event.preventDefault();
    setOpen(false);
    const updatedUser = {
      ...user,
      desc: bio,
      city: currentCity,
      from: hometown,
      relationship: relationshipStatus,
    };
    try {
      const responseSuccess = await updateUser(updatedUser);
      responseSuccess && setUser(updatedUser);
      setNotificationMessage(
        `${responseSuccess}. Too see changes, please re-login to your account.`
      );
      setOpenNotification(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Notification
        message={notificationMessage}
        open={openNotification}
        setOpen={setOpenNotification}
        type="success"
      />
      <Button
        className="profileInfoButton"
        style={{ width: "15%" }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
        <span style={{ marginLeft: 10 }}>Edit Profile</span>
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
        maxWidth="md"
        className="editProfileDialogContainer"
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
            variant="outlined"
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
          <DialogContentText className="editProfileTextFields">
            <TextField
              label="Current City"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
            />
            <TextField
              label="Hometown"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
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
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={updateProfile} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfile;
