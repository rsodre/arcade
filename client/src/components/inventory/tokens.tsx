import { useTokens } from "@/hooks/tokens";
import { TokenCard } from "@cartridge/ui-next";
import { useCallback } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { useAccount } from "@starknet-react/core";

import placeholder from "@/assets/placeholder.svg";
import { useAddress } from "@/hooks/address";
import { Token } from "@/context/token";

export const Tokens = () => {
  const { tokens } = useTokens();

  return (
    <div
      className="rounded overflow-y-scroll w-full flex flex-col gap-y-px"
      style={{ scrollbarWidth: "none" }}
    >
      {tokens.map((token) => (
        <Item key={token.metadata.address} token={token} />
      ))}
    </div>
  );
};

function Item({ token }: { token: Token }) {
  const { connector } = useAccount();
  const { isSelf } = useAddress();

  const handleClick = useCallback(async () => {
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) {
      console.error("Connector not initialized");
      return;
    }
    const path = `inventory/token/${token.metadata.address}/send`;
    controller.openProfileTo(path);
  }, [token.metadata.address, connector]);

  if (token.balance.amount === 0) return null;

  return (
    <TokenCard
      image={token.metadata.image || placeholder}
      title={token.metadata.name}
      amount={`${token.balance.amount.toLocaleString(undefined, { maximumFractionDigits: 5 })} ${token.metadata.symbol}`}
      value={
        token.balance.value
          ? `$${token.balance.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
          : ""
      }
      change={
        token.balance.change === 0
          ? undefined
          : token.balance.change > 0
            ? `+$${token.balance.change.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
            : `-$${(-token.balance.change).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      }
      onClick={isSelf ? handleClick : undefined}
      className={
        isSelf ? "cursor-pointer" : "cursor-default hover:bg-background-200"
      }
    />
  );
}
