import { useNavigate } from "react-router-dom";
import {
  LayoutContent,
  AchievementLeaderboard,
  AchievementLeaderboardRow,
} from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { addAddressPadding } from "starknet";
import { useAchievements } from "@/hooks/achievements";
import { useAddress } from "@/hooks/address";
import {
  LeaderboardComingSoon,
  LeaderboardError,
  LeaderboardLoading,
} from "../errors";

export function Leaderboard({ game }: { game?: GameModel }) {
  const { address } = useAddress();
  const { achievements, globals, players, usernames, isLoading, isError } =
    useAchievements();
  const { pins } = useArcade();

  const navigate = useNavigate();

  const gamePlayers = useMemo(() => {
    return players[game?.config.project || ""] || [];
  }, [players, game]);

  const gameAchievements = useMemo(() => {
    return achievements[game?.config.project || ""] || [];
  }, [achievements, game]);

  const handleClick = useCallback(
    (address: string) => {
      // On click, we update the url param address to the address of the player
      const url = new URL(window.location.href);
      url.searchParams.set("address", address);
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  const gameData = useMemo(() => {
    let rank = 0;
    const data = gamePlayers.map((player, index) => {
      if (BigInt(player.address) === BigInt(address)) rank = index + 1;
      return {
        address: player.address,
        name:
          usernames[addAddressPadding(player.address)] ||
          player.address.slice(0, 9),
        rank: index + 1,
        points: player.earnings,
        highlight: BigInt(player.address) === BigInt(address),
        pins: pins[addAddressPadding(player.address)]
          ?.map((id) => {
            const achievement = gameAchievements.find((a) => a?.id === id);
            return achievement ? { id, icon: achievement.icon } : undefined;
          })
          .filter(Boolean) as { id: string; icon: string }[],
      };
    });
    if (rank <= 100) {
      return data.slice(0, 100);
    }
    const selfData = data.find(
      (player) => BigInt(player.address) === BigInt(address),
    );
    return selfData ? [...data.slice(0, 99), selfData] : data.slice(0, 100);
  }, [gamePlayers, gameAchievements, address, pins, usernames]);

  const gamesData = useMemo(() => {
    let rank = 0;
    const data = globals.map((player, index) => {
      if (BigInt(player.address) === BigInt(address)) rank = index + 1;
      return {
        address: player.address,
        name:
          usernames[addAddressPadding(player.address)] ||
          player.address.slice(0, 9),
        rank: index + 1,
        points: player.earnings,
        highlight: BigInt(player.address) === BigInt(address),
      };
    });
    if (rank <= 100) {
      return data.slice(0, 100);
    }
    const selfData =
      data.find((player) => BigInt(player.address) === BigInt(address)) ||
      data[0];
    return [...data.slice(0, 99), selfData];
  }, [globals, address, usernames]);

  if (isError) return <LeaderboardError />;

  if (isLoading) return <LeaderboardLoading />;

  if (
    (!!game && gameAchievements.length === 0) ||
    Object.values(achievements).length === 0 ||
    (!game && gamesData.length === 0) ||
    (!!game && gameData.length === 0)
  ) {
    return <LeaderboardComingSoon />;
  }

  return (
    <LayoutContent className="select-none h-full overflow-clip p-0">
      <div className="h-full flex flex-col justify-between gap-y-6">
        <div
          className="p-0 py-4 mt-0 overflow-y-scroll border border-transparent"
          style={{ scrollbarWidth: "none" }}
        >
          <AchievementLeaderboard className="h-full rounded">
            {!game
              ? gamesData.map((item, index) => (
                  <AchievementLeaderboardRow
                    key={index}
                    pins={[]}
                    rank={item.rank}
                    name={item.name}
                    points={item.points}
                    highlight={item.highlight}
                    onClick={() => handleClick(item.address)}
                  />
                ))
              : gameData.map((item, index) => (
                  <AchievementLeaderboardRow
                    key={index}
                    pins={item.pins || []}
                    rank={item.rank}
                    name={item.name}
                    points={item.points}
                    highlight={item.highlight}
                    onClick={() => handleClick(item.address)}
                  />
                ))}
          </AchievementLeaderboard>
        </div>
      </div>
    </LayoutContent>
  );
}
