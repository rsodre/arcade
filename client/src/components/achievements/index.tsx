import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  LayoutContent,
  LayoutContentLoader,
  AchievementTabs,
  TabsContent,
  AchievementLeaderboard,
  AchievementLeaderboardRow,
  AchievementPlayerLabel,
  AchievementSummary,
} from "@cartridge/ui-next";
import { useUsername } from "@/hooks/account";
import { useCallback, useMemo, useState } from "react";
import { Trophies } from "./trophies";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { addAddressPadding } from "starknet";
import { useAchievements, usePlayerStats } from "@/hooks/achievements";
import { useAccount } from "@starknet-react/core";
import { Item } from "@/helpers/achievements";
import { PLACEHOLDER } from "@/constants";

export function Achievements({ game }: { game?: GameModel }) {
  const [tab, setTab] = useState<"achievements" | "leaderboard">(
    "achievements",
  );
  const { address: self } = useAccount();
  const { achievements, globals, players, usernames, isLoading } =
    useAchievements();
  const { pins, games } = useArcade();

  const navigate = useNavigate();

  const gamePlayers = useMemo(() => {
    return players[game?.project || ""] || [];
  }, [players, game]);

  const gameAchievements = useMemo(() => {
    return achievements[game?.project || ""] || [];
  }, [achievements, game]);

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return searchParams.get("address") || self || "0x0";
  }, [searchParams, self]);

  const { username } = useUsername({ address });

  const { pinneds, count, total } = useMemo(() => {
    const ids = pins[addAddressPadding(address || self || "0x0")] || [];
    const pinneds = gameAchievements
      .filter((item) => ids.includes(item.id))
      .sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
      .slice(0, 3); // There is a front-end limit of 3 pinneds
    const count = gameAchievements.filter((item) => item.completed).length;
    const total = gameAchievements.length;
    return { pinneds, count, total };
  }, [gameAchievements, pins, address, self]);

  const { rank: gameRank, points: gamePoints } = useMemo(() => {
    const rank =
      gamePlayers.findIndex(
        (player) => BigInt(player.address) === BigInt(address),
      ) + 1;
    const points =
      gamePlayers.find((player) => BigInt(player.address) === BigInt(address))
        ?.earnings || 0;
    return { rank, points };
  }, [address, gamePlayers]);

  const {
    completed: gamesCompleted,
    total: gamesTotal,
    rank: gamesRank,
  } = usePlayerStats(address);

  const isSelf = useMemo(() => {
    return !searchParams.get("address") || address === self;
  }, [searchParams, self]);

  const location = useLocation();
  const to = useCallback(
    (address: string) => {
      if (address === self) return navigate(location.pathname);
      navigate([...location.pathname.split("/"), address].join("/"));
    },
    [location.pathname, self, navigate],
  );

  const gameData = useMemo(() => {
    let rank = 0;
    const data = gamePlayers.map((player, index) => {
      if (BigInt(player.address) === BigInt(address)) rank = index + 1;
      return {
        address: player.address,
        name: usernames[player.address] || player.address.slice(0, 9),
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
        name: usernames[player.address] || player.address.slice(0, 9),
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
  }, [globals, address, self, usernames]);

  const filteredGames = useMemo(() => {
    return !game ? games : [game];
  }, [games, game]);

  if (isLoading) return <LayoutContentLoader />;

  if (
    (!!game && gameAchievements.length === 0) ||
    Object.values(achievements).length === 0
  ) {
    return (
      <div className="flex justify-center items-center h-full border border-dashed rounded-md border-background-400 mb-4">
        <p className="text-foreground-400">No trophies available</p>
      </div>
    );
  }

  return (
    <LayoutContent className="gap-y-6 select-none h-full overflow-clip">
      {isSelf ? (
        <AchievementTabs
          value={tab}
          onValueChange={(value) =>
            setTab(value as "achievements" | "leaderboard")
          }
          count={!game ? gamesCompleted : count}
          total={!game ? gamesTotal : total}
          rank={!game ? gamesRank : gameRank}
          className="h-full flex flex-col justify-between gap-y-6"
        >
          <TabsContent
            className="p-0 mt-0 pb-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
            value="achievements"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-y-6">
                {filteredGames.map((item, index) => (
                  <GameRow
                    key={index}
                    address={address}
                    game={item}
                    achievements={achievements}
                    pins={pins}
                    variant={!game ? "default" : "faded"}
                  />
                ))}
              </div>

              {game && (
                <Trophies
                  achievements={gameAchievements}
                  softview={!isSelf}
                  enabled={pinneds.length < 3}
                  game={game}
                  pins={pins}
                  earnings={gamePoints}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent
            className="p-0 mt-0 pb-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
            value="leaderboard"
          >
            <AchievementLeaderboard className="h-full overflow-y-scroll">
              {!game
                ? gamesData.map((item, index) => (
                    <AchievementLeaderboardRow
                      key={index}
                      pins={[]}
                      rank={index + 1}
                      name={item.name}
                      points={item.points}
                      highlight={item.highlight}
                      onClick={() => to(item.address)}
                    />
                  ))
                : gameData.map((item, index) => (
                    <AchievementLeaderboardRow
                      key={index}
                      pins={item.pins || []}
                      rank={index + 1}
                      name={item.name}
                      points={item.points}
                      highlight={item.highlight}
                      onClick={() => to(item.address)}
                    />
                  ))}
            </AchievementLeaderboard>
          </TabsContent>
        </AchievementTabs>
      ) : (
        <>
          <AchievementPlayerLabel
            username={username}
            address={address || self || ""}
          />
          <div className="flex flex-col gap-y-6">
            {filteredGames.map((item) => (
              <GameRow
                key={item.project}
                address={"0x0"}
                game={item}
                achievements={achievements}
                pins={{}}
                variant={!game ? "default" : "faded"}
              />
            ))}
          </div>
          {game && (
            <Trophies
              achievements={gameAchievements}
              softview={!isSelf}
              enabled={pinneds.length < 3}
              game={game}
              pins={pins}
              earnings={gamePoints}
            />
          )}
        </>
      )}
    </LayoutContent>
  );
}

export function GameRow({
  address,
  game,
  achievements,
  pins,
  variant,
}: {
  address: string;
  game: GameModel;
  achievements: { [game: string]: Item[] };
  pins: { [playerId: string]: string[] };
  variant: "default" | "faded";
}) {
  const gameAchievements = useMemo(() => {
    return achievements[game?.project || ""] || [];
  }, [achievements, game]);

  const { pinneds } = useMemo(() => {
    const ids = pins[addAddressPadding(address)] || [];
    const pinneds = gameAchievements
      .filter((item) => ids.includes(item.id))
      .sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
      .slice(0, 3); // There is a front-end limit of 3 pinneds
    return { pinneds };
  }, [gameAchievements, pins, address, self]);

  const summaryProps = useMemo(() => {
    return {
      achievements: gameAchievements.map((achievement) => {
        return {
          id: achievement.id,
          content: {
            points: achievement.earning,
            difficulty: parseFloat(achievement.percentage),
            hidden: achievement.hidden,
            icon: achievement.icon,
            tasks: achievement.tasks,
            timestamp: achievement.timestamp,
          },
          pin: {
            pinned: pinneds.some((pinneds) => pinneds.id === achievement.id),
          },
        };
      }),
      metadata: {
        name: game?.metadata.name || "Game",
        logo: game?.metadata.image,
        cover: PLACEHOLDER,
      },
      socials: { ...game?.socials },
    };
  }, [gameAchievements, game, pinneds]);

  return <AchievementSummary {...summaryProps} variant={variant} active />;
}
