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
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      "& span": {
        marginBottom: "10px",
      },
    },
    selectContainer: {
      minWidth: "300px",
    },
  },
  { name: "Home" }
);
