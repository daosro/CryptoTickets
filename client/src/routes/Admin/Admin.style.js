import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 2rem 0",
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
