import {
  EmptyStateAchievementIcon,
  EmptyStateActivityIcon,
  EmptyStateGuildIcon,
  EmptyStateIcon,
  EmptyStateInventoryIcon,
} from "@cartridge/ui-next";
import banner from "@/assets/banner.svg";
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
      <div className="w-[135px] h-[135px] max-w-[135px] max-h-[135px] min-h-[135px] min-w-[135px]">
        {Icon}
      </div>
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
      Icon={<EmptyStateActivityIcon className="h-full w-full" />}
    />
  );
}

export function ActivityError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateActivityIcon size="xl" />}
    />
  );
}

export function ActivityLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateActivityIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function GuildsComingSoon() {
  return (
    <Error
      title="Guilds feature is coming soon"
      Icon={<EmptyStateGuildIcon className="h-full w-full" />}
    />
  );
}

export function GuildsLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateGuildIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function GuildsError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateGuildIcon className="h-full w-full" />}
    />
  );
}

export function AchievementsComingSoon() {
  return (
    <Error
      title="Achievements feature is coming soon"
      Icon={<EmptyStateAchievementIcon className="h-full w-full" />}
    />
  );
}

export function AchievementsError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateAchievementIcon className="h-full w-full" />}
    />
  );
}

export function AchievementsLoading() {
  return (
    <Error
      title="Loading..."
      Icon={
        <EmptyStateAchievementIcon className="h-full w-full animate-pulse" />
      }
    />
  );
}

export function InventoryComingSoon() {
  return (
    <Error
      title="Inventory feature is coming soon"
      Icon={<EmptyStateInventoryIcon className="h-full w-full" />}
    />
  );
}

export function InventoryError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateInventoryIcon className="h-full w-full" />}
    />
  );
}

export function InventoryLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateInventoryIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function DiscoverComingSoon() {
  return (
    <Error
      title="Discover feature is coming soon"
      Icon={<EmptyStateActivityIcon className="h-full w-full" />}
    />
  );
}

export function DiscoverError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateActivityIcon className="h-full w-full" />}
    />
  );
}

export function DiscoverLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateActivityIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function GenericError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateIcon className="h-full w-full" />}
    />
  );
}
