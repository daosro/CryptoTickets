import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {},
    content: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    details: {
      display: "flex",
      flexDirection: "row",
    },
    priceLabel: {
      width: "100%",
      display: "flex",
      alignItems: "start",
      fontSize: "medium",
      fontWeight: "bold",
      marginBottom: "2px",
    },
    priceContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      fontSize: "medium",
      fontWeight: "bold",
      "& > img": {
        width: "25px",
        margin: "0 2px 0 0",
      },
    },
    title: {
      fontWeight: "bold",
      fontSize: "medium",
    },
    id: {
      marginLeft: "10px",
    },
    owner: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
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
    onSale: {
      width: "100px",
      height: "100px",
      position: "absolute",
      top: "-15px",
      left: "-14px",
      background: `url(${process.env.PUBLIC_URL}/assets/images/sale-tag.svg) no-repeat center`,
      backgroundSize: "120px 100px",
    },
  },
  { name: "NonFungibleToken" }
);
