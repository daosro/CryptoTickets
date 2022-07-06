import React, { useCallback, useContext } from "react";
import Select from "react-select";
import { ALLOWED_CHAINS, getSelectedChainId } from "../../constants/chain";
import { Web3Context } from "../../context/Web3";
import useStyles from "./Home.style";

const getDefaultChainValue = () => {
  const chainId = getSelectedChainId();
  return ALLOWED_CHAINS.find((chain) => chain.value === chainId);
};
const Home = () => {
  const classes = useStyles();
  const { web3, accounts } = useContext(Web3Context);

  const onChangeChain = useCallback((selectChain) => {
    localStorage.setItem("currenctChainId", selectChain.value);
    window.location.reload();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.groupStyles}>
        <span>Seleccione una blockchain </span>
        <span className={classes.selectContainer}>
          <Select
            menuPlacement="top"
            options={ALLOWED_CHAINS}
            onChange={onChangeChain}
            defaultValue={getDefaultChainValue()}
          />
        </span>
      </div>
    </div>
  );
};

export default Home;
