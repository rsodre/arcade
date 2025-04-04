import { LayoutContent, TabsContent } from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAchievements } from "@/hooks/achievements";
import banner from "@/assets/banner.png";
import { Connect, DiscoverError, DiscoverLoading } from "../errors";
import { addAddressPadding, getChecksumAddress } from "starknet";
import { ArcadeDiscoveryGroup } from "../modules/discovery-group";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArcadeSubTabs, { SubTabValue } from "../modules/sub-tabs";
import { useAccount } from "@starknet-react/core";

interface Event {
  name: string;
  achievement: { title: string; icon: string };
  timestamp: number;
  onClick: () => void;
}

export function Discover({ game }: { game?: GameModel }) {
  const [searchParams] = useSearchParams();
  const { isConnected, address } = useAccount();
  const { events, usernames, isLoading, isError } = useAchievements();
  const { games, follows } = useArcade();

  const following = useMemo(() => {
    if (!address) return [];
    return [
      ...(follows[getChecksumAddress(address)] || []),
      getChecksumAddress(address),
    ];
  }, [follows, address]);

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

  const defaultValue = useMemo(() => {
    // Default tab is ignored if there is no address,
    // meanning the user is not connected and doesnt inspect another user
    return searchParams.get("subTab") || "all";
  }, [searchParams]);

  const handleTabClick = useCallback(
    (value: string) => {
      // Clicking on a tab updates the url param tab to the value of the tab
      // So the tab is persisted in the url and the user can update and share the url
      const url = new URL(window.location.href);
      url.searchParams.set("subTab", value);
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  const gameEvents = useMemo(() => {
    return filteredGames.map((game) => {
      const data = events[game?.config.project]?.map((event) => {
        return {
          name: usernames[addAddressPadding(event.player)],
          address: getChecksumAddress(event.player),
          achievement: event.achievement,
          timestamp: event.timestamp,
          onClick: () => handleClick(addAddressPadding(event.player)),
        };
      });
      if (!data) return { all: [], following: [] };
      if (filteredGames.length > 1) {
        return {
          all: data.slice(0, 3),
          following: data
            .filter((event) => following.includes(event.address))
            .slice(0, 3),
        };
      }
      return {
        all: data.slice(0, 20),
        following: data
          .filter((event) => following.includes(event.address))
          .slice(0, 20),
      };
    });
  }, [events, filteredGames, usernames, following, handleClick]);

  if (isError) return <DiscoverError />;

  if (isLoading) return <DiscoverLoading />;

  return (
    <LayoutContent className="gap-y-6 select-none h-full overflow-clip p-0 py-4">
      <div
        className="p-0 mt-0 h-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <ArcadeSubTabs
          tabs={["all", "following"]}
          defaultValue={defaultValue as SubTabValue}
          onTabClick={(tab: SubTabValue) => handleTabClick(tab)}
          className="mb-4"
        >
          <div
            className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <TabsContent className="p-0 mt-0 grow w-full" value="all">
              <div className="flex flex-col gap-y-4">
                {filteredGames.map((item, index) => (
                  <GameRow
                    key={`${index}-${item.config.project}`}
                    game={filteredGames.length > 1 ? item : undefined}
                    events={gameEvents[index].all}
                    covered={filteredGames.length > 1}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent className="p-0 mt-0 grow w-full" value="following">
              {!isConnected ? (
                <Connect />
              ) : (
                <div className="flex flex-col gap-y-4">
                  {filteredGames.map((item, index) => (
                    <GameRow
                      key={`${index}-${item.config.project}`}
                      game={filteredGames.length > 1 ? item : undefined}
                      events={gameEvents[index].following}
                      covered={filteredGames.length > 1}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </ArcadeSubTabs>
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
