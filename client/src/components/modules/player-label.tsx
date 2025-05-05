import {
  CopyAddress,
  BronzeTagIcon,
  GoldTagIcon,
  SilverTagIcon,
  AchievementPlayerBadge,
  cn,
} from "@cartridge/ui-next";
import { cva, VariantProps } from "class-variance-authority";
import { useMemo } from "react";

export interface AchievementPlayerLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof achievementPlayerLabelVariants> {
  username: string;
  address: string;
  icon?: React.ReactNode;
}

const achievementPlayerLabelVariants = cva("flex items-center gap-x-4", {
  variants: {
    variant: {
      darkest: "",
      darker: "",
      dark: "",
      default: "",
      light: "",
      lighter: "",
      lightest: "",
      ghost: "",
    },
    rank: {
      default: "",
      gold: "",
      silver: "",
      bronze: "",
    },
  },
  defaultVariants: {
    variant: "default",
    rank: "default",
  },
});

export const AchievementPlayerLabel = ({
  username,
  address,
  icon,
  variant,
  rank,
  className,
  ...props
}: AchievementPlayerLabelProps) => {
  const TagIcon = useMemo(() => {
    switch (rank) {
      case "gold":
        return <GoldTagIcon size="sm" />;
      case "silver":
        return <SilverTagIcon size="sm" />;
      case "bronze":
        return <BronzeTagIcon size="sm" />;
      case "default":
      default:
        return null;
    }
  }, [rank]);

  return (
    <div
      className={cn(achievementPlayerLabelVariants({ variant }), className)}
      {...props}
    >
      <AchievementPlayerBadge
        icon={icon}
        variant={variant}
        rank={rank}
        size="2xl"
      />
      <div className="flex flex-col gap-y-0.5 justify-between h-12">
        <div className="flex items-center gap-x-2">
          <p className="text-xl/[22px] font-semibold text-foreground-100">
            {username}
          </p>
          {TagIcon}
        </div>
        <div className="bg-background-150 border border-background-200">
          <CopyAddress address={address} size="xs" className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default AchievementPlayerLabel;
