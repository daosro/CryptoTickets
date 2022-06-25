import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    root: {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      margin: "5px",
      minHeight: "25vh",
      "@media (max-width: 575.98px)": {
        width: ({ xs }) => `calc(((100% / 12 )* ${xs}) - 10px)`,
      },
      "@media (min-width: 576px) and (max-width: 767.98px)": {
        width: ({ sm }) => `calc(((100% / 12 )* ${sm}) - 10px)`,
      },
      "@media (min-width: 768px) and (max-width: 991.98px)": {
        width: ({ md }) => `calc(((100% / 12 )* ${md}) - 10px)`,
      },
      "@media (min-width: 992px)": {
        width: ({ lg }) => `calc(((100% / 12 )* ${lg}) - 10px)`,
      },
    },
    header: {
      padding: "10px",
      fontWeight: "bold",
      fontSize: "larger",
      backgroundColor: "#00000008",
      borderBottom: "1px solid #00000020",
    },
    image: {
      width: "100%",
      height: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
    },
    content: {},
    footer: {},
  },
  { name: "Card" }
);
