import { InventoryScene } from "./scenes/inventory";
import { AchievementScene } from "./scenes/achievement";
import { Games } from "@/components/games";
import { SceneLayout } from "@/components/scenes/layout";
import { useArcade } from "@/hooks/arcade";
import { useEffect } from "react";
import { useAchievements } from "@/hooks/achievements";
import { ArcadeTabs, TabsContent } from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { DiscoverScene } from "./scenes/discover";

export function App() {
  const { isConnected } = useAccount();
  const { games } = useArcade();
  const { projects, setProjects } = useAchievements();

  useEffect(() => {
    if (projects.length === Object.values(games).length) return;
    setProjects(
      games.map((game) => ({
        namespace: game.namespace,
        project: game.project,
      })),
    );
  }, [games, projects, setProjects]);

  return (
    <SceneLayout>
      <div
        className="w-full bg-background-100 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-[1048px] flex flex-col items-stretch m-auto gap-y-8 h-full overflow-clip">
          <div className="flex pt-8 h-full">
            <ArcadeTabs
              discover
              inventory={isConnected}
              achievements={isConnected}
              guilds={isConnected}
              activity={isConnected}
              className="flex flex-col w-full"
            >
              <div
                className="flex justify-center pt-8 gap-8 w-full grow overflow-y-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <Games />
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
                <TabsContent className="p-0 mt-0 grow w-full" value="guilds">
                  <InventoryScene />
                </TabsContent>
                <TabsContent className="p-0 mt-0 grow w-full" value="activity">
                  <InventoryScene />
                </TabsContent>
              </div>
            </ArcadeTabs>
          </div>
        </div>
      </div>
    </SceneLayout>
  );
}
