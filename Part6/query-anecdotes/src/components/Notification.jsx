/* eslint-disable no-constant-condition */
import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const value = useNotificationValue();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (value === "") {
    return null;
  } else {
    return <div style={style}>{value}</div>;
  }
};

export default Notification;
