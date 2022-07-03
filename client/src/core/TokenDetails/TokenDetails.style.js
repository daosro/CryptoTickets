import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      height: "-webkit-fill-available",
    },
    header: {
      display: "flex",
      marginBottom: "2rem",
      flexDirection: "row",
      "@media (max-width: 900px)": {
        flexDirection: "column",
      },
    },
    imageContainer: {
      marginRight: "3rem",
      "@media (max-width: 900px)": {
        marginRight: "0",
        display: "flex",
        justifyContent: "center",
      },
    },
    image: {
      maxWidth: "24rem",
    },
    tokenId: {
      fontSize: "xx-large",
    },
    owner: {
      "& span": {
        fontSize: "xlarge",
        fontWeight: "bold",
        color: "#0255a5",
      },
    },
    seller: {
      "& span": {
        fontSize: "xlarge",
        fontWeight: "bold",
        color: "#0255a5",
      },
    },
    priceContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      fontSize: "xx-large",
      fontWeight: "bold",
      margin: "20px 0",
      "& > span": {
        margin: "0 5px 0 0",
      },
      "& > img": {
        width: "40px",
        margin: "0 2px 0 5px",
      },
    },
    description: {
      width: "100%",
      margin: "15px 0",
    },
    descriptionLabel: {
      fontSize: "x-large",
      fontWeight: "bold",
      marginLeft: "10px",
    },
    descriptionText: {
      margin: "15px 0",
    },
    footer: {
      display: "flex",
      flexWrap: "wrap",
    },
    attribute: {
      backgroundColor: "#15b2e50f",
      borderRadius: "6px",
      border: "1px solid #15b2e5",
      padding: "10px",
      textAlign: "center",
      margin: "5px",
    },
    attributeType: {
      color: "#15b2e5",
      fontSize: "11px",
      fontWeight: "500",
      textTransform: "uppercase",
    },
    attributeValue: {
      whiteSpace: "nowrap",
    },
  },
  { name: "TokenDetails" }
);
