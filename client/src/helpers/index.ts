import { constants } from "starknet";

export const formatBalance = (balance: string, exludes?: string[]) => {
  // Catch prefix until number
  const prefix = balance.slice(0, balance.search(/\d/));
  // Exclude each substring from prefix
  const cleaned =
    exludes?.reduce((prev, curr) => prev.replace(curr, ""), prefix) ?? prefix;
  return `${cleaned}${parseFloat(balance.replace(prefix, "")).toLocaleString(
    undefined,
    { maximumFractionDigits: 18 },
  )}`;
};

export const getChainId = (rpc: string | undefined) => {
  if (!rpc) return undefined;
  if (rpc.includes("mainnet")) {
    return constants.StarknetChainId.SN_MAIN;
  } else if (rpc.includes("testnet") || rpc.includes("sepolia")) {
    return constants.StarknetChainId.SN_SEPOLIA;
  }
  return constants.StarknetChainId.SN_MAIN;
};
