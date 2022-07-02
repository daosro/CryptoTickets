import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      margin: "8px",
      background: "#fff",
      borderRadius: "5px",
      minHeight: "26rem",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      textAlign: "left",
      textDecoration: "none !important",
      transition: "box-shadow ease 0.3s",
      "@media (max-width: 575.98px)": {
        width: ({ xs }) => `calc(((100% / 12 )* ${xs}) - 16px)`,
      },
      "@media (min-width: 576px) and (max-width: 767.98px)": {
        width: ({ sm }) => `calc(((100% / 12 )* ${sm}) - 16px)`,
      },
      "@media (min-width: 768px) and (max-width: 991.98px)": {
        width: ({ md }) => `calc(((100% / 12 )* ${md}) - 16px)`,
      },
      "@media (min-width: 992px) and (max-width: 1199.98px)": {
        width: ({ lg }) => `calc(((100% / 12 )* ${lg}) - 16px)`,
      },
      "@media (min-width: 1200px) and (max-width: 1399.98px)": {
        width: ({ xl }) => `calc(((100% / 12 )* ${xl}) - 16px)`,
      },
      "@media (min-width: 1400px)": {
        width: ({ xxl }) => `calc(((100% / 12 )* ${xxl}) - 16px)`,
      },
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      fontWeight: "bold",
      fontSize: "larger",
      backgroundColor: "#00000008",
      borderBottom: "1px solid #00000020",
      maxHeight: "50px",
    },
    image: {
      width: "100%",
      height: ({ withFooter }) => `calc(30vh - ${withFooter ? "105px" : 0})`,
      maxWidth: "100%",
    },
    content: {},
    footer: {
      minWidth: "100%",
      marginTop: "auto",
      boxSizing: "border-box",
      padding: ".75rem 1.25rem",
      backgroundColor: "#00000008",
      borderTop: "1px solid #00000020",
    },
  },
  { name: "Card" }
);
