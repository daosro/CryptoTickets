import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "0 2rem 5rem 2rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      borderBottom: "1px solid #ccc",
      paddingBottom: "1rem",
      "& > p": {
        fontWeight: "bold",
      },
    },
  },
  { name: "RewardsAdministration" }
);
