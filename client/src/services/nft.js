import { ipfsPathToHttps } from "../utils/ipfs";

export const getNFTMetadataObject = async (tokenURI) => {
  const nftMetadataUri = ipfsPathToHttps(tokenURI);
  const response = await fetch(nftMetadataUri);
  const metadata = await response.json();
  return {
    ...metadata,
    image: ipfsPathToHttps(metadata.image),
  };
};
