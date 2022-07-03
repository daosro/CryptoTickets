import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
      flexDirection: "column",
    },
    cardContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "justify",
      alignItems: "center",
    },
    cardText: {
      widows: "100%",
      fontSize: "0.9rem",
      fontWeight: "bold",
      padding: "2rem 1rem",
    },
    modalRoot: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "-webkit-fill-available",
    },
    modalFooter: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      marginBottom: "20px",
    },
  },
  { name: "Tickets" }
);
