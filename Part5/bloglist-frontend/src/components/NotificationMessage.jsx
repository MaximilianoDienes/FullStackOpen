import React from "react";

const NotificationMessage = ({ type, message }) => {
  if (type === "" || message === "") {
    return;
  } else
    return (
      <div className={type} id="notification">
        <p>{message}</p>
      </div>
    );
};

export default NotificationMessage;
