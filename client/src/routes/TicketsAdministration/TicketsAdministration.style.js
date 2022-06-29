import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 2rem 0",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    matchTicketRoot: {
      width: "100%",
      height: "25vh",
      margin: "20px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column",
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/campo-del-madrid.jpeg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "0% 30%",
    },
    logo: {
      width: "80px",
      margin: "0 10px",
    },
    logo_small: {
      width: "65px",
      margin: "0 10px",
    },
  },
  { name: "TicketsAdministration" }
);
