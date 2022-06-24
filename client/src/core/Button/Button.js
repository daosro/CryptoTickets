import clsx from "clsx";
import React from "react";

import useStyles from "./Button.style";

const Button = ({ onClick, className, children, ...restProps }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className)}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Button;
