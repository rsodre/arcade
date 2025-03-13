import { useTokens } from "@/hooks/token";
import { TokenCard } from "@cartridge/ui-next";
import { Balance, ERC20Metadata, useCountervalue } from "@cartridge/utils";
import { TokenPair } from "@cartridge/utils/api/cartridge";
import { formatEther } from "viem";
import { formatBalance } from "@/helpers";
import { useCallback, useMemo } from "react";
import ControllerConnector from "@cartridge/connector/controller";
import { useAccount } from "@starknet-react/core";
import { ERC20_ADDRESSES } from "@/constants";

import placeholder from "@/assets/placeholder.svg";

export const Tokens = () => {
  const erc20 = useTokens(undefined, ERC20_ADDRESSES);

  const tokens = useMemo(
    () =>
      erc20.data
        .filter(
          (token) =>
            !ERC20_ADDRESSES.includes(token.meta.address) ||
            token.balance.value > 0n,
        )
        .map((t) => ({
          balance: t.balance,
          meta: t.meta,
        })),
    [erc20.data],
  );

  return (
    <div
      className="rounded overflow-y-scroll w-full flex flex-col gap-y-px h-[259px]"
      style={{ scrollbarWidth: "none" }}
    >
      {tokens.map((token) => (
        <TokenCardContent key={token.meta.address} token={token} />
      ))}
    </div>
  );
};

function TokenCardContent({
  token,
}: {
  token: { balance: Balance; meta: ERC20Metadata };
}) {
  const { connector } = useAccount();

  const { countervalue } = useCountervalue({
    balance: formatEther(token.balance.value || 0n),
    pair: `${token.meta.symbol}_USDC` as TokenPair,
  });

  const handleClick = useCallback(async () => {
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) {
      console.error("Connector not initialized");
      return;
    }
    const path = `inventory/token/${token.meta.address}/send`;
    controller.openProfileTo(path);
  }, [token.meta.address, connector]);

  return (
    <TokenCard
      image={token.meta.logoUrl || placeholder}
      title={token.meta.name}
      amount={`${formatBalance(token.balance.formatted, ["~"])} ${token.meta.symbol}`}
      value={countervalue ? formatBalance(countervalue.formatted, ["~"]) : ""}
      onClick={handleClick}
    />
  );
}
