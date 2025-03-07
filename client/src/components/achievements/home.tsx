import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount } from "@starknet-react/core";
import { useAchievements, usePlayerStats } from "@/hooks/achievements";

import { useLocation, useNavigate } from "react-router-dom";
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
import { useUsername, useUsernames } from "@/hooks/account";
import { useCallback } from "react";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { Item } from "@/helpers/achievements";
import { useArcade } from "@/hooks/arcade";
import { addAddressPadding } from "starknet";

const PLACEHOLDER =
  "https://static.cartridge.gg/presets/cartridge/cover-dark.png";

export function Home() {
  const { address: self } = useAccount();
  const { achievements, globals, isLoading } = useAchievements();
  const { pins, games } = useArcade();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return searchParams.get("address") || self || "0x0";
  }, [searchParams, self]);
  const { username } = useUsername({ address });

  const { completed, total, rank } = usePlayerStats(address);

  const addresses = useMemo(() => {
    return globals.map((player) => player.address);
  }, [globals]);

  const { usernames } = useUsernames({ addresses });

  const isSelf = useMemo(() => {
    return !address || address === self;
  }, [address, self]);

  const navigate = useNavigate();
  const location = useLocation();
  const to = useCallback(
    (address: string) => {
      if (address === self) return navigate(location.pathname);
      navigate([...location.pathname.split("/"), address].join("/"));
    },
    [location.pathname, self, navigate],
  );

  const data = useMemo(() => {
    return globals.map((player) => ({
      address: player.address,
      name:
        usernames.find(
          (username) =>
            BigInt(username.address || "0x0") === BigInt(player.address),
        )?.username || player.address.slice(0, 9),
      points: player.earnings,
      highlight: BigInt(player.address) === BigInt(address || self || "0x0"),
    }));
  }, [globals, address, self, usernames]);

  if (isLoading) return <LayoutContentLoader />;

  if (Object.values(achievements).length === 0) {
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
          count={completed}
          total={total}
          rank={rank}
          className="h-full flex flex-col justify-between gap-y-6"
        >
          <TabsContent
            className="p-0 mt-0 pb-6 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
            value="achievements"
          >
            <div className="flex flex-col gap-y-6">
              {Object.values(games).map((game) => (
                <GameRow
                  key={game.project}
                  address={address}
                  game={game}
                  achievements={achievements}
                  pins={pins}
                />
              ))}
            </div>
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
                  pins={[]}
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
          <></>
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
}: {
  address: string;
  game: GameModel;
  achievements: { [game: string]: Item[] };
  pins: { [playerId: string]: string[] };
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

  return <AchievementSummary {...summaryProps} variant="default" />;
}
