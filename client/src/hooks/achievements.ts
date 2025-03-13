import { useContext, useEffect, useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { AchievementContext } from "@/context";
import { addAddressPadding } from "starknet";
import { useArcade } from "./arcade";

export interface Item {
  id: string;
  hidden: boolean;
  index: number;
  earning: number;
  group: string;
  icon: string;
  title: string;
  description: string;
  timestamp: number;
  percentage: string;
  completed: boolean;
  pinned: boolean;
  tasks: ItemTask[];
}

export interface ItemTask {
  id: string;
  count: number;
  total: number;
  description: string;
}

export interface Counters {
  [player: string]: { [quest: string]: { count: number; timestamp: number }[] };
}

export interface Stats {
  [quest: string]: number;
}

export interface Player {
  address: string;
  earnings: number;
  timestamp: number;
  completeds: string[];
}

export function useAchievements(accountAddress?: string) {
  const {
    achievements,
    players,
    events,
    usernames,
    globals,
    isLoading,
    isError,
    projects,
    setAddress,
    setProjects,
  } = useContext(AchievementContext);

  const { address } = useAccount();

  const currentAddress = useMemo(() => {
    return `0x${BigInt(accountAddress || address || "0x0").toString(16)}`;
  }, [accountAddress, address]);

  useEffect(() => {
    setAddress(currentAddress);
  }, [currentAddress]);

  return {
    achievements,
    players,
    events,
    usernames,
    globals,
    isLoading,
    isError,
    projects,
    setProjects,
  };
}

export function usePlayerStats(accountAddress?: string) {
  const { achievements, globals } = useAchievements(accountAddress);

  const { address } = useAccount();

  const currentAddress = useMemo(() => {
    return `0x${BigInt(accountAddress || address || "0x0").toString(16)}`;
  }, [accountAddress, address]);

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
        (player) => BigInt(player.address || 0) === BigInt(currentAddress),
      ) + 1;
    const earnings =
      globals.find(
        (player) => BigInt(player.address || 0) === BigInt(currentAddress),
      )?.earnings || 0;
    return { rank, earnings };
  }, [currentAddress, globals]);

  return { completed, total, rank, earnings };
}

export function usePlayerGameStats(project: string, accountAddress?: string) {
  const { pins } = useArcade();
  const { achievements, players } = useAchievements(accountAddress);

  const { address } = useAccount();

  const currentAddress = useMemo(() => {
    return `0x${BigInt(accountAddress || address || "0x0").toString(16)}`;
  }, [accountAddress, address]);

  const gameAchievements = useMemo(() => {
    return achievements[project || ""] || [];
  }, [achievements, project]);

  const gamePlayers = useMemo(
    () => players[project || ""] || [],
    [players, project],
  );

  const { pinneds, completed, total } = useMemo(() => {
    const ids = pins[addAddressPadding(currentAddress)] || [];
    const pinneds = gameAchievements
      .filter((item) => ids.includes(item.id))
      .sort((a, b) => parseFloat(a.percentage) - parseFloat(b.percentage))
      .slice(0, 3); // There is a front-end limit of 3 pinneds
    const completed = gameAchievements.filter((item) => item.completed).length;
    const total = gameAchievements.length;
    return { pinneds, completed, total };
  }, [pins, currentAddress, gameAchievements]);

  const { rank, earnings } = useMemo(() => {
    const rank =
      gamePlayers.findIndex(
        (player) => BigInt(player.address || 0) === BigInt(currentAddress),
      ) + 1;
    const earnings =
      gamePlayers.find(
        (player) => BigInt(player.address || 0) === BigInt(currentAddress),
      )?.earnings || 0;
    return { rank, earnings };
  }, [currentAddress, gamePlayers]);

  return { pinneds, completed, total, rank, earnings };
}
