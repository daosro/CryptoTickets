import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      position: "fixed",
      left: "0",
      bottom: "0",
      width: "100%",
      height: "1,8rem",
      padding: "20px",
      textAlign: "center",
      zIndex: 4,
      color: "#9a9a9a",
      backgroundColor: "#e6e6e6",
      borderTop: "1px solid #d4d4d4",
    },
    logo: {
      "& > a": {
        top: "-10px",
        left: "50%",
        color: "#7b7b7b",
        display: "inline-block",
        zIndex: "5",
        position: "absolute",
        fontSize: "50px",
        fontFamily: "real-madrid-icons",
        fontWeight: "400",
        marginLeft: "-22px",
        width: "40px",
        height: "30px",
        cursor: "inherit",
      },
      "&:after": {
        content: '"\\e638"',
        display: "inline-block",
        position: "absolute",
        left: "50%",
        marginLeft: "-25px",
        top: "-25px",
        zIndex: "1",
        fontFamily: "real-madrid-icons",
        color: "#7b7b7b",
        fontSize: "50px",
        fontWeight: "400",
      },
    },
  },
  { name: "Footer" }
);
