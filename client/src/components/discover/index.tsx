import {
  LayoutContent,
  LayoutContentLoader,
  ArcadeDiscoveryGroup,
} from "@cartridge/ui-next";
import { useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAchievements } from "@/hooks/achievements";
import { PLACEHOLDER } from "@/constants";

interface Event {
  name: string;
  achievement: { title: string; icon: string };
  timestamp: number;
}

export function Discover({ game }: { game?: GameModel }) {
  const { events, usernames, isLoading } = useAchievements();
  const { games } = useArcade();

  const filteredGames = useMemo(() => {
    return !game ? games : [game];
  }, [games, game]);

  const gameEvents = useMemo(() => {
    return filteredGames.map((game) => {
      const data = events[game?.project]?.map((event) => {
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

  if (isLoading) return <LayoutContentLoader />;

  return (
    <LayoutContent className="gap-y-6 select-none h-full overflow-clip p-0">
      <div
        className="p-0 mt-0 pb-6 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-y-6">
          {filteredGames.map((item, index) => (
            <GameRow key={index} game={item} events={gameEvents[index]} />
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
        cover: game.metadata.banner ?? PLACEHOLDER,
      },
      socials: game.socials,
    };
  }, [game]);

  return (
    <div className="rounded-lg overflow-hidden">
      <ArcadeDiscoveryGroup
        className={
          game.metadata.color
            ? `data-[theme=true]:text-[${game.metadata.color}]`
            : ""
        }
        game={gameData}
        events={events}
      />
    </div>
  );
}
