import { useContext } from "react";
import { ThemeContext, ConnectionContext, AchievementContext } from "@/context";

export function useTheme() {
  return useContext(ThemeContext);
}

export function useConnection() {
  return useContext(ConnectionContext);
}

export function useAchievement() {
  return useContext(AchievementContext);
}
