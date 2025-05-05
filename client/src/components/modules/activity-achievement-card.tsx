import {
  cn,
  SparklesIcon,
  Thumbnail,
  ThumbnailsSubIcon,
  TrophyIcon,
  ActivityCard,
  ActivitySocialWebsite,
  activityCardVariants,
} from "@cartridge/ui-next";
import { VariantProps } from "class-variance-authority";
import { useMemo, useState } from "react";

export interface ActivityAchievementCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityCardVariants> {
  title: string;
  topic: string;
  points: number;
  website: string;
  image: string;
  color?: string;
  error?: boolean;
  loading?: boolean;
  certified?: boolean;
  className?: string;
}

export const ActivityAchievementCard = ({
  title,
  topic,
  points,
  website,
  image,
  color,
  error,
  loading,
  certified,
  variant,
  className,
  ...props
}: ActivityAchievementCardProps) => {
  const [hover, setHover] = useState(false);

  const Icon = useMemo(
    () => (
      <TrophyIcon
        className="w-full h-full text-foreground-100"
        variant="solid"
      />
    ),
    [],
  );

  const Logo = useMemo(
    () => (
      <div
        className={cn(
          "text-inherit",
          !error && !loading && !color && "text-primary",
        )}
        style={{ color }}
      >
        <Thumbnail
          icon={image}
          subIcon={
            <ThumbnailsSubIcon
              variant={hover ? "lighter" : "light"}
              Icon={Icon}
            />
          }
          error={error}
          loading={loading}
          size="lg"
          variant={hover ? "lighter" : "light"}
          className={cn(
            "text-inherit",
            !error && !loading && !color && "text-primary",
          )}
        />
      </div>
    ),
    [image, error, loading, hover, Icon, color],
  );

  const Social = useMemo(() => {
    return <ActivitySocialWebsite website={website} certified={certified} />;
  }, [website, certified]);

  const Points = useMemo(() => {
    return (
      <div className="flex items-center gap-1 text-inherit">
        <SparklesIcon variant="solid" size="xs" />
        <span>{points}</span>
      </div>
    );
  }, [points]);

  return (
    <ActivityCard
      Logo={Logo}
      title={title}
      subTitle={Social}
      topic={topic}
      subTopic={Points}
      error={error}
      loading={loading}
      variant={variant}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    />
  );
};

export default ActivityAchievementCard;
