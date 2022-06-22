import React from "react";

import useStyles from "./Card.style";

const Card = ({
  xs = 12,
  sm = 12,
  md = 12,
  lg = 12,
  header,
  children,
  footer,
}) => {
  const classes = useStyles({
    xs,
    sm,
    md,
    lg,
  });
  return (
    <div className={classes.root}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{children}</div>
      <div className={classes.footer}>{footer}</div>
    </div>
  );
};

export default Card;
