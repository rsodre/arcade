import { useTokens } from "@/hooks/token";
import {
  Card,
  CardHeader,
  CardTitle,
  CardListContent,
  CardListItem,
  ScrollArea,
} from "@cartridge/ui-next";
import { Balance, ERC20Metadata, useCountervalue } from "@cartridge/utils";
import { TokenPair } from "@cartridge/utils/api/cartridge";
import { formatEther } from "viem";
import { formatBalance } from "@/helpers";
import { useMemo } from "react";
import { CoinsIcon } from "@cartridge/ui-next";
import ControllerConnector from "@cartridge/connector/controller";
import { useAccount } from "@starknet-react/core";
import { ERC20_ADDRESSES } from "@/constants";

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
    <Card>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
      </CardHeader>

      <CardListContent className="h-[175px]">
        <ScrollArea>
          {tokens.map((token) => (
            <TokenCardContent token={token} key={token.meta.address} />
          ))}
        </ScrollArea>
      </CardListContent>
    </Card>
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

  const handleClick = async () => {
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) {
      console.error("Connector not initialized");
      return;
    }
    controller.openProfile("inventory");
  };

  return (
    <CardListItem
      icon={<TokenIcon logoUrl={token.meta.logoUrl} />}
      className="hover:opacity-80"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {formatBalance(token.balance.formatted, ["~"])}
        <span className="text-muted-foreground">{token.meta.symbol}</span>
      </div>

      {countervalue && (
        <div className="text-muted-foreground">
          {formatBalance(countervalue.formatted, ["~"])}
        </div>
      )}
    </CardListItem>
  );
}

const TokenIcon = ({ logoUrl }: { logoUrl: string | undefined }) => {
  return (
    <div className="h-7 w-7 border-2 border-quaternary flex items-center justify-center rounded-full overflow-hidden">
      {logoUrl ? (
        <img src={logoUrl} alt="token" />
      ) : (
        <CoinsIcon variant="line" />
      )}
    </div>
  );
};
