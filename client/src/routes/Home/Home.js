import React, { useCallback } from "react";
import Select from "react-select";
import { ALLOWED_CHAINS, getSelectedChainId } from "../../constants/chain";
import useStyles from "./Home.style";

const getDefaultChainValue = () => {
  const chainId = getSelectedChainId();
  return ALLOWED_CHAINS.find((chain) => chain.value === chainId);
};
const Home = () => {
  const classes = useStyles();

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
