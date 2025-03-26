import { AchievementPlayerHeader } from "@cartridge/ui-next";
import { useMemo } from "react";

export const PlayerHeader = ({
  username,
  address,
  points,
  banner,
}: {
  username: string;
  address: string;
  points: number;
  rank: number;
  banner: string;
}) => {
  const style = useMemo(() => {
    const bgColor = `var(--background-100)`;
    const opacity = "88%";
    const image = banner ? `url(${banner})` : "var(--theme-cover-url)";
    return {
      backgroundImage: `linear-gradient(to top,${bgColor},color-mix(in srgb, ${bgColor} ${opacity}, transparent)),${image}`,
    };
  }, [banner]);

  return (
    <div
      className="p-4 pb-0 bg-top bg-cover bg-no-repeat select-none"
      style={style}
    >
      <AchievementPlayerHeader
        username={username}
        address={address}
        points={points}
      />
    </div>
  );
};
