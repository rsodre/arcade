import { Achievements } from "@/components/achievements";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useMemo } from "react";

export const AchievementScene = () => {
  const { games } = useArcade();

  const { project, namespace } = useProject();

  const game: GameModel | undefined = useMemo(() => {
    return Object.values(games).find(
      (game) => game.namespace === namespace && game.project === project,
    );
  }, [games, project, namespace]);

  if (!game) {
    return <Achievements />;
  }

  return <Achievements game={game} />;
};
