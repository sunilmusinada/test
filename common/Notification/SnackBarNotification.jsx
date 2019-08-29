import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
export default function SnackBarNotification(props) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right"
  });
  const successStyle = {
    backgroundColor: "#008000"
  };
  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
    setState({ open: true, ...newState });
  };

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        style={successStyle}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.Message}</span>}
      />
    </div>
  );
}
