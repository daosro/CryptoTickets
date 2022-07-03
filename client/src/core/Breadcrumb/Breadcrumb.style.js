import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 20px 20px 20px",
      backgroundColor: "#0255a5",
      color: "#FFFFFF",
      textDecoration: "none",
      fontWeight: "bold",
      "& > span": {
        margin: "0 5px",
        "& > a, span": {
          marginLeft: "5px",
        },
      },
    },
  },
  { name: "Breadcrumb" }
);
