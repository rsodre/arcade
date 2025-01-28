import { Progress, Trophy, Task } from "@/models";

export interface Progressions {
  [game: string]: { [key: string]: Progress };
}

export interface Trophies {
  [game: string]: { [key: string]: Trophy };
}

export interface AchievementData {
  [game: string]: {
    [playerId: string]: {
      [achievementId: string]: {
        [taskId: string]: {
          completion: boolean;
          timestamp: number;
          count: number;
        };
      };
    };
  };
}

export interface AchievementStats {
  [game: string]: { [key: string]: number };
}

export interface AchievementPlayers {
  [game: string]: Player[];
}

export interface Player {
  address: string;
  earnings: number;
  timestamp: number;
  completeds: string[];
}

export interface Achievements {
  [game: string]: Item[];
}

export interface ItemTask {
  id: string;
  count: number;
  total: number;
  description: string;
}

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

export const AchievementHelper = {
  extract(progressions: Progressions, trophies: Trophies): AchievementData {
    // Compute players and achievement stats
    const data: AchievementData = {};
    Object.keys(progressions).forEach((game) => {
      data[game] = {};
      Object.values(progressions[game]).forEach((progress: Progress) => {
        if (!trophies[game]) return;
        const { achievementId, playerId, taskId, taskTotal, total, timestamp } =
          progress;
        // Compute player
        const detaultTasks: { [taskId: string]: { completion: boolean } } = {};
        const trophy = trophies[game][achievementId];
        if (!trophy) return;
        trophy.tasks.forEach(
          (task: Task) => (detaultTasks[task.id] = { completion: false }),
        );
        data[game][playerId] = data[game][playerId] || {};
        data[game][playerId][achievementId] = data[game][playerId][
          achievementId
        ] || { detaultTasks };
        data[game][playerId][achievementId][taskId] = {
          completion: total >= taskTotal,
          timestamp,
          count: total,
        };
      });
    });
    return data;
  },

  computePlayers(
    data: AchievementData,
    trophies: Trophies,
  ): { stats: AchievementStats; players: AchievementPlayers } {
    const stats: AchievementStats = {};
    const players: AchievementPlayers = {};
    Object.keys(data).forEach((game) => {
      stats[game] = {};
      const gamePlayers: Player[] = [];
      Object.keys(data[game]).forEach((playerId) => {
        const player = data[game][playerId];
        const completeds: string[] = [];
        let timestamp = 0;
        const earnings = Object.keys(player).reduce((acc, achievementId) => {
          const completion = Object.values(player[achievementId]).every(
            (task) => task.completion,
          );
          if (completion) {
            completeds.push(achievementId);
            stats[game][achievementId] = stats[game][achievementId] || 0;
            stats[game][achievementId] += 1;
            timestamp = Math.max(
              timestamp,
              ...Object.values(player[achievementId]).map(
                (task) => task.timestamp,
              ),
            );
          }
          return acc + (completion ? trophies[game][achievementId].earning : 0);
        }, 0);
        gamePlayers.push({
          address: playerId,
          earnings,
          timestamp: timestamp,
          completeds,
        });
      });
      players[game] = gamePlayers
        .sort((a, b) => a.timestamp - b.timestamp) // Oldest to newest
        .sort((a, b) => b.earnings - a.earnings); // Highest to lowest
    });
    return { stats, players };
  },

  computeAchievements(
    data: AchievementData,
    trophies: Trophies,
    players: AchievementPlayers,
    stats: AchievementStats,
    address: string,
  ): Achievements {
    const achievements: Achievements = {};
    Object.keys(trophies).forEach((game) => {
      const gameAchievements: Item[] = Object.values(trophies[game]).map(
        (trophy: Trophy) => {
          const achievement = data[game]?.[address]?.[trophy.id] || {};
          const completion =
            Object.values(achievement).length > 0 &&
            Object.values(achievement).every((task) => task.completion);
          const timestamp = Math.max(
            ...Object.values(achievement).map((task) => task.timestamp),
          );
          // Compute percentage of players who completed the achievement
          const percentage = (
            players[game]?.length
              ? (100 * (stats[game][trophy.id] ?? 0)) / players[game]?.length
              : 0
          ).toFixed(0);
          const tasks: ItemTask[] = trophy.tasks.map((task) => {
            return { ...task, count: achievement[task.id]?.count || 0 };
          });
          return {
            id: trophy.id,
            hidden: trophy.hidden,
            index: trophy.index,
            earning: trophy.earning,
            group: trophy.group,
            icon: trophy.icon,
            title: trophy.title,
            description: trophy.description,
            completed: completion,
            percentage,
            timestamp,
            pinned: false,
            tasks,
          };
        },
      );
      achievements[game] = gameAchievements
        .sort((a, b) => a.index - b.index) // Lowest index to greatest
        .sort((a, b) => (a.id > b.id ? 1 : -1)) // A to Z
        .sort((a, b) => (b.hidden ? -1 : 1) - (a.hidden ? -1 : 1)) // Visible to hidden
        .sort((a, b) => b.timestamp - a.timestamp) // Newest to oldest
        .sort((a, b) => (b.completed ? 1 : 0) - (a.completed ? 1 : 0)); // Completed to uncompleted
    });
    return achievements;
  },
};
