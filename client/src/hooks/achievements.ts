import { useContext, useEffect, useMemo } from "react";
import { useAccount } from "@starknet-react/core";
import { AchievementContext } from "@/context";

export function useAchievements(accountAddress?: string) {
  const {
    achievements,
    players,
    isLoading,
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

  return { achievements, players, isLoading, projects, setProjects };
}
