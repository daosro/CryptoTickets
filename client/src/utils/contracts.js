export const getOnSaleTokenIds = async (contracts) =>
  await contracts?.marketplace?.methods.getOnSaleTokens().call();

export const getOnSaleTokenInfo = async (contracts) =>
  await contracts?.marketplace?.methods.getOnSaleTokensInfo().call();
