import { InventoryScene } from "./scenes/inventory";
import { AchievementScene } from "./scenes/achievement";
import { Games } from "@/components/games";
import { SceneLayout } from "@/components/scenes/layout";
import { useArcade } from "@/hooks/arcade";
import { useCallback, useEffect, useMemo } from "react";
import { useAchievements } from "@/hooks/achievements";
import { Button, cn, TabsContent, TimesIcon } from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { DiscoverScene } from "./scenes/discover";
import { GuildsScene } from "./scenes/guild";
import { ActivityScene } from "./scenes/activity";
import { ArcadeTabs } from "./modules";
import { LeaderboardScene } from "./scenes/leaderboard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProject } from "@/hooks/project";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useUsername } from "@/hooks/account";
import { PlayerHeader } from "./modules/player-header";
import banner from "@/assets/banner.svg";
import { useAddress } from "@/hooks/address";

export function App() {
  const { isConnected } = useAccount();
  const { games } = useArcade();
  const { project, namespace } = useProject();

  const [searchParams] = useSearchParams();
  const { address, isSelf } = useAddress();
  const { usernames, globals, projects, players, setProjects } =
    useAchievements();

  const navigate = useNavigate();
  const defaultValue = useMemo(() => {
    // Default tab is ignored if there is no address,
    // meanning the user is not connected and doesnt inspect another user
    return searchParams.get("tab") || "discover";
  }, [searchParams, address]);

  const handleClick = useCallback(
    (value: string) => {
      // Clicking on a tab updates the url param tab to the value of the tab
      // So the tab is persisted in the url and the user can update and share the url
      const url = new URL(window.location.href);
      url.searchParams.set("tab", value);
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

  const game: GameModel | undefined = useMemo(() => {
    return Object.values(games).find(
      (game) => game.namespace === namespace && game.config.project === project,
    );
  }, [games, project, namespace]);

  const points = useMemo(() => {
    if (game) {
      const gamePlayers = players[game?.config.project || ""] || [];
      return (
        gamePlayers.find((player) => BigInt(player.address) === BigInt(address))
          ?.earnings || 0
      );
    }
    return (
      globals.find((player) => BigInt(player.address) === BigInt(address))
        ?.earnings || 0
    );
  }, [globals, address, game]);

  const { username } = useUsername({ address });
  const name = useMemo(() => {
    return usernames[address] || username;
  }, [usernames, address, username]);

  useEffect(() => {
    if (projects.length === Object.values(games).length) return;
    setProjects(
      games.map((game) => ({
        namespace: game.namespace,
        project: game.config.project,
      })),
    );
  }, [games, projects, setProjects]);

  return (
    <SceneLayout>
      <div
        className="h-full w-full bg-background-100 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-[1048px] pt-8 pb-6 gap-8 flex items-stretch m-auto h-full overflow-clip">
          <Games />
          <div
            className={cn(
              "relative grow h-full flex flex-col rounded gap-2 overflow-clip",
              "border border-background-200 bg-background-100 shadow-[0px_0px_8px_0px_rgba(15,20,16,_0.50)]",
              !isSelf && "brightness-110",
            )}
          >
            <div className={cn("absolute top-4 right-4", isSelf && "hidden")}>
              <CloseButton handleClose={handleClose} />
            </div>
            <PlayerHeader
              username={name}
              address={address}
              points={points}
              banner={game?.metadata.banner || banner}
            />
            <ArcadeTabs
              discover={!isConnected || isSelf}
              inventory={isConnected}
              achievements={isConnected}
              leaderboard={isConnected}
              guilds={isConnected}
              activity={isConnected}
              defaultValue={defaultValue}
              onDiscoverClick={() => handleClick("discover")}
              onInventoryClick={() => handleClick("inventory")}
              onAchievementsClick={() => handleClick("achievements")}
              onLeaderboardClick={() => handleClick("leaderboard")}
              onGuildsClick={() => handleClick("guilds")}
              onActivityClick={() => handleClick("activity")}
            >
              <div
                className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full"
                  value="discover"
                >
                  <DiscoverScene />
                </TabsContent>
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full"
                  value="inventory"
                >
                  <InventoryScene />
                </TabsContent>
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full"
                  value="achievements"
                >
                  <AchievementScene />
                </TabsContent>
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full"
                  value="leaderboard"
                >
                  <LeaderboardScene />
                </TabsContent>
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full"
                  value="guilds"
                >
                  <GuildsScene />
                </TabsContent>
                <TabsContent
                  className="p-0 px-4 mt-0 grow w-full h-full"
                  value="activity"
                >
                  <ActivityScene />
                </TabsContent>
              </div>
            </ArcadeTabs>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
}

function CloseButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleClose}
      className="bg-background-100 h-8 w-8"
    >
      <TimesIcon size="xs" className="text-foreground-300" />
    </Button>
  );
}
