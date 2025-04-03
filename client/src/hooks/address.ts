import { useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { addAddressPadding } from "starknet";
import { useSearchParams } from "react-router-dom";

export function useAddress() {
  const { isConnected, address: self } = useAccount();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return addAddressPadding(searchParams.get("address") || self || "0x0");
  }, [searchParams, self]);

  const isSelf = useMemo(() => {
    return isConnected && address === self;
  }, [address, self, isConnected]);

  const isZero = useMemo(() => {
    const address = addAddressPadding(searchParams.get("address") || "0x0");
    return BigInt(address) === 0n;
  }, [searchParams]);

  return {
    self,
    address,
    isSelf,
    isZero,
  };
}
