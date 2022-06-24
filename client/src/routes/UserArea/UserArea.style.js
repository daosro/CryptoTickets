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
      padding: "5px 15px 10px",
    },
    carImage: {
      width: "100%",
    },
  },
  { name: "UserArea" }
);
