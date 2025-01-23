import { constants } from "starknet";
import ControllerConnector from "@cartridge/connector/controller";
import {
  KeychainOptions,
  ProfileOptions,
  ProviderOptions,
} from "@cartridge/controller";
import { getSocialPolicies, getRegistryPolicies } from "@bal7hazar/arcade-sdk";
import { ERC20_ADDRESSES } from "@/constants";

const chainId = constants.StarknetChainId.SN_MAIN;

const provider: ProviderOptions = {
  defaultChainId: chainId,
  chains: [{ rpcUrl: import.meta.env.VITE_RPC_URL }],
};

const keychain: KeychainOptions = {
  policies: {
    contracts: {
      ...getSocialPolicies(chainId).contracts,
      ...getRegistryPolicies(chainId).contracts,
    },
  },
};

const profile: ProfileOptions = {
  preset: "cartridge",
  slot: "arcade",
  namespace: "ARCADE",
  tokens: {
    erc20: ERC20_ADDRESSES,
  },
};

export const controller = new ControllerConnector({
  ...provider,
  ...keychain,
  ...profile,
});
