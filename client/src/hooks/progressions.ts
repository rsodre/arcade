import { useCallback, useEffect, useMemo, useState } from "react";
import { Project, useProgressionsQuery } from "@cartridge/utils/api/cartridge";
import { Progress, RawProgress, getSelectorFromTag } from "@/models";
import { TrophiesProps } from "./trophies";

interface Response {
  items: { meta: { project: string }; achievements: RawProgress[] }[];
}

export function useProgressions({
  props,
  parser,
}: {
  props: TrophiesProps[];
  parser: (node: RawProgress) => Progress;
}) {
  const [rawProgressions, setRawProgressions] = useState<{
    [key: string]: { [key: string]: Progress };
  }>({});
  const [progressions, setProgressions] = useState<{
    [key: string]: { [key: string]: Progress };
  }>({});

  // Fetch achievement creations from raw events
  const projects: Project[] = useMemo(() => {
    return props.map(({ namespace, name, project }) => ({
      model: getSelectorFromTag(namespace, name),
      namespace,
      project,
    }));
  }, [props]);

  const onSuccess = useCallback(
    ({ playerAchievements }: { playerAchievements: Response }) => {
      if (!playerAchievements.items) return;
      const progressions: { [key: string]: { [key: string]: Progress } } = {};
      playerAchievements.items.forEach((item) => {
        const project = item.meta.project;
        const achievements = item.achievements
          .map(parser)
          .reduce((acc: { [key: string]: Progress }, achievement: Progress) => {
            acc[achievement.key] = achievement;
            return acc;
          }, {});
        progressions[project] = achievements;
      });
      setRawProgressions(progressions);
    },
    [parser, setRawProgressions],
  );

  const { refetch: fetchProgressions, isFetching } = useProgressionsQuery(
    {
      projects,
    },
    {
      enabled: props.length > 0,
      queryKey: ["progressions", props],
      refetchInterval: 600_000, // Refetch every 10 minutes
      onSuccess,
      onError: onSuccess,
    },
  );

  useEffect(() => {
    if (props.length === 0) return;
    try {
      fetchProgressions();
    } catch (error) {
      // Could happen if the indexer is down or wrong url
      console.error(error);
    }
  }, [props, fetchProgressions]);

  useEffect(() => {
    if (isFetching) return;
    setProgressions(rawProgressions);
  }, [rawProgressions, isFetching]);

  return { progressions };
}
