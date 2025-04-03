import { Games } from "@/components/games";
import { SceneLayout } from "@/components/scenes/layout";
import { GamePage } from "./pages/game";
import { useEffect, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { useAddress } from "@/hooks/address";
import { PlayerPage } from "./pages/player";
import { cn } from "@cartridge/ui-next";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useProject } from "@/hooks/project";
import banner from "@/assets/banner.png";

export function App() {
  const { isZero } = useAddress();
  const { games, projects, setProjects } = useArcade();
  const { project, namespace } = useProject();

  const game: GameModel | undefined = useMemo(() => {
    return Object.values(games).find(
      (game) => game.namespace === namespace && game.config.project === project,
    );
  }, [games, project, namespace]);

  const style = useMemo(() => {
    const bgColor = !isZero ? `var(--background-125)` : `var(--background-100)`;
    const image = `url(${game?.metadata.banner ? game.metadata.banner : banner})`;
    const colorMix = `color-mix(in srgb, ${bgColor} 100%, transparent 32%)`;
    return {
      backgroundImage: `linear-gradient(to top, ${bgColor}, ${colorMix}), ${image}`,
    };
  }, [game?.metadata.banner, isZero]);

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
        className="h-full w-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-[1048px] pt-8 pb-6 gap-8 flex items-stretch m-auto h-full overflow-clip">
          <Games />
          <div
            className={cn(
              "relative grow h-full flex flex-col rounded gap-2",
              "border border-background-200 bg-background-100",
              !isZero &&
                " bg-background-125 shadow-[0px_0px_8px_0px_rgba(15,20,16,_0.50)]",
            )}
          >
            <div
              className="bg-cover bg-top h-[72px] w-full absolute top-0 left-0"
              style={style}
            />
            {isZero ? <GamePage game={game} /> : <PlayerPage game={game} />}
          </div>
        </div>
      </div>
    </SceneLayout>
  );
}
