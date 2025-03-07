import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutContent,
  LayoutContentLoader,
  AchievementTabs,
  TabsContent,
  AchievementLeaderboard,
  AchievementLeaderboardRow,
  AchievementPlayerLabel,
} from "@cartridge/ui-next";
import { useUsername, useUsernames } from "@/hooks/account";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Trophies } from "./trophies";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { addAddressPadding } from "starknet";
import { useAchievements } from "@/hooks/achievements";
import { useAccount } from "@starknet-react/core";

export function Achievements({ game }: { game: GameModel }) {
  const { address: self } = useAccount();
  const { achievements, players, isLoading } = useAchievements();

  const navigate = useNavigate();

  const gamePlayers = useMemo(() => {
    return players[game?.project || ""] || [];
  }, [players, game]);

  const gameAchievements = useMemo(() => {
    return achievements[game?.project || ""] || [];
  }, [achievements, game]);

  const addresses = useMemo(() => {
    return gamePlayers.map((player) => player.address);
  }, [gamePlayers]);

  const { usernames } = useUsernames({ addresses });

  const { pins } = useArcade();

  const { address } = useParams<{ address: string }>();
  const { username } = useUsername({ address: address || self || "" });

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

  const { rank, points } = useMemo(() => {
    const rank =
      gamePlayers.findIndex(
        (player) => BigInt(player.address) === BigInt(address || self || "0x0"),
      ) + 1;
    const points =
      gamePlayers.find(
        (player) => BigInt(player.address) === BigInt(address || self || "0x0"),
      )?.earnings || 0;
    return { rank, points };
  }, [address, self, gamePlayers]);

  const isSelf = useMemo(() => {
    return !address || address === self;
  }, [address, self]);

  const location = useLocation();
  const to = useCallback(
    (address: string) => {
      if (address === self) return navigate(location.pathname);
      navigate([...location.pathname.split("/"), address].join("/"));
    },
    [location.pathname, self, navigate],
  );

  const data = useMemo(() => {
    return gamePlayers.map((player) => ({
      address: player.address,
      name:
        usernames.find(
          (username) =>
            BigInt(username.address || "0x0") === BigInt(player.address),
        )?.username || player.address.slice(0, 9),
      points: player.earnings,
      highlight: BigInt(player.address) === BigInt(address || self || "0x0"),
      pins: pins[addAddressPadding(player.address)]
        ?.map((id) => {
          const achievement = gameAchievements.find((a) => a?.id === id);
          return achievement ? { id, icon: achievement.icon } : undefined;
        })
        .filter(Boolean) as { id: string; icon: string }[],
    }));
  }, [gamePlayers, gameAchievements, address, self, pins, usernames]);

  if (isLoading) return <LayoutContentLoader />;

  if (gameAchievements.length === 0) {
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
          count={count}
          total={total}
          rank={rank}
          className="h-full flex flex-col justify-between gap-y-6"
        >
          <TabsContent
            className="p-0 mt-0 pb-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
            value="achievements"
          >
            <Trophies
              achievements={gameAchievements}
              pinneds={pinneds}
              softview={!isSelf}
              enabled={pinneds.length < 3}
              game={game}
              pins={pins}
              earnings={points}
            />
          </TabsContent>
          <TabsContent
            className="p-0 mt-0 pb-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
            value="leaderboard"
          >
            <AchievementLeaderboard className="h-full overflow-y-scroll">
              {data.map((item, index) => (
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
          <Trophies
            achievements={gameAchievements}
            pinneds={pinneds}
            softview={!isSelf}
            enabled={pinneds.length < 3}
            game={game}
            pins={pins}
            earnings={points}
          />
        </>
      )}
    </LayoutContent>
  );
}
