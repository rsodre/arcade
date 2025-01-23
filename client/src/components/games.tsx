import { JoystickIcon, ScrollArea, SparklesIcon, cn } from "@cartridge/ui-next";
import { useCallback, useState } from "react";
import { useTheme } from "@/hooks/context";
import {
  ControllerTheme,
  controllerConfigs as configs,
} from "@cartridge/controller";
import { useArcade } from "@/hooks/arcade";

export const Games = () => {
  const [selected, setSelected] = useState(0);
  const { games } = useArcade();

  return (
    <div className="flex flex-col gap-y-px w-[324px] rounded-lg pb-8 grow overflow-y-auto h-[661px]">
      <Game
        index={0}
        preset="default"
        name="All"
        icon=""
        points={Object.values(games).reduce((acc, game) => acc + game.karma, 0)}
        active={selected === 0}
        setSelected={setSelected}
      />
      <ScrollArea className="overflow-auto">
        {Object.values(games).map((game, index) => (
          <Game
            key={`${game.worldAddress}-${game.namespace}`}
            index={index + 1}
            preset={game.preset ?? "default"}
            name={game.metadata.name}
            icon={game.metadata.image}
            points={game.karma}
            active={selected === index + 1}
            setSelected={setSelected}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export const Game = ({
  index,
  preset,
  name,
  icon,
  points,
  active,
  setSelected,
}: {
  index: number;
  preset: string;
  name: string;
  icon: string;
  points: number;
  active: boolean;
  setSelected: (index: number) => void;
}) => {
  const { theme, setTheme, resetTheme } = useTheme();

  const handleClick = useCallback(() => {
    setSelected(index);
    const config = configs[preset.toLowerCase()].theme;
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
  }, [index, theme, setSelected, setTheme]);

  return (
    <div
      className={cn(
        "flex justify-between items-center p-2 hover:opacity-[0.8] hover:cursor-pointer",
        active ? "bg-quaternary" : "bg-secondary",
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-2">
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
      <GamePoints points={points} />
    </div>
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

export const GamePoints = ({ points }: { points: number }) => {
  if (points === 0) return null;
  return (
    <div className="flex justify-between items-center gap-x-2 px-2 py-1.5 text-accent-foreground text-md">
      <SparklesIcon className="h-5 w-5" size={"xs"} variant="line" />
      <p className="text-sm">{points}</p>
    </div>
  );
};
