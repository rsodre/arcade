import { Discover } from "@/components/discover";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useMemo } from "react";

export const DiscoverScene = () => {
  const { games } = useArcade();

  const { project, namespace } = useProject();

  const game: GameModel | undefined = useMemo(() => {
    return Object.values(games).find(
      (game) => game.namespace === namespace && game.project === project,
    );
  }, [games, project, namespace]);

  if (!game) {
    return <Discover />;
  }

  return <Discover game={game} />;
};
