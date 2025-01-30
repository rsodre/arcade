import { useUsername } from "@/hooks/account";
import { CopyAddress, SpaceInvaderIcon } from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function User() {
  const { account } = useAccount();
  const [searchParams] = useSearchParams();

  const address = useMemo(() => {
    return searchParams.get("address") || account?.address || "0x0";
  }, [searchParams, account]);

  const { username } = useUsername({ address });

  return (
    <div
      className="h-16 sticky top-16 bg-background justify-between items-center select-none"
      draggable={false}
    >
      <div className="flex min-w-0 gap-4 items-center">
        <div className="w-16 h-16 bg-secondary flex shrink-0 items-center justify-center overflow-hidden rounded">
          <SpaceInvaderIcon size="xl" variant="solid" />
        </div>

        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="text-2xl/6 font-semibold truncate h-6 flex items-center">
            {username}
          </div>
          <CopyAddress address={address ?? ""} size="xs" />
        </div>
      </div>
    </div>
  );
}
