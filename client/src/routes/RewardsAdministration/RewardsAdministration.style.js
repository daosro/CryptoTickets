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
    button: {
      width: "fit-content",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      "& > label": {
        width: "100%",
        margin: "1rem 0",
        fontWeight: "bold",
      },
      "& > div": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      "& > input": {
        height: "1.8rem",
      },
    },
    input: {
      width: "-webkit-fill-available",
      margin: "0 20px 0 0",
    },
  },
  { name: "RewardsAdministration" }
);
