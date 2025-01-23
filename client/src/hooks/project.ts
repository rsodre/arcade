import { useContext } from "react";
import { ProjectContext } from "../context/project";

/**
 * Custom hook to access the Project context and account information.
 * Must be used within a ProjectProvider component.
 *
 * @returns An object containing:
 * - indexer: The indexer url
 * @throws {Error} If used outside of a ProjectProvider context
 */
export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "The `useProject` hook must be used within a `ProjectProvider`",
    );
  }

  const { isReady, indexerUrl } = context;

  return { isReady, indexerUrl };
};

