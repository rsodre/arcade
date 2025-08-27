import { useAddress } from "@/hooks/address";
import { cn } from "@/lib/utils";
import React, { memo, useMemo } from "react";
import { UserAvatar } from "./avatar";
import { useUsername } from "@/hooks/account";
import { AchievementPlayerBadge, SparklesIcon } from "@cartridge/ui";
import { usePlayerGameStats, usePlayerStats } from "@/hooks/achievements";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";

export const UserCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { address } = useAddress();
  const { username } = useUsername({ address });
  const { editions } = useArcade();
  const { game } = useProject();

  const projects = useMemo(() => {
    return editions
      .filter((edition) => edition.gameId === game?.id)
      .map((edition) => edition.config.project);
  }, [editions, game]);

  const Icon = useMemo(() => {
    return <UserAvatar username={username} className="h-full w-full" />;
  }, [username]);

  const { earnings: totalEarnings } = usePlayerStats();
  const { earnings: gameEarnings } = usePlayerGameStats(projects);

  if (!username) return null;

  return (
    <div
      id="user-card"
      ref={ref}
      className={cn(
        "flex flex-col items-start p-4 gap-2 self-stretch bg-background-100 hover:bg-background-150 border border-background-200 hover:border-background-300 rounded-xl",
        className,
      )}
      {...props}
    >
      <div
        id="player-label"
        className="flex items-center justify-between self-stretch"
      >
        <div className="flex items-center gap-3">
          <AchievementPlayerBadge
            icon={Icon}
            variant="default"
            className="!w-10 !h-10"
          />
          <p className="text-foreground-100 text-lg/6 font-semibold">
            {username}
          </p>
        </div>
        <div className="flex items-center gap-1 p-3">
          <div className="flex items-center gap-0.5">
            <SparklesIcon variant="solid" size="xs" />
            <p className="text-xs font-medium text-foreground-100">
              {game ? gameEarnings : totalEarnings}
            </p>
          </div>
          <p className="text-xs font-normal text-foreground-200">Points</p>
        </div>
      </div>
    </div>
  );
});

UserCard.displayName = "UserCard";
