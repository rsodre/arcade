import { useMemo } from "react";
import { useAtomValue } from "@effect-atom/atom-react";
import { editionsAtom } from "@/effect/atoms";
import { unwrapOr } from "@/effect/utils/result";
import { useProject } from "./project";
import { useAddress } from "./address";
import { useCollectibles, type Collection } from "@/hooks/token-fetcher";
import { DEFAULT_PROJECT } from "@/constants";

export const useCollections = () => {
  const { edition } = useProject();
  const { address } = useAddress();

  const editionsResult = useAtomValue(editionsAtom);
  const editions = unwrapOr(editionsResult, []);

  const projects = useMemo(
    () => [DEFAULT_PROJECT, ...editions.map((ed) => ed.config.project)],
    [editions],
  );

  const { collections: allCollections, status } = useCollectibles(
    projects,
    address,
  );

  const collections = useMemo(() => {
    const collections = [...allCollections];
    collections.forEach((collection: Collection) => {
      const projects = [...collection.projects];
      if (projects.length > 1 && projects[0] === "arcade-main") {
        projects.shift();
      }
      collection.iconUrl =
        editions.find((ed) => ed.config.project === projects[0])?.properties
          .icon ?? undefined;
    });
    return !edition
      ? collections
      : collections.filter((collection: Collection) =>
          collection.projects.includes(edition.config.project),
        );
  }, [edition, allCollections]);

  return { collections, status };
};
