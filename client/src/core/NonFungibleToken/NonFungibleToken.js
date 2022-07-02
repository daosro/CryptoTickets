import React from "react";
import { MdOutlineSell, MdOutlineRestorePage } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Card from "../Card";

import useStyles from "./NonFungibleToken.style";

const NonFungibleToken = ({
  metadata,
  title,
  tokenDetails,
  useToke,
  sellToken,
  removeFromSell,
  onSale = false,
}) => {
  const classes = useStyles();
  return (
    <Card
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      xxl={2.4}
      image={metadata.image}
      header={title}
      footer={
        (tokenDetails || useToke || sellToken) && (
          <div className={classes.footerContainer}>
            {tokenDetails && (
              <div className={classes.icon} onClick={tokenDetails}>
                <TbListDetails size={20} />
              </div>
            )}
            {useToke && (
              <div className={classes.icon} onClick={useToke}>
                <IoTicketOutline size={20} />
              </div>
            )}
            {sellToken && (
              <div className={classes.icon} onClick={sellToken}>
                <MdOutlineSell size={20} />
              </div>
            )}
            {removeFromSell && (
              <div className={classes.icon} onClick={removeFromSell}>
                <MdOutlineRestorePage size={20} />
              </div>
            )}
          </div>
        )
      }
    >
      <div className={classes.content}>
        {onSale && <div className={classes.onSale} />}
        <div className={classes.title}>{metadata.name}</div>
        <div className={classes.id}>{`#${metadata.tokenId}`}</div>
      </div>
    </Card>
  );
};

export default NonFungibleToken;
