import { useERC20Balance } from "@cartridge/utils";
import { useConnection } from "./context";
import { useAddress } from "./address";

export function useTokens(tokens?: string[]) {
  const { erc20: options, provider, isVisible } = useConnection();
  const { address } = useAddress();
  return useERC20Balance({
    address: address,
    contractAddress: [...options, ...(tokens ?? [])],
    provider: provider as any,
    interval: isVisible ? 3000 : undefined,
  });
}
