import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      display: "flex",
      backgroundColor: "#0255a5",
      color: "#FFFFFF",
      textDecoration: "none",
      fontWeight: "bold",
      borderRadius: "3px",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.625rem 0.8125rem",
      fontSize: ".8125rem",
      marginRight: "1rem",
      height: "1.5rem",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#003366",
      },
    },
    connected: {
      cursor: "default",
      "&:hover": {
        backgroundColor: "#0255a5",
      },
    },
  },
  { name: "ConnectButton" }
);
