import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {},
    content: {
      padding: "10px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: "medium",
    },
    id: {
      marginLeft: "10px",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    icon: {
      width: "25px",
      height: "25px",
      cursor: "pointer",
    },
  },
  { name: "NonFungibleToken" }
);
