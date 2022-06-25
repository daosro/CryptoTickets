import clsx from "clsx";
import React from "react";

import useStyles from "./Button.style";

const Button = ({ onClick, disabled, className, children, ...restProps }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, className, {
        [classes.disabled]: disabled,
      })}
      onClick={!disabled ? onClick : undefined}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Button;
