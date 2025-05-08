import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Empty,
  LayoutContent,
  LeaderboardTable,
  Skeleton,
  TabsContent,
} from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { EditionModel } from "@bal7hazar/arcade-sdk";
import { addAddressPadding, getChecksumAddress } from "starknet";
import { useAchievements } from "@/hooks/achievements";
import { Connect } from "../errors";
import LeaderboardRow from "../modules/leaderboard-row";
import { useAccount } from "@starknet-react/core";
import ArcadeSubTabs, { SubTabValue } from "../modules/sub-tabs";

const DEFAULT_CAP = 50;

export function Leaderboard({ edition }: { edition?: EditionModel }) {
  const [searchParams] = useSearchParams();
  const { isConnected, address } = useAccount();
  const { achievements, globals, players, usernames, isLoading, isError } =
    useAchievements();
  const { pins, follows } = useArcade();

  const following = useMemo(() => {
    if (!address) return [];
    const addresses = follows[getChecksumAddress(address)] || [];
    if (addresses.length === 0) return [];
    return [...addresses, getChecksumAddress(address)];
  }, [follows, address]);

  const navigate = useNavigate();

  const gamePlayers = useMemo(() => {
    return players[edition?.config.project || ""] || [];
  }, [players, edition]);

  const gameAchievements = useMemo(() => {
    return achievements[edition?.config.project || ""] || [];
  }, [achievements, edition]);

  const handleClick = useCallback(
    (address: string) => {
      // On click, we update the url param address to the address of the player
      const url = new URL(window.location.href);
      url.searchParams.set("address", address);
      url.searchParams.set("playerTab", "achievements");
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [searchParams, navigate],
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

  const gameData = useMemo(() => {
    let rank = 0;
    const data = gamePlayers.map((player, index) => {
      if (BigInt(player.address) === BigInt(address || "0x0")) rank = index + 1;
      const ids = pins[getChecksumAddress(player.address)] || [];
      const pinneds: { id: string; icon: string }[] = gameAchievements
        .filter(
          (item) =>
            player.completeds.includes(item.id) &&
            (ids.length === 0 || ids.includes(item.id)),
        )
        .sort((a, b) => a.id.localeCompare(b.id))
        .sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
        .slice(0, 3)
        .map((item) => {
          return {
            id: item.id,
            icon: item.icon,
          };
        });
      return {
        address: player.address,
        name:
          usernames[addAddressPadding(player.address)] ||
          player.address.slice(0, 9),
        rank: index + 1,
        points: player.earnings,
        highlight: BigInt(player.address) === BigInt(address || "0x0"),
        pins: pinneds,
        following: following.includes(getChecksumAddress(player.address)),
      };
    });
    if (rank <= DEFAULT_CAP) {
      return {
        all: data.slice(0, DEFAULT_CAP),
        following: data
          .filter((player) =>
            following.includes(getChecksumAddress(player.address)),
          )
          .slice(0, DEFAULT_CAP),
      };
    }
    const selfData = data.find(
      (player) => BigInt(player.address) === BigInt(address || "0x0"),
    );
    return selfData
      ? {
          all: [...data.slice(0, DEFAULT_CAP - 1), selfData],
          following: [
            ...data
              .filter((player) =>
                following.includes(getChecksumAddress(player.address)),
              )
              .slice(0, DEFAULT_CAP - 1),
            selfData,
          ],
        }
      : {
          all: data.slice(0, DEFAULT_CAP),
          following: data
            .filter((player) =>
              following.includes(getChecksumAddress(player.address)),
            )
            .slice(0, DEFAULT_CAP),
        };
  }, [gamePlayers, gameAchievements, address, pins, usernames, following]);

  const gamesData = useMemo(() => {
    let rank = 0;
    const data = globals.map((player, index) => {
      if (BigInt(player.address) === BigInt(address || "0x0")) rank = index + 1;
      return {
        address: player.address,
        name:
          usernames[addAddressPadding(player.address)] ||
          player.address.slice(0, 9),
        rank: index + 1,
        points: player.earnings,
        highlight: BigInt(player.address) === BigInt(address || "0x0"),
        following: following.includes(getChecksumAddress(player.address)),
      };
    });
    if (rank <= DEFAULT_CAP) {
      return {
        all: data.slice(0, DEFAULT_CAP),
        following: data
          .filter((player) =>
            following.includes(getChecksumAddress(player.address)),
          )
          .slice(0, DEFAULT_CAP),
      };
    }
    const selfData =
      data.find(
        (player) => BigInt(player.address) === BigInt(address || "0x0"),
      ) || data[0];
    return {
      all: [...data.slice(0, DEFAULT_CAP - 1), selfData],
      following: [...data.slice(0, DEFAULT_CAP - 1), selfData].filter(
        (player) => following.includes(getChecksumAddress(player.address)),
      ),
    };
  }, [globals, address, usernames, following]);

  const filteredData = useMemo(() => {
    if (!edition) return gamesData;
    return gameData;
  }, [edition, gamesData, gameData]);

  return (
    <LayoutContent className="select-none h-full overflow-clip p-0">
      <div
        className="p-0 pt-3 lg:pt-6 mt-0 h-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <ArcadeSubTabs
          tabs={["all", "following"]}
          defaultValue={defaultValue as SubTabValue}
          onTabClick={(tab: SubTabValue) => handleTabClick(tab)}
          className="mb-3 lg:mb-4"
        >
          <div
            className="flex justify-center gap-8 w-full h-full overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <TabsContent
              className="p-0 mt-0 pb-3 lg:pb-6 grow w-full"
              value="all"
            >
              {isLoading && filteredData.all.length === 0 ? (
                <LoadingState />
              ) : isError || filteredData.all.length === 0 ? (
                <EmptyState />
              ) : (
                <LeaderboardTable className="h-full rounded">
                  {filteredData.all.map((item, index) => (
                    <LeaderboardRow
                      key={index}
                      pins={[]}
                      rank={item.rank}
                      name={item.name}
                      points={item.points}
                      highlight={item.highlight}
                      following={item.following}
                      onClick={() => handleClick(item.address)}
                    />
                  ))}
                </LeaderboardTable>
              )}
            </TabsContent>
            <TabsContent
              className="p-0 mt-0 pb-3 lg:pb-6 grow w-full"
              value="following"
            >
              {!isConnected ? (
                <Connect />
              ) : isLoading && gamesData.following.length === 0 ? (
                <LoadingState />
              ) : isError || filteredData.following.length === 0 ? (
                <EmptyState />
              ) : (
                <LeaderboardTable>
                  {filteredData.following.map((item, index) => (
                    <LeaderboardRow
                      key={index}
                      pins={[]}
                      rank={item.rank}
                      name={item.name}
                      points={item.points}
                      highlight={item.highlight}
                      onClick={() => handleClick(item.address)}
                    />
                  ))}
                </LeaderboardTable>
              )}
            </TabsContent>
          </div>
        </ArcadeSubTabs>
      </div>
    </LayoutContent>
  );
}

const LoadingState = () => {
  return (
    <div className="flex flex-col gap-y-px overflow-hidden h-full">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index} className="min-h-11 w-full" />
      ))}
    </div>
  );
};

const EmptyState = () => {
  return (
    <Empty
      title="No leaderboard available for this game."
      icon="leaderboard"
      className="h-full"
    />
  );
};
