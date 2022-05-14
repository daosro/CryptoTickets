import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "5rem 4.1rem 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    arrow: {
      left: '50%',
      position: 'absolute',
      transform: 'translateX(-90%)',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: '10vh',
      width: '12rem',
    },
  },
  { name: "Home" }
);
