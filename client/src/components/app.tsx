import { InventoryScene } from "./scenes/inventory";
import { AchievementScene } from "./scenes/achievement";
import { Games } from "@/components/games";
import { SceneLayout } from "@/components/scenes/layout";
import { useArcade } from "@/hooks/arcade";
import { useEffect } from "react";
import { useAchievements } from "@/hooks/achievements";
import { TabsContent } from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { DiscoverScene } from "./scenes/discover";
import { GuildsScene } from "./scenes/guild";
import { ActivityScene } from "./scenes/activity";
import { ArcadeTabs } from "./modules";
import { LeaderboardScene } from "./scenes/leaderboard";

export function App() {
  const { isConnected } = useAccount();
  const { games } = useArcade();
  const { projects, setProjects } = useAchievements();

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
        className="w-full bg-background-100 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-[1048px] pt-8 pb-6 gap-8 flex items-stretch m-auto h-full overflow-clip">
          <Games />
          <div className="grow h-full flex flex-col">
            <ArcadeTabs
              discover
              inventory={isConnected}
              achievements={isConnected}
              leaderboard={isConnected}
              guilds={false}
              activity={isConnected}
            >
              <div
                className="flex justify-center pt-8 gap-8 w-full grow overflow-y-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <TabsContent className="p-0 mt-0 grow w-full" value="discover">
                  <DiscoverScene />
                </TabsContent>
                <TabsContent className="p-0 mt-0 grow w-full" value="inventory">
                  <InventoryScene />
                </TabsContent>
                <TabsContent
                  className="p-0 mt-0 grow w-full"
                  value="achievements"
                >
                  <AchievementScene />
                </TabsContent>
                <TabsContent
                  className="p-0 mt-0 grow w-full"
                  value="leaderboard"
                >
                  <LeaderboardScene />
                </TabsContent>
                <TabsContent className="p-0 mt-0 grow w-full" value="guilds">
                  <GuildsScene />
                </TabsContent>
                <TabsContent className="p-0 mt-0 grow w-full" value="activity">
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
