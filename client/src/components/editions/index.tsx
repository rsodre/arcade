import { useCallback, useMemo } from "react";
import { useArcade } from "@/hooks/arcade";
import { useNavigate } from "react-router-dom";
import { Register } from "./register";
import { EditionModel, GameModel } from "@bal7hazar/arcade-sdk";
import EditionActions from "../modules/edition-actions";
import EditionAction from "../modules/edition-item";
import { useProject } from "@/hooks/project";
import { useOwnerships } from "@/hooks/ownerships";
import { useAccount } from "@starknet-react/core";

export const Editions = () => {
  const { address } = useAccount();
  const { games, editions } = useArcade();
  const { gameId, namespace, project } = useProject();
  const { ownerships } = useOwnerships();

  const game: GameModel | undefined = useMemo(() => {
    return games.find((game) => game.id === gameId);
  }, [games, gameId]);

  const edition: EditionModel | undefined = useMemo(() => {
    if (editions.length === 0) return undefined;
    return editions.find(
      (edition) =>
        edition.namespace === namespace && edition.config.project === project,
    );
  }, [editions, namespace, project]);

  const owner = useMemo(() => {
    if (!edition) return false;
    const ownership = ownerships.find(
      (ownership) => ownership.tokenId === BigInt(edition.id),
    );
    if (!ownership) return false;
    return BigInt(ownership.accountAddress) === BigInt(address || "0x0");
  }, [edition, ownerships, address]);

  const gameEditions = useMemo(() => {
    if (!game) return [];
    return editions.filter((edition) => edition.gameId === game.id);
  }, [editions, game]);

  const certifieds: { [key: string]: boolean } = useMemo(() => {
    if (!game) return {};
    const gameOwnership = ownerships.find(
      (ownership) => ownership.tokenId === BigInt(game.id),
    );
    if (!gameOwnership) return {};
    const values: { [key: string]: boolean } = {};
    gameEditions.forEach((edition) => {
      const ownership = ownerships.find(
        (ownership) => ownership.tokenId === BigInt(edition.id),
      );
      if (!ownership) return;
      values[edition.id] =
        gameOwnership.accountAddress == ownership.accountAddress;
    });
    return values;
  }, [gameEditions, game]);

  const navigate = useNavigate();
  const onClick = useCallback(
    (id: number) => {
      // Update the url params
      const url = new URL(window.location.href);
      url.searchParams.set("edition", id.toString());
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  if (!game) return null;

  return (
    <div className="flex items-stretch gap-2 h-8">
      <EditionActions
        disabled={gameEditions.length < 2}
        label={edition?.name || ""}
        certified={certifieds[BigInt(edition?.id || 0).toString()]}
      >
        {gameEditions.map((item) => (
          <EditionAction
            key={item?.id}
            active={item.id === edition?.id}
            label={item.name}
            certified={certifieds[BigInt(item.id).toString()]}
            onClick={() => onClick(item.id)}
          />
        ))}
      </EditionActions>
      {owner && !!edition && (
        <Register key={edition.id} game={game} edition={edition} />
      )}
      <Register key={game.id} game={game} />
    </div>
  );
};
