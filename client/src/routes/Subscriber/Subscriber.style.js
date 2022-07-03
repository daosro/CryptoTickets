import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "1rem 2rem 5rem 2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      fontWeight: "bold",
      fontSize: "medium",
      padding: "5px 15px 10px",
    },
    text: {
      textAlign: "justify",
      padding: "5px 15px 5px",
    },
    image: {
      maxWidth: "40%",
      margin: "20px 20px 40px",
    },
    button: {
      margin: "0 0 40px",
    },
  },
  { name: "Subscriber" }
);
