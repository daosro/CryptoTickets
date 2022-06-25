import React from "react";

import Card from "../Card";

import useStyles from "./NonFungibleToken.style";

const NonFungibleToken = ({ metadata }) => {
  const classes = useStyles();
  return (
    <Card xs={12} sm={6} md={3} lg={4} image={metadata.image}>
      <div className={classes.content}>
        <div className={classes.title}>{metadata.name}</div>
        <div className={classes.id}>{`#${metadata.tokenId}`}</div>
      </div>
    </Card>
  );
};

export default NonFungibleToken;
