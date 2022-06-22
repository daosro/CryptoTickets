import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      backgroundColor: "#ffffff",
      display: "flex",
      width: "100%",
      height: "4rem",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 4,
      position: "fixed",
      color: "#000000",
      borderBottom: "1px solid #d4d4d4",
    },
    leftSide: {
      display: "flex",
    },
    homeLink: {
      width: "150px",
      marginLeft: "20px",
      "@media (max-width: 575.98px)": {
        width: "40px",
      },
    },
    realmadridlogo: {
      height: "100%",
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/header_logo.svg)`,
      backgroundRepeat: "no-repeat",
      "@media (max-width: 575.98px)": {
        backgroundSize: "150px 100%",
      },
    },
    icon: {
      height: "2em",
      width: "2em",
      cursor: "pointer",
    },
    marginLeft: {
      marginLeft: "1rem",
    },
    marginRight: {
      marginRight: "1rem",
    },
    logo: {
      height: "3rem",
    },
    separator: {
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    },
    right: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      display: "flex",
      backgroundColor: "#0255a5",
      color: "#FFFFFF",
      textDecoration: "none",
      fontWeight: "bold",
      borderRadius: "3px",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.625rem 0.8125rem",
      fontSize: ".8125rem",
      marginRight: "1rem",
      height: "1.5rem",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#003366",
      },
    },
    ticketsButton: {
      "&:before": {
        content: '"\\e919"',
        display: "flex",
        fontFamily: "real-madrid-icons",
        color: "#fff",
        fontSize: "1.5rem",
        fontWeight: "400",
        lineHeight: "1",
        marginRight: "0.5rem",
        position: "static",
      },
    },
  },
  { name: "AppBar" }
);
