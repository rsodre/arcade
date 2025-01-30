import { Spinner } from "@cartridge/ui-next";
import { TrophiesTab, LeaderboardTab } from "./tab";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TrophiesHeader } from "./trophies";
import { Leaderboard } from "./leaderboard";
import { useArcade } from "@/hooks/arcade";
import { useAccount } from "@starknet-react/core";
import { useAchievements, usePlayerStats } from "@/hooks/achievements";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { Item } from "@/helpers/achievements";

export function Home() {
  const { address: self } = useAccount();
  const { achievements, globals, isLoading } = useAchievements();
  const { games } = useArcade();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return searchParams.get("address") || self || "0x0";
  }, [searchParams, self]);

  const [activeTab, setActiveTab] = useState<"trophies" | "leaderboard">(
    "trophies",
  );

  const { completed, total, rank, earnings } = usePlayerStats(address);

  return (
    <div className="w-3/4">
      {Object.values(achievements).length ? (
        <div className="pb-4 select-none flex flex-col gap-y-6">
          <div className="flex justify-between gap-x-4 gap-y-4">
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
          {activeTab === "trophies" &&
            Object.values(games)
              .sort((a, b) => a.project.localeCompare(b.project))
              .map((game) => (
                <GameRow
                  key={game.project}
                  game={game}
                  achievements={achievements[game?.project || ""] || []}
                />
              ))}
          {activeTab === "leaderboard" && (
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

  return (
    <TrophiesHeader
      game={game}
      completed={completed}
      total={total}
      color={game.metadata?.color}
    />
  );
}
