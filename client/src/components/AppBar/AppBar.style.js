import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      backgroundColor: "#ffffff",
      display: "flex",
      width: "100%",
      height: "4rem",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 4,
      position: "fixed",
      color: "#000000",
      borderBottom: '1px solid #d4d4d4',
    },
    icon: {
      height: "2em",
      width: "2em",
      cursor: "pointer",
    },
    marginLeft: {
      marginLeft: "1rem",
    },
    marginRight: {
      marginRight: "1rem",
    },
    logo: {
      height: "3rem",
    },
    separator: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    ticketsButton: {
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
      "&:hover": {
        backgroundColor: "#003366",
      },
      "&:before": {
        content: '"\\e919"',
        display: "flex",
        fontFamily: "real-madrid-icons",
        color: "#fff",
        fontSize: "1.5rem",
        fontWeight: "400",
        lineHeight: "1",
        marginRight: "0.5rem",
        position: "static",
      },
    },
  },
  { name: "AppBar" }
);
