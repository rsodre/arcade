import { useContext, useMemo } from "react";
import { TokenContext } from "../context/token";
import { useProject } from "./project";

/**
 * Custom hook to access the Token context and account information.
 * Must be used within a TokenProvider component.
 *
 * @returns An object containing:
 * - tokens: The registered tokens
 * - status: The status of the tokens
 * @throws {Error} If used outside of a TokenProvider context
 */
export const useTokens = () => {
  const context = useContext(TokenContext);
  const { project } = useProject();

  if (!context) {
    throw new Error(
      "The `useTokens` hook must be used within a `TokenProvider`",
    );
  }

  const { tokens: allTokens, status } = context;

  const tokens = useMemo(() => {
    if (!project) return allTokens;
    return allTokens.filter(
      (token) => token.metadata.project === project || !token.metadata.project,
    );
  }, [allTokens, project]);

  return { tokens, status };
};
