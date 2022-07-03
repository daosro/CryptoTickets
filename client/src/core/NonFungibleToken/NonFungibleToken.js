import React from "react";
import { MdOutlineSell, MdOutlineRestorePage, MdPayment } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Card from "../Card";

import useStyles from "./NonFungibleToken.style";
import { getShortAddress } from "../../utils/web3";

const NonFungibleToken = ({
  metadata: { image, name, tokenId, price, owner, seller },
  title,
  tokenDetails,
  onSale = false,
  useToke,
  saleToken,
  buyToken,
  removeFromSell,
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
      image={image}
      header={title}
      footer={
        (tokenDetails ||
          useToke ||
          saleToken ||
          removeFromSell ||
          buyToken) && (
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
            {saleToken && (
              <div className={classes.icon} onClick={saleToken}>
                <MdOutlineSell size={20} />
              </div>
            )}
            {removeFromSell && (
              <div className={classes.icon} onClick={removeFromSell}>
                <MdOutlineRestorePage size={20} />
              </div>
            )}
            {buyToken && (
              <div className={classes.icon} onClick={buyToken}>
                <MdPayment size={20} />
              </div>
            )}
          </div>
        )
      }
    >
      <div className={classes.content}>
        {onSale && <div className={classes.onSale} />}
        <div className={classes.details}>
          <div className={classes.title}>{name}</div>
          {tokenId && <div className={classes.id}>{`#${tokenId}`}</div>}
        </div>
        {price && (
          <>
            <p className={classes.priceLabel}>Price:</p>
            <div className={classes.priceContainer}>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/cryptos/matic.png"
                }
                alt="matic"
              />
              {price}
              <div className={classes.owner}>{getShortAddress(seller)}</div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default NonFungibleToken;
