import { createContext, useState, ReactNode, useEffect, useMemo } from "react";
import { TROPHY, PROGRESS } from "@/constants";
import { Trophy, Progress } from "@/models";
import { useProgressions } from "@/hooks/progressions";
import { useTrophies } from "@/hooks/trophies";
import {
  AchievementHelper,
  AchievementData,
  Item,
  Player,
} from "@/helpers/achievements";

export interface AchievementsProps {
  namespace: string;
  project: string;
}

type AchievementContextType = {
  achievements: { [game: string]: Item[] };
  players: { [game: string]: Player[] };
  isLoading: boolean;
  projects: AchievementsProps[];
  setAddress: (address: string | undefined) => void;
  setProjects: (projects: AchievementsProps[]) => void;
};

const initialState: AchievementContextType = {
  achievements: {},
  players: {},
  isLoading: false,
  projects: [],
  setAddress: () => {},
  setProjects: () => {},
};

export const AchievementContext =
  createContext<AchievementContextType>(initialState);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<AchievementsProps[]>([]);
  const [achievements, setAchievements] = useState<{ [game: string]: Item[] }>(
    {},
  );
  const [players, setPlayers] = useState<{ [game: string]: Player[] }>({});
  const [address, setAddress] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const trophiesProps = useMemo(
    () => projects.map((prop) => ({ ...prop, name: TROPHY })),
    [projects],
  );
  const progressProps = useMemo(
    () => projects.map((prop) => ({ ...prop, name: PROGRESS })),
    [projects],
  );

  const { trophies } = useTrophies({
    props: trophiesProps,
    parser: Trophy.parse,
  });

  const { progressions } = useProgressions({
    props: progressProps,
    parser: Progress.parse,
  });

  // Compute achievements and players
  useEffect(() => {
    if (!Object.values(trophies).length || !address) return;
    // Compute players and achievement stats
    const data: AchievementData = AchievementHelper.extract(
      progressions,
      trophies,
    );
    const { stats, players } = AchievementHelper.computePlayers(data, trophies);
    setPlayers(players);
    const achievements = AchievementHelper.computeAchievements(
      data,
      trophies,
      players,
      stats,
      address,
    );
    setAchievements(achievements);
    // Update loading state
    setIsLoading(false);
  }, [address, trophies, progressions]);

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        players,
        isLoading,
        projects,
        setAddress,
        setProjects,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
}
