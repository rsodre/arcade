import {
  cn,
  DiscordIcon,
  GitHubIcon,
  PlayIcon,
  TelegramIcon,
  XIcon,
} from "@cartridge/ui-next";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface GameSocialWebsiteProps
  extends VariantProps<typeof GameSocialVariants> {
  website: string;
}
export const GameSocialWebsite = ({
  website,
  variant,
}: GameSocialWebsiteProps) => {
  return (
    <GameSocial
      icon={<PlayIcon size="xs" />}
      href={website}
      label="Play"
      variant={variant}
      className="text-primary"
    />
  );
};

interface GameSocialDiscordProps
  extends VariantProps<typeof GameSocialVariants> {
  discord: string;
}
export const GameSocialDiscord = ({
  discord,
  variant,
}: GameSocialDiscordProps) => {
  return (
    <GameSocial
      icon={<DiscordIcon size="xs" />}
      href={discord}
      variant={variant}
    />
  );
};

interface GameSocialTwitterProps
  extends VariantProps<typeof GameSocialVariants> {
  twitter: string;
}
export const GameSocialTwitter = ({
  twitter,
  variant,
}: GameSocialTwitterProps) => {
  return (
    <GameSocial icon={<XIcon size="xs" />} href={twitter} variant={variant} />
  );
};

interface GameSocialGithubProps
  extends VariantProps<typeof GameSocialVariants> {
  github: string;
}
export const GameSocialGithub = ({
  github,
  variant,
}: GameSocialGithubProps) => {
  return (
    <GameSocial
      icon={<GitHubIcon size="xs" />}
      href={github}
      variant={variant}
    />
  );
};

interface GameSocialTelegramProps
  extends VariantProps<typeof GameSocialVariants> {
  telegram: string;
}
export const GameSocialTelegram = ({
  telegram,
  variant,
}: GameSocialTelegramProps) => {
  return (
    <GameSocial
      icon={<TelegramIcon size="xs" />}
      href={telegram}
      variant={variant}
    />
  );
};

const GameSocialVariants = cva(
  "flex items-center gap-x-1 rounded px-3 py-2 cursor-pointer text-foreground-100",
  {
    variants: {
      variant: {
        default: "bg-background-100 hover:bg-background-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface GameSocialProps
  extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof GameSocialVariants> {
  icon: React.ReactNode;
  href: string;
  label?: string;
}

const GameSocial = ({
  icon,
  href,
  label,
  variant,
  className,
}: GameSocialProps) => {
  return (
    <a
      href={href}
      draggable={false}
      target="_blank"
      className={cn(GameSocialVariants({ variant }), className)}
    >
      {icon}
      {label && (
        <p className="px-0.5 text-xs font-medium tracking-normal hidden sm:block">
          {label}
        </p>
      )}
    </a>
  );
};

export default GameSocial;
