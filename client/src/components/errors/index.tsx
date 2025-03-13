import {
  EmptyStateAchievementIcon,
  EmptyStateActivityIcon,
  EmptyStateGuildIcon,
  EmptyStateIcon,
  EmptyStateInventoryIcon,
} from "@cartridge/ui-next";
import banner from "/public/banner.svg";
import { useEffect, useState } from "react";

export function Error({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = banner;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="select-none flex flex-col justify-center items-center gap-3 grow border border-spacer-100 rounded-lg overflow-hidden pt-[135px]">
      {Icon}
      <p className="text-xl text-background-500">{title}</p>
      <img
        draggable={false}
        className={`opacity-0 transition-opacity ${isLoaded ? "opacity-50" : ""}`}
        style={{ transitionDuration: "1000ms" }}
        src={banner}
      />
    </div>
  );
}

export function ActivityComingSoon() {
  return (
    <Error
      title="Activity feature is coming soon"
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function ActivityError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function ActivityLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5 animate-pulse" />}
    />
  );
}

export function GuildsComingSoon() {
  return (
    <Error
      title="Guilds feature is coming soon"
      Icon={<EmptyStateGuildIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function GuildsLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateGuildIcon className="h-1/2 w-1/5 animate-pulse" />}
    />
  );
}

export function GuildsError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateGuildIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function AchievementsComingSoon() {
  return (
    <Error
      title="Achievements feature is coming soon"
      Icon={<EmptyStateAchievementIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function AchievementsError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateAchievementIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function AchievementsLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateAchievementIcon className="h-1/2 w-1/5 animate-pulse" />}
    />
  );
}

export function InventoryComingSoon() {
  return (
    <Error
      title="Inventory feature is coming soon"
      Icon={<EmptyStateInventoryIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function InventoryError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateInventoryIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function InventoryLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateInventoryIcon className="h-1/2 w-1/5 animate-pulse" />}
    />
  );
}

export function DiscoverComingSoon() {
  return (
    <Error
      title="Discover feature is coming soon"
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function DiscoverError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5" />}
    />
  );
}

export function DiscoverLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateActivityIcon className="h-1/2 w-1/5 animate-pulse" />}
    />
  );
}

export function GenericError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateIcon className="h-1/2 w-1/5" />}
    />
  );
}
