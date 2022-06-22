import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      justifySelf: "center",
      alignItems: "center",
    },
    title: {
      margin: "10px",
      fontSize: "20px",
      fontWeight: "bold",
    },
    connectText: {
      margin: "20px",
      fontSize: "15px",
    },
    installMetamask: {
      margin: "20px 0",
    },
    metamaskLink: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "10px",
      "& img": {
        margin: "20px 0 0",
        maxWidth: "10rem",
      },
    },
    legal: {
      fontSize: "10px",
    },
  },
  { name: "NotConnected" }
);
