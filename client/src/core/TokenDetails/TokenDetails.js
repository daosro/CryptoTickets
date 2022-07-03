import React from "react";
import { getShortAddress } from "../../utils/web3";

import { GrTextAlignFull } from "react-icons/gr";

import useStyles from "./TokenDetails.style";

const TokenDetails = ({ metadata }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={metadata.image}
            alt={metadata.name}
          />
        </div>
        <div className={classes.title}>
          <h2>
            {metadata.name}
            {metadata.tokenId && (
              <span className={classes.tokenId}>{` #${metadata.tokenId}`}</span>
            )}
          </h2>
          {metadata.owner && (
            <span className={classes.owner}>
              <span>Owned by:</span>
              {` ${getShortAddress(metadata.owner)}`}
            </span>
          )}
          {metadata.seller && (
            <span className={classes.seller}>
              <span>Owned by:</span>
              {` ${getShortAddress(metadata.seller)}`}
            </span>
          )}
          {metadata.price && (
            <div className={classes.priceContainer}>
              <span>Price:</span>
              {` ${metadata.price}`}
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/cryptos/matic.png"
                }
                alt="matic"
              />
            </div>
          )}
          {metadata.description && (
            <div className={classes.description}>
              <div>
                <GrTextAlignFull size={25} />
                <span className={classes.descriptionLabel}>Description:</span>
              </div>
              <div className={classes.descriptionText}>
                {metadata.description}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.footer}>
        {metadata.attributes &&
          metadata.attributes.map(({ trait_type, value }) => {
            return (
              <div className={classes.attribute}>
                <div className={classes.attributeType}>{trait_type}</div>
                <div className={classes.attributeValue}>{value}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TokenDetails;
