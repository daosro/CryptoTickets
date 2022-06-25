export const ipfsPathToHttps = (ipfsPath) => {
  return ipfsPath.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${ipfsPath.split("ipfs://")[1]}`
    : ipfsPath;
};
