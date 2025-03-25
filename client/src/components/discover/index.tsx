import { LayoutContent, ArcadeDiscoveryGroup } from "@cartridge/ui-next";
import { useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAchievements } from "@/hooks/achievements";
import banner from "@/assets/banner.svg";
import { DiscoverError, DiscoverLoading } from "../errors";

interface Event {
  name: string;
  achievement: { title: string; icon: string };
  timestamp: number;
}

export function Discover({ game }: { game?: GameModel }) {
  const { events, usernames, isLoading, isError } = useAchievements();
  const { games } = useArcade();

  const filteredGames = useMemo(() => {
    return !game ? games : [game];
  }, [games, game]);

  const gameEvents = useMemo(() => {
    return filteredGames.map((game) => {
      const data = events[game?.config.project]?.map((event) => {
        return {
          name: usernames[event.player],
          achievement: event.achievement,
          timestamp: event.timestamp,
        };
      });
      if (!data) return [];
      if (filteredGames.length > 1) {
        return data.slice(0, 3);
      }
      return data.slice(0, 20);
    });
  }, [events, filteredGames, usernames]);

  if (isError) return <DiscoverError />;

  if (isLoading) return <DiscoverLoading />;

  return (
    <LayoutContent className="gap-y-6 select-none h-full overflow-clip p-0">
      <div
        className="p-0 mt-0 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-y-6">
          {filteredGames.map((item, index) => (
            <GameRow
              key={`${index}-${item.config.project}`}
              game={item}
              events={gameEvents[index]}
            />
          ))}
        </div>
      </div>
    </LayoutContent>
  );
}

export function GameRow({
  game,
  events,
}: {
  game: GameModel;
  events: Event[];
}) {
  const gameData = useMemo(() => {
    return {
      metadata: {
        name: game.metadata.name,
        logo: game.metadata.image,
        cover: game.metadata.banner ?? banner,
      },
      socials: game.socials,
    };
  }, [game]);

  return (
    <div className="rounded-lg overflow-hidden">
      <ArcadeDiscoveryGroup
        game={gameData}
        events={events}
        color={game.metadata.color}
      />
    </div>
  );
}
