import { About } from "@/components/about";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useMemo } from "react";

export const AboutScene = () => {
  const { games } = useArcade();

  const { project, namespace } = useProject();

  const game: GameModel | undefined = useMemo(() => {
    return Object.values(games).find(
      (game) => game.namespace === namespace && game.config.project === project,
    );
  }, [games, project, namespace]);

  if (!game) return null;

  return <About game={game} />;
};
