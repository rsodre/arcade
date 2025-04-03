import {
  EmptyStateAchievementIcon,
  EmptyStateActivityIcon,
  EmptyStateGuildIcon,
  EmptyStateIcon,
  EmptyStateInventoryIcon,
} from "@cartridge/ui-next";

export function Error({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ReactNode;
}) {
  return (
    <div className="h-full py-4">
      <div
        className="h-full flex flex-col gap-2 justify-center items-center select-none rounded"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23242824' stroke-width='2' stroke-dasharray='3%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <div className="w-[135px] h-[135px] max-w-[135px] max-h-[135px] min-h-[135px] min-w-[135px]">
          {Icon}
        </div>
        <p className="text-sm text-background-500">{title}</p>
      </div>
    </div>
  );
}

export function ActivityComingSoon() {
  return (
    <Error
      title="Coming soon"
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
      title="Coming soon"
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

export function MarketplaceComingSoon() {
  return (
    <Error
      title="Coming soon"
      Icon={<EmptyStateInventoryIcon className="h-full w-full" />}
    />
  );
}

export function MarketplaceLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateInventoryIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function MarketplaceError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateInventoryIcon className="h-full w-full" />}
    />
  );
}

export function AboutComingSoon() {
  return (
    <Error
      title="Coming soon"
      Icon={<EmptyStateActivityIcon className="h-full w-full" />}
    />
  );
}

export function AboutLoading() {
  return (
    <Error
      title="Loading..."
      Icon={<EmptyStateActivityIcon className="h-full w-full animate-pulse" />}
    />
  );
}

export function AboutError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateActivityIcon className="h-full w-full" />}
    />
  );
}

export function AchievementsComingSoon() {
  return (
    <Error
      title="Coming soon"
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

export function LeaderboardComingSoon() {
  return (
    <Error
      title="Coming soon"
      Icon={<EmptyStateAchievementIcon className="h-full w-full" />}
    />
  );
}

export function LeaderboardError() {
  return (
    <Error
      title="Oops! Something went wrong"
      Icon={<EmptyStateAchievementIcon className="h-full w-full" />}
    />
  );
}

export function LeaderboardLoading() {
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
      title="Coming soon"
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
      title="Coming soon"
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
