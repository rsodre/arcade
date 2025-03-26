import { InventoryScene } from "./scenes/inventory";
import { AchievementScene } from "./scenes/achievement";
import { Games } from "@/components/games";
import { SceneLayout } from "@/components/scenes/layout";
import { useArcade } from "@/hooks/arcade";
import { useEffect, useMemo } from "react";
import { useAchievements } from "@/hooks/achievements";
import { AchievementPlayerHeader, TabsContent } from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { DiscoverScene } from "./scenes/discover";
import { GuildsScene } from "./scenes/guild";
import { ActivityScene } from "./scenes/activity";
import { ArcadeTabs } from "./modules";
import { LeaderboardScene } from "./scenes/leaderboard";
import { useSearchParams } from "react-router-dom";
import { useProject } from "@/hooks/project";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useUsername } from "@/hooks/account";

export function App() {
  const { address: self, isConnected } = useAccount();
  const { games } = useArcade();
  const { project, namespace } = useProject();
  const { globals, projects, players, setProjects } = useAchievements();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return searchParams.get("address") || self || "0x0";
  }, [searchParams, self]);

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
          <div className="grow h-full flex flex-col border border-background-200 rounded bg-background-100 gap-2 shadow-[0px_0px_8px_0px_rgba(15,20,16,_0.50)]">
            <div className="p-4 pb-0">
              <AchievementPlayerHeader
                username={username}
                address={address}
                points={points}
              />
            </div>
            <ArcadeTabs
              discover
              inventory={isConnected}
              achievements={isConnected}
              leaderboard={isConnected}
              guilds={false}
              activity={isConnected}
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
