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
      padding: "20px 15px 5px",
      fontWeight: "bold",
      fontSize: "medium",
    },
    carImage: {
      width: "100%",
      paddingTop: "20px",
    },
    headerLink: {
      width: "100%",
    },
  },
  { name: "Admin" }
);
