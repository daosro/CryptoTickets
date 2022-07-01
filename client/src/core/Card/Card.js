import React from "react";

import useStyles from "./Card.style";

const Card = ({
  xs = 12,
  sm = 12,
  md = 12,
  lg = 12,
  xl = 12,
  xxl = 12,
  header,
  image,
  alt,
  children,
  footer,
}) => {
  const classes = useStyles({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    withHeader: header !== undefined,
    withFooter: footer !== undefined,
  });
  return (
    <div className={classes.root}>
      {header && <div className={classes.header}>{header}</div>}
      {image && <img className={classes.image} src={image} alt={alt} />}
      <div className={classes.content}>{children}</div>
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
