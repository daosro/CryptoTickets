import { Store } from "react-notifications-component";

export const notify = (title, message, type, duration = 10000) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__jackInTheBox"],
    animationOut: ["animate__animated", "animate__flipOutX"],
    dismiss: {
      duration: duration,
      onScreen: false,
    },
  });
};
