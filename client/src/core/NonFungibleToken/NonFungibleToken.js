import React, { useState } from "react";
import { MdOutlineSell, MdOutlineRestorePage, MdPayment } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { GoVerified } from "react-icons/go";

import Modal from "rodal";

import Card from "../Card";

import useStyles from "./NonFungibleToken.style";
import { getShortAddress } from "../../utils/web3";
import TokenDetails from "../TokenDetails/TokenDetails";

const NonFungibleToken = ({
  metadata,
  metadata: { image, name, tokenId, price, seller, verified, soldout },
  title,
  tokenDetails,
  onSale = false,
  useToke,
  saleToken,
  buyToken,
  removeFromSell,
}) => {
  const classes = useStyles({ soldout });
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const toggleDetailModal = () => {
    setIsDetailModalVisible((prevState) => !prevState);
  };

  return (
    <>
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
                <div className={classes.icon} onClick={toggleDetailModal}>
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
              {buyToken && !soldout && (
                <div className={classes.icon} onClick={buyToken}>
                  <MdPayment size={20} />
                </div>
              )}
            </div>
          )
        }
      >
        <div className={classes.content}>
          {soldout && (
            <div className={classes.soldout}>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/soldout.png"}
                alt="soldout"
              />
            </div>
          )}
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
                {seller && (
                  <div className={classes.owner}>
                    {verified && (
                      <span className={classes.verified}>
                        <GoVerified />
                      </span>
                    )}
                    {getShortAddress(seller)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
      {isDetailModalVisible && (
        <Modal
          visible
          closeOnEsc
          customStyles={{ width: "80%", height: "70%" }}
          onClose={toggleDetailModal}
          animation="flip"
          duration={500}
        >
          <TokenDetails metadata={metadata}></TokenDetails>
        </Modal>
      )}
    </>
  );
};

export default NonFungibleToken;
