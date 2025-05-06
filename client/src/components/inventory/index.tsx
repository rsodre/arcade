import { useCollections } from "@/hooks/collections";
import { Collections } from "./collections";
import { Tokens } from "./tokens";
import { useTokens } from "@/hooks/tokens";
import { useMemo } from "react";
import { Empty } from "@cartridge/ui-next";

export const Inventory = () => {
  const { tokens, credits, status: tokensStatus } = useTokens();
  const { collections, status: collectionsStatus } = useCollections();

  const status = useMemo(() => {
    if (tokensStatus === "error" || collectionsStatus === "error") {
      return "error";
    }
    if (tokensStatus === "loading" && collectionsStatus === "loading") {
      return "loading";
    }
    if (tokensStatus === "idle" && collectionsStatus === "idle") {
      return "idle";
    }
    return "success";
  }, [tokensStatus, collectionsStatus]);

  if (status === "error" || (collections.length === 0 && tokens.length === 0)) {
    return <EmptyState />;
  }

  return (
    <div className="w-full flex flex-col gap-4 py-3 lg:py-6 rounded">
      <Tokens tokens={tokens} credits={credits} status={tokensStatus} />
      <Collections collections={collections} status={collectionsStatus} />
    </div>
  );
};

const EmptyState = () => {
  return (
    <Empty
      title="This inventory is empty."
      icon="inventory"
      className="h-full py-3 lg:py-6"
    />
  );
};
