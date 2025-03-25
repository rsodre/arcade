import { useTokens } from "@/hooks/token";
import { TokenCard } from "@cartridge/ui-next";
import { Balance, ERC20Metadata, useCountervalue } from "@cartridge/utils";
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

  const tokenData = useMemo(
    () =>
      tokens.map((token) => ({
        balance: formatEther(token.balance.value || 0n),
        address: token.meta.address,
      })),
    [tokens],
  );

  const { countervalues } = useCountervalue({
    tokens: tokenData,
  });

  return (
    <div
      className="rounded overflow-y-scroll w-full flex flex-col gap-y-px h-[324px]"
      style={{ scrollbarWidth: "none" }}
    >
      {tokens.map((token) => (
        <Item key={token.meta.address} token={token} values={countervalues} />
      ))}
    </div>
  );
};

function Item({
  token,
  values,
}: {
  token: { balance: Balance; meta: ERC20Metadata };
  values: ReturnType<typeof useCountervalue>["countervalues"];
}) {
  const { connector } = useAccount();

  const value = useMemo(
    () => values.find((v) => v?.address === token.meta.address),
    [values, token.meta.address],
  );

  const change = useMemo(() => {
    if (!value) {
      return 0;
    }
    return value.current.value - value.period.value;
  }, [value]);

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
      value={value ? formatBalance(value.current.formatted, ["~"]) : ""}
      change={
        !change
          ? undefined
          : change > 0
            ? `+$${change.toFixed(2)}`
            : `-$${(-change).toFixed(2)}`
      }
      onClick={handleClick}
    />
  );
}
