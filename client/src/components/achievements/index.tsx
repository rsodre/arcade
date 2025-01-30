import { Spinner } from "@cartridge/ui-next";
import { TrophiesTab, LeaderboardTab } from "./tab";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Trophies } from "./trophies";
import { Leaderboard } from "./leaderboard";
import { useArcade } from "@/hooks/arcade";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAccount } from "@starknet-react/core";
import { useAchievements, usePlayerGameStats } from "@/hooks/achievements";

export function Achievements({ game }: { game: GameModel }) {
  const { address: self } = useAccount();
  const { achievements, players, isLoading } = useAchievements();
  const { pins } = useArcade();

  const [searchParams] = useSearchParams();
  const address = useMemo(() => {
    return searchParams.get("address") || self || "0x0";
  }, [searchParams, self]);

  const [activeTab, setActiveTab] = useState<"trophies" | "leaderboard">(
    "trophies",
  );

  const gameAchievements = useMemo(() => {
    return achievements[game?.project || ""] || [];
  }, [achievements, game]);

  const gamePlayers = useMemo(
    () => players[game?.project || ""] || [],
    [players, game],
  );

  const { pinneds, completed, total, rank, earnings } = usePlayerGameStats(
    game.project,
    address,
  );

  const isSelf = useMemo(() => {
    return address === self;
  }, [address, self]);

  return (
    <div className="w-3/4">
      {gameAchievements.length ? (
        <div className="pb-4 select-none flex flex-col gap-y-6">
          {isSelf && (
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
          )}
          {(!isSelf || activeTab === "trophies") && (
            <Trophies
              achievements={gameAchievements}
              softview={!isSelf}
              enabled={pinneds.length < 3}
              game={game}
              pins={pins}
            />
          )}
          {isSelf && activeTab === "leaderboard" && (
            <Leaderboard
              players={gamePlayers}
              address={self || ""}
              achievements={gameAchievements}
              pins={pins}
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
