import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 2rem 0",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
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
    },
    input: {
      width: "-webkit-fill-available",
      margin: "0 20px 0 0",
    },
  },
  { name: "TicketsAdministration" }
);
