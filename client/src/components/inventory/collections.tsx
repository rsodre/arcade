import { CollectibleAsset } from "@cartridge/ui-next";
import { Collection, useCollections } from "@/hooks/collection";
import { useArcade } from "@/hooks/arcade";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GameModel } from "@bal7hazar/arcade-sdk";
import placeholder from "@/assets/placeholder.svg";
import { useAccount } from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";

export const Collections = ({ game }: { game?: GameModel }) => {
  const { games } = useArcade();

  const projects = useMemo(() => {
    if (!game) return games.map((game) => game.project);
    return [game.project];
  }, [game, games]);

  const { collections, status } = useCollections({ projects: projects });

  switch (status) {
    case "loading":
    case "error": {
      return null;
    }
    default: {
      return (
        <div className="grid grid-cols-3 gap-4 place-items-center select-none">
          {collections.map((collection) => (
            <Item
              key={collection.address}
              collection={collection}
              projects={projects}
            />
          ))}
        </div>
      );
    }
  }
};

function Item({
  collection,
  projects,
}: {
  collection: Collection;
  projects: string[];
}) {
  const { connector } = useAccount();
  const [username, setUsername] = useState<string>("");

  const slot = useMemo(() => {
    return projects.find((project: string) =>
      collection.imageUrl.includes(project),
    );
  }, [projects, collection]);

  useEffect(() => {
    async function fetch() {
      try {
        const name = await (connector as ControllerConnector)?.username();
        if (!name) return;
        setUsername(name);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [connector]);

  const handleClick = useCallback(async () => {
    if (!username || !slot) return;
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) {
      console.error("Connector not initialized");
      return;
    }
    const path = `account/${username}/slot/${slot}/inventory/collection/${collection.address}?ps=${slot}`;
    console.log({ path });
    controller.openProfileAt(path);
  }, [collection.address, username, connector]);

  return (
    <div className="w-full aspect-square group select-none">
      <CollectibleAsset
        title={collection.name}
        image={collection.imageUrl || placeholder}
        count={collection.totalCount}
        onClick={handleClick}
      />
    </div>
  );
}
