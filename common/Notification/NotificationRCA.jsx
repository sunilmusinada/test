import React, { Component } from "react";
import { Notification, Button } from "@scuf/common";
const ReactToastify = require("react-toastify");
const ToastNotification = ({ closeToast }) => (
  <Notification
    className="toast-notification"
    severity="success"
    onCloseClicked={closeToast}
    hasIcon={true}
    title="Example Toast"
    onDetailsClicked={() => alert("Details")}
  />
);

class NotificationRCA extends React.Component {
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.notify}
          content="Show Toast In Bottom Right"
        />
        <ReactToastify.ToastContainer
          hideProgressBar={true}
          closeOnClick={false}
          closeButton={false}
          newestOnTop={true}
          position="bottom-right"
          toastClassName="toast-notification-wrap"
        />
      </div>
    );
  }

  notify() {
    ReactToastify.toast(<ToastNotification closeToast={false} />);
  }
}
export default NotificationRCA;
