import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 20px 0 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    carHeader: {},
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
  { name: "UserArea" }
);
