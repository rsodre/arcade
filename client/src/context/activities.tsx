import { createContext, useState, ReactNode, useMemo } from "react";
import { useActivitiesQuery } from "@cartridge/utils/api/cartridge";
import { useAddress } from "@/hooks/address";
import { useArcade } from "@/hooks/arcade";
import { hash } from "starknet";

const LIMIT = 100;
export const ENTRYPOINTS: string[] = [
  // Dope Wars
  "approve",
  "create_game",
  "travel",
  "decide",
  "end_game",
  "register_score",
  "claim",
  "launder",
  "transfer",
  // Dark Shuffle
  "start_game",
  "battle_actions",
  "pick_card",
  "generate_tree",
  "select_node",
];

export type Activity = {
  project: string;
  contractAddress: string;
  transactionHash: string;
  entrypoint: string;
  timestamp: number;
};

export type ActivitiesContextType = {
  activities: { [key: string]: Activity[] };
  status: "success" | "error" | "idle" | "loading";
};

export const ActivitiesContext = createContext<ActivitiesContextType | null>(
  null,
);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const { address } = useAddress();
  const { projects: slots } = useArcade();
  const [activities, setActivities] = useState<{ [key: string]: Activity[] }>(
    {},
  );

  const projects = useMemo(() => {
    // return slots.map((slot) => {
    return [{ project: "dopewarsbal" }].map((slot) => {
      return {
        project: slot.project,
        entrypoints: ENTRYPOINTS.map(
          (entrypoint) => `0x${hash.starknetKeccak(entrypoint).toString(16)}`,
        ),
        address: address,
        date: "",
        limit: LIMIT,
      };
    });
  }, [slots, address]);

  const { status } = useActivitiesQuery(
    {
      projects: projects,
    },
    {
      queryKey: ["activities", projects, address],
      enabled: projects.length > 0 && !!address,
      onSuccess: ({ activities }) => {
        const newActivities: { [key: string]: Activity[] } = {};
        activities?.items.forEach((item) => {
          const project = item.meta.project;
          newActivities[project] = item.activities.map((activity) => {
            return {
              project: project,
              contractAddress: activity.contractAddress,
              transactionHash: activity.transactionHash,
              entrypoint: activity.entrypoint,
              timestamp: new Date(activity.executedAt).getTime(),
            };
          });
        });
        setActivities(newActivities);
      },
    },
  );

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        status,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
