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
  Event,
} from "@/helpers/achievements";
import { useUsernames } from "@/hooks/account";

export interface AchievementsProps {
  namespace: string;
  project: string;
}

type AchievementContextType = {
  achievements: { [game: string]: Item[] };
  players: { [game: string]: Player[] };
  events: { [game: string]: Event[] };
  usernames: { [key: string]: string };
  globals: Player[];
  isLoading: boolean;
  projects: AchievementsProps[];
  setAddress: (address: string | undefined) => void;
  setProjects: (projects: AchievementsProps[]) => void;
};

const initialState: AchievementContextType = {
  achievements: {},
  players: {},
  events: {},
  usernames: {},
  globals: [],
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
  const [events, setEvents] = useState<{ [game: string]: Event[] }>({});
  const [globals, setGlobals] = useState<Player[]>([]);
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
    if (
      !Object.values(trophies).length ||
      !Object.values(progressions).length ||
      !address
    )
      return;
    // Compute players and achievement stats
    const data: AchievementData = AchievementHelper.extract(
      progressions,
      trophies,
    );
    const { stats, players, events, globals } =
      AchievementHelper.computePlayers(data, trophies);
    setPlayers(players);
    setEvents(events);
    setGlobals(globals);
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

  const addresses = useMemo(() => {
    const addresses = Object.values(players).flatMap((gamePlayers) =>
      gamePlayers.map((player) => player.address),
    );
    const uniqueAddresses = [...new Set(addresses)];
    return uniqueAddresses;
  }, [players]);

  const { usernames } = useUsernames({ addresses });
  const usernamesData = useMemo(() => {
    const data: { [key: string]: string } = {};
    addresses.forEach((address) => {
      data[address] =
        usernames.find((username) => username.address === address)?.username ||
        address.slice(0, 9);
    });
    return data;
  }, [usernames, addresses]);

  return (
    <AchievementContext.Provider
      value={{
        achievements,
        players,
        events,
        usernames: usernamesData,
        globals,
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
