import { createContext, useState, ReactNode, useMemo } from "react";
import { useActivitiesQuery } from "@cartridge/utils/api/cartridge";
import { useArcade } from "@/hooks/arcade";
import { useUsernames } from "@/hooks/account";
import { addAddressPadding } from "starknet";

const SESSION_MAX_BREAK = 3600 * 1000; // 1 hour
const LIMIT = 2000;

export type Discover = {
  identifier: string;
  project: string;
  callerAddress: string;
  contractAddress: string;
  transactionHash: string;
  entrypoint: string;
  timestamp: number;
  count: number;
};

export type DiscoversContextType = {
  discovers: { [key: string]: Discover[] };
  aggregates: { [key: string]: Discover[] };
  usernames: { [key: string]: string | undefined };
  status: "success" | "error" | "idle" | "loading";
};

export const DiscoversContext = createContext<DiscoversContextType | null>(
  null,
);

export function DiscoversProvider({ children }: { children: ReactNode }) {
  const { projects: slots } = useArcade();
  const [activities, setDiscovers] = useState<{ [key: string]: Discover[] }>(
    {},
  );

  const addresses = useMemo(() => {
    const addresses = Object.values(activities).flatMap((activity) =>
      activity.map((activity) => activity.callerAddress),
    );
    const uniqueAddresses = [...new Set(addresses)];
    return uniqueAddresses;
  }, [activities]);

  const { usernames } = useUsernames({ addresses });
  const usernamesData = useMemo(() => {
    const data: { [key: string]: string | undefined } = {};
    addresses.forEach((address) => {
      data[addAddressPadding(address)] = usernames.find(
        (username) => BigInt(username.address || "0x0") === BigInt(address),
      )?.username;
    });
    return data;
  }, [usernames, addresses]);

  const projects = useMemo(() => {
    return slots.map((slot) => {
      return {
        project: slot.project,
        address: "",
        limit: LIMIT,
      };
    });
  }, [slots]);

  const { status } = useActivitiesQuery(
    {
      projects: projects,
    },
    {
      queryKey: ["activities", projects],
      enabled: projects.length > 0,
      refetchInterval: 30 * 1000, // 30 seconds
      onSuccess: ({ activities }) => {
        const newDiscovers: { [key: string]: Discover[] } = {};
        activities?.items.forEach((item) => {
          const project = item.meta.project;
          newDiscovers[project] = item.activities.map((activity) => {
            return {
              identifier: activity.transactionHash,
              project: project,
              callerAddress: activity.callerAddress,
              contractAddress: activity.contractAddress,
              transactionHash: activity.transactionHash,
              entrypoint: activity.entrypoint,
              timestamp: new Date(activity.executedAt).getTime(),
              count: 1,
            };
          });
        });
        setDiscovers(newDiscovers);
      },
    },
  );

  const aggregates: { [key: string]: Discover[] } = useMemo(() => {
    const result: { [key: string]: Discover[] } = {};
    Object.entries(activities).forEach(([project, events]) => {
      const history: { [address: string]: { time: number; index: number } } =
        {};
      const aggregates: Discover[] = [];
      events.forEach((activity) => {
        const last = history[activity.callerAddress];
        const currentTime = activity.timestamp;
        const deltaTime = !last?.time
          ? SESSION_MAX_BREAK
          : last.time > currentTime
            ? last.time - currentTime
            : currentTime - last.time;
        if (deltaTime < SESSION_MAX_BREAK) {
          history[activity.callerAddress].time = currentTime;
          aggregates[last.index].count += activity.count;
          aggregates[last.index].identifier = activity.identifier;
        } else {
          history[activity.callerAddress] = {
            time: currentTime,
            index: aggregates.length,
          };
          aggregates.push({ ...activity });
        }
      });
      result[project] = aggregates;
    });
    return result;
  }, [activities]);

  return (
    <DiscoversContext.Provider
      value={{
        discovers: activities,
        aggregates,
        usernames: usernamesData,
        status,
      }}
    >
      {children}
    </DiscoversContext.Provider>
  );
}
