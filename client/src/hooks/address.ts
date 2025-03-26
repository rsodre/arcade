import { useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { addAddressPadding } from "starknet";
import { useSearchParams } from "react-router-dom";

export function useAddress() {
  const { address: self } = useAccount();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return addAddressPadding(searchParams.get("address") || self || "0x0");
  }, [searchParams, self]);

  const isSelf = useMemo(() => {
    return !searchParams.get("address") || address === self;
  }, [searchParams, self]);

  return {
    self,
    address,
    isSelf,
  };
}
