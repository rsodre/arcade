import { InventoryScene } from "../scenes/inventory";
import { AchievementScene } from "../scenes/achievement";
import { useCallback, useMemo } from "react";
import { useAchievements } from "@/hooks/achievements";
import { Button, TabsContent, TabValue, TimesIcon } from "@cartridge/ui-next";
import { ActivityScene } from "../scenes/activity";
import { ArcadeTabs } from "../modules";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useUsername } from "@/hooks/account";
import { useAddress } from "@/hooks/address";
import AchievementPlayerHeader from "../modules/player-header";
import { UserAvatar } from "../user/avatar";

export function PlayerPage({ game }: { game: GameModel | undefined }) {
  const [searchParams] = useSearchParams();
  const { address, isSelf } = useAddress();
  const { usernames, globals, players } = useAchievements();

  const navigate = useNavigate();

  const defaultValue = useMemo(() => {
    return searchParams.get("playerTab") || "inventory";
  }, [searchParams, address]);

  const handleClick = useCallback(
    (value: string) => {
      // Clicking on a tab updates the url param tab to the value of the tab
      // So the tab is persisted in the url and the user can update and share the url
      const url = new URL(window.location.href);
      url.searchParams.set("playerTab", value);
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  const handleClose = useCallback(() => {
    // On close, remove address from url
    const url = new URL(window.location.href);
    url.searchParams.delete("address");
    navigate(url.toString().replace(window.location.origin, ""));
  }, [navigate]);

  const { rank, points } = useMemo(() => {
    if (game) {
      const gamePlayers = players[game?.config.project || ""] || [];
      const points =
        gamePlayers.find((player) => BigInt(player.address) === BigInt(address))
          ?.earnings || 0;
      const rank =
        gamePlayers.findIndex(
          (player) => BigInt(player.address) === BigInt(address),
        ) + 1;
      return { rank, points };
    }
    const points =
      globals.find((player) => BigInt(player.address) === BigInt(address))
        ?.earnings || 0;
    const rank =
      globals.findIndex(
        (player) => BigInt(player.address) === BigInt(address),
      ) + 1;
    return { rank, points };
  }, [globals, address, game]);

  const { username } = useUsername({ address });
  const name = useMemo(() => {
    return usernames[address] || username;
  }, [usernames, address, username]);

  const Icon = useMemo(() => {
    return <UserAvatar username={name} className="h-full w-full" />;
  }, [name]);

  return (
    <>
      <AchievementPlayerHeader
        username={name}
        address={address}
        points={points}
        icon={Icon}
        compacted={isSelf}
        rank={
          rank === 1
            ? "gold"
            : rank === 2
              ? "silver"
              : rank === 3
                ? "bronze"
                : "default"
        }
        className="relative p-4 pb-0"
      />
      <div className="absolute top-4 right-4">
        <CloseButton handleClose={handleClose} />
      </div>
      <ArcadeTabs
        order={["inventory", "achievements", "activity"]}
        defaultValue={defaultValue as TabValue}
        onTabClick={(tab: TabValue) => handleClick(tab)}
        variant="light"
      >
        <div
          className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <TabsContent className="p-0 px-4 mt-0 grow w-full" value="inventory">
            <InventoryScene />
          </TabsContent>
          <TabsContent
            className="p-0 px-4 mt-0 grow w-full"
            value="achievements"
          >
            <AchievementScene />
          </TabsContent>
          <TabsContent
            className="p-0 px-4 mt-0 grow w-full h-full"
            value="activity"
          >
            <ActivityScene />
          </TabsContent>
        </div>
      </ArcadeTabs>
    </>
  );
}

function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleClose}
      className="bg-background-125 h-8 w-8"
    >
      <TimesIcon size="xs" className="text-foreground-300" />
    </Button>
  );
}
