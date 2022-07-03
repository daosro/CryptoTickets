import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "0 2rem 5rem 2rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    carText: {
      padding: "15px",
      height: "20vh",
    },
  },
  { name: "Admin" }
);
