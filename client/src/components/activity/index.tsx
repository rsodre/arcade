import { useAchievements } from "@/hooks/achievements";
import { useActivities } from "@/hooks/activities";
import {
  ActivityAchievementCard,
  ActivityCollectibleCard,
  ActivityGameCard,
  ActivityTokenCard,
  LayoutContent,
} from "@cartridge/ui-next";
import { useCallback, useMemo } from "react";
import { ActivityEmpty, ActivityError, ActivityLoading } from "../errors";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { useAddress } from "@/hooks/address";

interface CardProps {
  variant: "token" | "collectible" | "game" | "achievement";
  key: string;
  transactionHash: string;
  amount: string;
  address: string;
  value: string;
  name: string;
  collection: string;
  image: string;
  title: string;
  website: string;
  certified: boolean;
  action: "send" | "receive" | "mint";
  timestamp: number;
  date: string;
  points: number;
}

export function Activity() {
  const { address } = useAddress();
  const { project } = useProject();
  const { games } = useArcade();
  const { events } = useAchievements();
  const { activities, status: activitiesStatus } = useActivities();

  const gameEvents = useMemo(() => {
    if (!project) return Object.values(events).flatMap((event) => event);
    return events[project] || [];
  }, [project, events]);

  const getDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.getDate() === today.getDate()) {
      return "Today";
    } else if (date.getDate() === today.getDate() - 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }, []);

  const { data, dates } = useMemo(() => {
    const dates: string[] = [];

    const actions: CardProps[] = (activities || []).map((activity) => {
      const date = getDate(activity.timestamp);
      if (!dates.includes(date)) {
        dates.push(date);
      }
      const title = activity.entrypoint;
      const game = games.find(
        (game) =>
          game.config.project === activity.project ||
          game.config.project === "ryomainnet",
      );
      return {
        variant: "game",
        key: `${activity.entrypoint}-${activity.transactionHash}`,
        transactionHash: activity.transactionHash,
        title: title.replace("_", " "),
        image: game?.metadata.image || "",
        website: game?.socials.website || "",
        certified: !!game,
        timestamp: activity.timestamp / 1000,
        date: date,
      } as CardProps;
    });

    const achievements: CardProps[] = Object.keys(events).flatMap((gameKey) => {
      if (project !== gameKey && !!project) return [];
      const gameEvents = events[gameKey].filter(
        (event) => BigInt(event.player) === BigInt(address),
      );
      return gameEvents.map((event) => {
        const date = getDate(event.timestamp * 1000);
        if (!dates.includes(date)) {
          dates.push(date);
        }
        const game = games.find((game) => game.config.project === gameKey);
        return {
          variant: "achievement",
          transactionHash: "",
          title: event.achievement.title,
          image: event.achievement.icon,
          timestamp: event.timestamp,
          date: date,
          website: game?.socials.website || "",
          certified: !!game,
          points: event.achievement.points,
        } as CardProps;
      });
    });

    const sortedDates = dates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );
    const uniqueDates = [...new Set(sortedDates)];
    return {
      dates: uniqueDates,
      data: [...actions, ...achievements].sort(
        (a, b) => b.timestamp - a.timestamp,
      ),
    };
  }, [activities, gameEvents, address, games, getDate]);

  switch (activitiesStatus) {
    case "loading": {
      return <ActivityLoading />;
    }
    case "success": {
      return (
        <LayoutContent className="gap-y-6 select-none h-full overflow-y-scroll p-0 py-4">
          {dates.length > 0 ? (
            dates.map((current) => {
              return (
                <div className="flex flex-col gap-2" key={current}>
                  <p className="py-3 text-xs font-semibold text-foreground-400 tracking-wider">
                    {current}
                  </p>
                  {data
                    .filter(({ date }) => date === current)
                    .map((props: CardProps, index: number) => {
                      switch (props.variant) {
                        case "token":
                          return (
                            <ActivityTokenCard
                              key={index}
                              amount={props.amount}
                              address={props.address}
                              value={props.value}
                              image={props.image}
                              action={props.action}
                            />
                          );
                        case "collectible":
                          return (
                            <ActivityCollectibleCard
                              key={index}
                              name={props.name}
                              collection={props.collection}
                              address={props.address}
                              image={props.image}
                              action={props.action}
                            />
                          );
                        case "game":
                          return (
                            <ActivityGameCard
                              key={index}
                              title={props.title}
                              website={props.website}
                              image={props.image}
                              certified={props.certified}
                            />
                          );
                        case "achievement":
                          return (
                            <ActivityAchievementCard
                              key={index}
                              title={"Achievement"}
                              image={props.image}
                              certified={props.certified}
                              topic={props.title}
                              points={props.points}
                              website={props.website}
                            />
                          );
                      }
                    })}
                </div>
              );
            })
          ) : (
            <ActivityEmpty />
          )}
        </LayoutContent>
      );
    }
    case "error":
    default: {
      return <ActivityError />;
    }
  }
}
