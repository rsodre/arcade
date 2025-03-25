import { ArcadeGameSelect, CardListContent, cn } from "@cartridge/ui-next";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "@/hooks/context";
import {
  ControllerTheme,
  controllerConfigs as configs,
} from "@cartridge/controller";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { usePlayerGameStats, usePlayerStats } from "@/hooks/achievements";
import { Register } from "./register";
import { GameModel } from "@bal7hazar/arcade-sdk";
import { useAccount } from "@starknet-react/core";

export const Games = () => {
  const [selected, setSelected] = useState(0);
  const { address } = useAccount();
  const { games } = useArcade();

  return (
    <div
      className="flex flex-col gap-y-px min-w-[324px] h-full overflow-clip pb-6"
      style={{ scrollbarWidth: "none" }}
    >
      <Game
        index={0}
        first={true}
        project=""
        namespace=""
        preset="default"
        name="All"
        icon=""
        active={selected === 0}
        setSelected={setSelected}
      />
      <CardListContent
        className="p-0 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {games.map((game, index) => (
          <Game
            key={`${game.worldAddress}-${game.namespace}`}
            index={index + 1}
            first={false}
            project={game.config.project}
            namespace={game.namespace}
            preset={game.metadata.preset ?? "default"}
            name={game.metadata.name}
            icon={game.metadata.image}
            cover={game.metadata.banner}
            active={selected === index + 1}
            game={game}
            address={address}
            setSelected={setSelected}
          />
        ))}
      </CardListContent>
      <Register />
    </div>
  );
};

export const Game = ({
  index,
  first,
  project,
  namespace,
  preset,
  name,
  icon,
  cover,
  active,
  game,
  address,
  setSelected,
}: {
  index: number;
  first: boolean;
  project: string;
  namespace: string;
  preset: string;
  name: string;
  icon: string;
  cover?: string;
  active: boolean;
  game?: GameModel;
  address?: string;
  setSelected: (index: number) => void;
}) => {
  const { earnings: totalEarnings } = usePlayerStats();
  const { earnings: gameEarnings } = usePlayerGameStats(project);
  const { theme, setTheme, resetTheme, setCover, resetCover } = useTheme();
  const {
    project: currentProject,
    namespace: currentNamespace,
    setProject,
    setNamespace,
  } = useProject();

  const handleClick = useCallback(() => {
    setSelected(index);
    if (currentProject !== project || currentNamespace !== namespace) {
      setProject(project);
      setNamespace(namespace);
    }
    const config = configs[preset.toLowerCase()]?.theme;
    if (!config || !config.colors) {
      resetTheme();
      resetCover();
      return;
    }
    const newTheme: ControllerTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primary: config.colors.primary,
      },
    };
    setTheme(newTheme);
    setCover(cover);
  }, [
    index,
    project,
    namespace,
    cover,
    currentProject,
    currentNamespace,
    theme,
    setSelected,
    setTheme,
    setProject,
    setCover,
  ]);
  const isOwner = useMemo(() => {
    return BigInt(game?.owner || "0x0") === BigInt(address || "0x0");
  }, [game, address]);

  return (
    <div className={cn("flex gap-px", first && "rounded-t overflow-clip")}>
      <ArcadeGameSelect
        name={name}
        logo={icon}
        cover={cover}
        points={project ? gameEarnings : totalEarnings}
        active={active}
        onClick={handleClick}
        className="grow"
      />
      {isOwner && !!game && <Register game={game} />}
    </div>
  );
};
