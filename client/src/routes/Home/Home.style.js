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
    groupStyles: {
      right: "1.8rem",
      bottom: "4rem",
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      backgroundColor: "#fff",
      padding: "10px",
      "& span": {
        marginBottom: "10px",
      },
    },
    selectContainer: {
      minWidth: "300px",
    },
    content: {
      fontFamily: "real-madrid-icons",
      fontSize: "large",
      textAlign: "justify",
      margin: "2rem",
    },
    developers: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      margin: "2rem 2rem 5rem 2rem",
      "@media (max-width: 800px)": {
        flexDirection: "column",
      },
    },
    developerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "x-large",
      fontWeight: 500,
      margin: "2rem",
      "& a": {
        marginTop: "1rem",
        color: "#0a66c2",
        cursor: "pointer",
      },
      "& img": {
        borderRadius: "100px",
      },
    },
  },
  { name: "Home" }
);
