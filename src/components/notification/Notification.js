import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Typography } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({ message, open, setOpen, type }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="standard" onClose={handleClose} severity={type}>
          <Typography variant="h5" align="center">
            {message}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
