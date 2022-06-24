import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 4.1rem 0",
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
      padding: "5px 15px 10px",
    },
    image: {
      maxWidth: "40%",
      margin: "20px 20px 40px",
    },
  },
  { name: "Subscriber" }
);
