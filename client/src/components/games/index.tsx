import {
  CardContent,
  CardListContent,
  JoystickIcon,
  ScrollArea,
  SparklesIcon,
  cn,
} from "@cartridge/ui-next";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "@/hooks/context";
import {
  ControllerTheme,
  controllerConfigs as configs,
} from "@cartridge/controller";
import { useArcade } from "@/hooks/arcade";
import { useProject } from "@/hooks/project";
import { usePlayerGameStats, usePlayerStats } from "@/hooks/achievements";

export const Games = () => {
  const [selected, setSelected] = useState(0);
  const { games } = useArcade();

  const sortedGames = useMemo(() => {
    return Object.values(games).sort((a, b) =>
      a.metadata.name.localeCompare(b.metadata.name),
    );
  }, [games]);

  return (
    <div className="flex flex-col gap-y-px w-[324px] rounded-lg grow overflow-y-auto max-h-[661px]">
      <Game
        index={0}
        project=""
        namespace=""
        preset="default"
        name="All"
        icon=""
        active={selected === 0}
        setSelected={setSelected}
      />
      <ScrollArea className="overflow-auto">
        <CardListContent>
          {sortedGames.map((game, index) => (
            <Game
              key={`${game.worldAddress}-${game.namespace}`}
              index={index + 1}
              project={game.project}
              namespace={game.namespace}
              preset={game.preset ?? "default"}
              name={game.metadata.name}
              icon={game.metadata.image}
              cover={game.metadata.banner}
              active={selected === index + 1}
              setSelected={setSelected}
            />
          ))}
        </CardListContent>
      </ScrollArea>
    </div>
  );
};

export const Game = ({
  index,
  project,
  namespace,
  preset,
  name,
  icon,
  cover,
  active,
  setSelected,
}: {
  index: number;
  project: string;
  namespace: string;
  preset: string;
  name: string;
  icon: string;
  cover?: string;
  active: boolean;
  setSelected: (index: number) => void;
}) => {
  const { earnings: totalEarnings } = usePlayerStats();
  const { earnings: gameEarnings } = usePlayerGameStats(project);
  const { theme, setTheme, resetTheme } = useTheme();
  const { setProject, setNamespace } = useProject();

  const handleClick = useCallback(() => {
    setSelected(index);
    setProject(project);
    setNamespace(namespace);
    const config = configs[preset.toLowerCase()]?.theme;
    if (!config || !config.colors) {
      return resetTheme();
    }
    const newTheme: ControllerTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primary: config.colors.primary,
      },
    };
    setTheme(newTheme);
  }, [index, project, namespace, theme, setSelected, setTheme, setProject]);

  return (
    <CardContent
      className={cn(
        "relative flex justify-between items-center hover:opacity-[0.8] hover:cursor-pointer p-0",
        !cover && (active ? "bg-quaternary" : "bg-secondary"),
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute bg-cover bg-center flex h-full w-full place-content-center overflow-hidden  z-10",
          active ? "opacity-20" : "opacity-5",
        )}
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="flex items-center gap-x-2 p-2 z-20">
        <div
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-md",
            active ? "bg-quinary" : "bg-quaternary",
          )}
        >
          <GameIcon name={name} icon={icon} />
        </div>
        <p className="text-sm">{name}</p>
      </div>
      <div className="z-20">
        <GamePoints points={gameEarnings || totalEarnings} active={active} />
      </div>
    </CardContent>
  );
};

export const GameIcon = ({ name, icon }: { name: string; icon: string }) => {
  const [imageError, setImageError] = useState(false);
  return imageError ? (
    <JoystickIcon className="h-5 w-5" size="xs" variant="solid" />
  ) : (
    <img
      src={icon}
      alt={name}
      className="h-7 w-7 object-contain"
      onError={() => setImageError(true)}
    />
  );
};

export const GamePoints = ({
  points,
  active,
}: {
  points: number;
  active: boolean;
}) => {
  if (points === 0) return null;
  return (
    <div className="flex justify-between items-center gap-x-2 px-2 py-1.5 text-accent-foreground text-md">
      <SparklesIcon
        className="h-5 w-5"
        size={"xs"}
        variant={active ? "solid" : "line"}
      />
      <p className="text-sm">{points}</p>
    </div>
  );
};
