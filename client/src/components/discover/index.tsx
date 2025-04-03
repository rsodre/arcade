import { LayoutContent } from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAchievements } from "@/hooks/achievements";
import banner from "@/assets/banner.png";
import { DiscoverError, DiscoverLoading } from "../errors";
import { addAddressPadding } from "starknet";
import { ArcadeDiscoveryGroup } from "../modules/discovery-group";
import { useNavigate } from "react-router-dom";

interface Event {
  name: string;
  achievement: { title: string; icon: string };
  timestamp: number;
  onClick: () => void;
}

export function Discover({ game }: { game?: GameModel }) {
  const { events, usernames, isLoading, isError } = useAchievements();
  const { games } = useArcade();

  const filteredGames = useMemo(() => {
    return !game ? games : [game];
  }, [games, game]);

  const navigate = useNavigate();
  const handleClick = useCallback(
    (address: string) => {
      // On click, we update the url param address to the address of the player
      const url = new URL(window.location.href);
      url.searchParams.set("address", address);
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  const gameEvents = useMemo(() => {
    return filteredGames.map((game) => {
      const data = events[game?.config.project]?.map((event) => {
        return {
          name: usernames[addAddressPadding(event.player)],
          achievement: event.achievement,
          timestamp: event.timestamp,
          onClick: () => handleClick(addAddressPadding(event.player)),
        };
      });
      if (!data) return [];
      if (filteredGames.length > 1) {
        return data.slice(0, 3);
      }
      return data.slice(0, 20);
    });
  }, [events, filteredGames, usernames, handleClick]);

  if (isError) return <DiscoverError />;

  if (isLoading) return <DiscoverLoading />;

  return (
    <LayoutContent className="gap-y-6 select-none h-full overflow-clip p-0 py-4">
      <div
        className="p-0 mt-0 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-y-4">
          {filteredGames.map((item, index) => (
            <GameRow
              key={`${index}-${item.config.project}`}
              game={filteredGames.length > 1 ? item : undefined}
              events={gameEvents[index]}
              covered={filteredGames.length > 1}
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
  covered,
}: {
  game: GameModel | undefined;
  events: Event[];
  covered: boolean;
}) {
  const gameData = useMemo(() => {
    if (!game) return undefined;
    return {
      metadata: {
        name: game.metadata.name,
        logo: game.metadata.image,
        cover: covered ? (game.metadata.banner ?? banner) : banner,
      },
      socials: {},
    };
  }, [game, covered]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="border border-transparent overflow-hidden rounded">
        <ArcadeDiscoveryGroup
          game={gameData}
          events={events}
          color={game?.metadata.color}
        />
      </div>
    </div>
  );
}
