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
      right: "50px",
      width: "100%",
      bottom: "100px",
      position: "absolute",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      "& span": {
        marginRight: "1rem",
      },
    },
    selectContainer: {
      minWidth: "300px",
    },
  },
  { name: "Home" }
);
