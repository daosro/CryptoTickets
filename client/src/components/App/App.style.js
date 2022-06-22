import { createUseStyles } from "react-jss";

export default createUseStyles(
  {
    "@global": {
      // Change the aplication scrollbar color and size
      "*::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "10px",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#dfdfdf",
        borderRadius: "10px",
      },
      html: {
        height: "100%",
      },
      body: {
        height: "100%",
        // color: "#ffffff",
        backgroundColor: "#ffffff",
        margin: "0",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace",
      },
      "#root": {
        minHeight: "100vh",
      },
      a: {
        color: "#000",
        textDecoration: "none",
      },
    },
    root: {
      minHeight: "100vh",
    },
    footer: {
      zIndex: 4,
      position: "sticky",
      bottom: "0",
      boxShadow: "0px -2px 5px #101010",
    },
  },
  { name: "App" }
);
