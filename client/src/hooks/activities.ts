import { useContext, useMemo } from "react";
import { useProject } from "./project";
import { ActivitiesContext } from "@/context";

/**
 * Custom hook to access the Activities context and account information.
 * Must be used within a ActivitiesProvider component.
 *
 * @returns An object containing:
 * - activities: The registered activities
 * - status: The status of the activities
 * @throws {Error} If used outside of a ActivitiesProvider context
 */
export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  const { project } = useProject();

  if (!context) {
    throw new Error(
      "The `useActivities` hook must be used within a `ActivitiesProvider`",
    );
  }

  const { activities: allActivities, usernames, status } = context;

  const activities = useMemo(() => {
    if (!project)
      return Object.values(allActivities).flatMap((activities) => activities);
    return allActivities[project];
  }, [project, allActivities]);

  return { allActivities, usernames, activities, status };
};
