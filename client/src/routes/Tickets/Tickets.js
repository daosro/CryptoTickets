import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Modal from "rodal";

import { CHAIN_ID } from "../../constants/chain";
import { USER_ZONE_SUBSCRIBER_PATH } from "../../constants/routes";
import { notify } from "../../utils/notifications";
import { getOnSaleTokenIds } from "../../utils/contracts";
import {
  getContractAddress,
  getTokenBalanceOf,
  getTokenMetadataByIndex,
} from "../../utils/web3";

import CryptoTicketsMarketplaceContract from "../../contracts/CryptoTicketsMarketplace.json";

import { Web3Context } from "../../context/Web3";
import Card, { CardContainer } from "../../core/Card";
import Button from "../../core/Button";
import NonFungibleToken from "../../core/NonFungibleToken";

import useStyles from "./Tickets.style";
import withConnectionRequired from "../../hocs/withConnectionRequired";
import LoadingPage from "../../core/LoadingPage";

const refreshTokensMetadata = async (contracts, accounts) => {
  const result = { subscriberNFT: null, ticketsNFTs: [] };
  const account = accounts[0];
  const membershipTokensLength = await getTokenBalanceOf(
    contracts.membership,
    account
  );
  if (membershipTokensLength > 0) {
    const metadata = await getTokenMetadataByIndex(
      contracts.membership,
      account,
      0
    );
    result.subscriberNFT = { ...metadata, owner: account };
  }
  const ticketsTokensLength = await getTokenBalanceOf(
    contracts.matchTickets,
    account
  );
  if (ticketsTokensLength > 0) {
    const tokensMetadata = [];

    for (let i = 0; i < ticketsTokensLength; i++) {
      const metadata = await getTokenMetadataByIndex(
        contracts.matchTickets,
        account,
        i
      );
      if (metadata) {
        tokensMetadata.push({ ...metadata, owner: account });
      }
    }
    result.ticketsNFTs = tokensMetadata;
  }

  return result;
};

const Tickets = () => {
  const classes = useStyles();
  const { web3, accounts, contracts } = useContext(Web3Context);
  const [isApprovedForAll, setIsApprovedForAll] = useState(false);
  const [subscriberNFTMetadata, setSubscriberNFTMetadata] = useState(null);
  const [ticketsNFTsMetadata, setTicketsNFTsMetadata] = useState();
  const [onSaleTokenList, setonSaleTokenList] = useState([]);
  const [{ isSellModalOpen, ticketId, price }, setModal] = useState({
    isSellModalOpen: false,
    ticketId: null,
    price: null,
  });

  const toggleSellModal = useCallback((ticketId) => {
    setModal((prevState) => ({
      ...prevState,
      isSellModalOpen: !prevState.isSellModalOpen,
      ticketId,
      price: ticketId ? prevState.price : 0,
    }));
  }, []);

  const onTicketValueChange = useCallback((event) => {
    console.log(event.target.value);
    setModal((prevState) => ({
      ...prevState,
      price: Number(event.target.value),
    }));
  }, []);

  const marketplaceContractAddress = useMemo(() => {
    return getContractAddress(CHAIN_ID, CryptoTicketsMarketplaceContract);
  }, []);

  useEffect(() => {
    if (accounts?.[0] || contracts.lenght) {
      const getUserToken = async () => {
        const { subscriberNFT, ticketsNFTs } = await refreshTokensMetadata(
          contracts,
          accounts
        );
        setSubscriberNFTMetadata(subscriberNFT);
        setTicketsNFTsMetadata(ticketsNFTs);
        const onSaleTokens = await getOnSaleTokenIds(contracts);
        setonSaleTokenList(onSaleTokens);
      };

      const checkIfIsApprovedForAll = async () => {
        const isApproved = await contracts.matchTickets.methods
          .isApprovedForAll(accounts[0], marketplaceContractAddress)
          .call();
        setIsApprovedForAll(isApproved);
      };
      getUserToken();
      checkIfIsApprovedForAll();
    }
  }, [accounts, contracts, marketplaceContractAddress]);

  const burnTicketHandler = useCallback(
    async (ticketId) => {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );
      try {
        await contracts.matchTickets.methods
          .burnTicket(ticketId)
          .send()
          .on("receipt", async () => {
            const { subscriberNFT, ticketsNFTs } = await refreshTokensMetadata(
              contracts,
              accounts
            );
            setSubscriberNFTMetadata(subscriberNFT);
            setTicketsNFTsMetadata(ticketsNFTs);
            notify(
              "Congratulations!",
              "Ticket burned successfully",
              "success",
              5000
            );
          })
          .on("error", (error, receipt) => {
            notify("Something went wrong", error?.message, "danger", 10000);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [contracts, accounts]
  );

  const sellTicketHandler = useCallback(async () => {
    notify(
      "Processing...",
      "This process may take several minutes, please wait.",
      "info",
      10000
    );
    try {
      const addTokenToMarketplaceHandler = async () => {
        await contracts.marketplace.methods
          .addListing(ticketId, web3.utils.toWei(price.toString(), "ether"))
          .send()
          .on("receipt", async () => {
            const onSaleTokens = await getOnSaleTokenIds(contracts);
            setonSaleTokenList(onSaleTokens);
            notify(
              "Congratulations!",
              "Ticket add successfully to the marketplace",
              "success",
              5000
            );
          });
      };

      if (isApprovedForAll) {
        await addTokenToMarketplaceHandler();
      } else {
        await contracts.matchTickets.methods
          .setApprovalForAll(marketplaceContractAddress, true)
          .send()
          .on("receipt", async () => {
            await addTokenToMarketplaceHandler();
            setIsApprovedForAll(true);
          })
          .on("error", (error) => {
            notify("Something went wrong", error?.message, "danger", 10000);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    web3,
    contracts,
    ticketId,
    price,
    isApprovedForAll,
    marketplaceContractAddress,
  ]);

  const removeFromSellTicketHandler = useCallback(
    async (tokenId) => {
      notify(
        "Processing...",
        "This process may take several minutes, please wait.",
        "info",
        10000
      );
      try {
        await contracts.marketplace.methods
          .removeListing(tokenId)
          .send()
          .on("receipt", async () => {
            const onSaleTokens = await getOnSaleTokenIds(contracts);
            setonSaleTokenList(onSaleTokens);
            notify(
              "Congratulations!",
              "Ticket removed successfully for the marketplace",
              "success",
              5000
            );
          })
          .on("error", (error) => {
            notify("Something went wrong", error?.message, "danger", 10000);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [contracts]
  );

  return (
    <div className={classes.root}>
      <h2>Mis entradas</h2>
      <CardContainer>
        {subscriberNFTMetadata ? (
          <NonFungibleToken
            metadata={subscriberNFTMetadata}
            title={"Abono de Socio"}
            tokenDetails={() => {}}
          />
        ) : (
          <Card
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            xxl={2.4}
            header={"A??n no eres socio"}
          >
            <div className={classes.cardContent}>
              <div className={classes.cardText}>
                No esperes m??s y hazte socio hoy mismo
              </div>
              <Link to={USER_ZONE_SUBSCRIBER_PATH}>
                <Button className={classes.carHeader}>Quiero ser socio</Button>
              </Link>
            </div>
          </Card>
        )}
        {!ticketsNFTsMetadata ? (
          <LoadingPage />
        ) : (
          ticketsNFTsMetadata.map((metadata) => (
            <NonFungibleToken
              key={metadata.tokenId}
              metadata={metadata}
              title={"Crypto Ticket"}
              onSale={onSaleTokenList.includes(metadata.tokenId)}
              tokenDetails={() => {}}
              useToke={
                onSaleTokenList.includes(metadata.tokenId)
                  ? undefined
                  : () => burnTicketHandler(metadata.tokenId)
              }
              saleToken={
                onSaleTokenList.includes(metadata.tokenId)
                  ? undefined
                  : () => toggleSellModal(metadata.tokenId)
              }
              removeFromSell={
                onSaleTokenList.includes(metadata.tokenId)
                  ? () => removeFromSellTicketHandler(metadata.tokenId)
                  : undefined
              }
            />
          ))
        )}
      </CardContainer>
      {isSellModalOpen && (
        <Modal
          visible
          closeOnEsc
          onClose={toggleSellModal}
          animation="flip"
          duration={500}
        >
          <div className={classes.modalRoot}>
            <h3>Vender entrada</h3>
            <span>??Que precio quieres poner? </span>
            <input type="number" value={price} onChange={onTicketValueChange} />
            <div className={classes.modalFooter}>
              <Button onClick={toggleSellModal}>Cancelar</Button>
              <Button
                disabled={!price || price === "0" || price < 0}
                onClick={() => {
                  sellTicketHandler();
                  toggleSellModal();
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default withConnectionRequired(Tickets);
