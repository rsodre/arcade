import { Spinner } from "@cartridge/ui-next";
import { TrophiesTab, LeaderboardTab } from "./tab";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TrophiesHeader } from "./trophies";
import { Leaderboard } from "./leaderboard";
import { useArcade } from "@/hooks/arcade";
import { useAccount } from "@starknet-react/core";
import { useAchievements } from "@/hooks/achievements";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { Item } from "@/helpers/achievements";

export function Home() {
  const { address: self } = useAccount();
  const { achievements, globals, isLoading } = useAchievements();
  const { games } = useArcade();

  const { address } = useParams<{ address: string }>();

  const [activeTab, setActiveTab] = useState<"trophies" | "leaderboard">(
    "trophies",
  );

  const { completed, total } = useMemo(() => {
    let completed = 0;
    let total = 0;
    Object.values(achievements).forEach((gameAchievements) => {
      completed += gameAchievements.filter((item) => item.completed).length;
      total += gameAchievements.length;
    });
    return { completed, total };
  }, [achievements]);

  const { rank, earnings } = useMemo(() => {
    const rank =
      globals.findIndex(
        (player) =>
          BigInt(player.address || 0) === BigInt(address || self || 0),
      ) + 1;
    const earnings =
      globals.find(
        (player) =>
          BigInt(player.address || 0) === BigInt(address || self || 0),
      )?.earnings || 0;
    return { rank, earnings };
  }, [address, self, globals]);

  const isSelf = useMemo(() => {
    return !address || address === self;
  }, [address, self]);

  return (
    <div className="w-3/4">
      {Object.values(achievements).length ? (
        <div className="pb-4 select-none flex flex-col gap-y-6">
          {isSelf && (
            <div className="flex justify-between gap-x-3 gap-y-4">
              <TrophiesTab
                active={activeTab === "trophies"}
                completed={completed}
                total={total}
                onClick={() => setActiveTab("trophies")}
              />
              <LeaderboardTab
                active={activeTab === "leaderboard"}
                rank={rank}
                earnings={earnings}
                onClick={() => setActiveTab("leaderboard")}
              />
            </div>
          )}
          {(!isSelf || activeTab === "trophies") &&
            Object.values(games)
              .sort((a, b) => a.project.localeCompare(b.project))
              .map((game) => (
                <GameRow
                  key={game.project}
                  game={game}
                  achievements={achievements[game?.project || ""] || []}
                />
              ))}
          {isSelf && activeTab === "leaderboard" && (
            <Leaderboard
              players={globals}
              address={self || ""}
              achievements={[]}
              pins={{}}
            />
          )}
        </div>
      ) : isLoading ? (
        <div className="pb-4 select-none">
          <div className="flex justify-center items-center h-full border border-dashed rounded-md text-muted-foreground/10 mb-4">
            <Spinner className="text-muted-foreground/30" size="lg" />
          </div>
        </div>
      ) : (
        <div className="pb-4 select-none">
          <div className="flex justify-center items-center h-full border border-dashed rounded-md text-muted-foreground/10 mb-4">
            <p className="text-muted-foreground/30">No trophies available</p>
          </div>
        </div>
      )}
    </div>
  );
}

function GameRow({
  game,
  achievements,
}: {
  game: GameModel;
  achievements: Item[];
}) {
  const { completed, total } = useMemo(() => {
    const completed = achievements.filter((item) => item.completed).length;
    const total = achievements.length;
    return { completed, total };
  }, [achievements]);

  return <TrophiesHeader game={game} completed={completed} total={total} />;
}
