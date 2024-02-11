/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { createContext, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();
const queryClient = new QueryClient();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        {props.children}
      </NotificationContext.Provider>
    </QueryClientProvider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useSetNotification = () => {
  const [, notificationDispatch] = useContext(NotificationContext);
  return (message, time) => {
    notificationDispatch({ type: "SET", payload: message });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, time);
  };
};

export default NotificationContext;
