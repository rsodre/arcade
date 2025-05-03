import { cn } from "@cartridge/ui-next";
import {
  ArcadeDiscoveryEvent,
  ArcadeDiscoveryEventProps,
} from "./discovery-event";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface ArcadeDiscoveryGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof arcadeDiscoveryGroupVariants> {
  events: ArcadeDiscoveryEventProps[];
  loading?: boolean;
  rounded?: boolean;
}

export const arcadeDiscoveryGroupVariants = cva(
  "select-none flex flex-col gap-y-px data-[rounded=true]:rounded data-[rounded=true]:overflow-hidden",
  {
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
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const ArcadeDiscoveryGroup = ({
  events,
  loading,
  rounded,
  variant,
  className,
  onClick,
}: ArcadeDiscoveryGroupProps) => {
  return (
    <div
      data-rounded={rounded}
      className={cn(arcadeDiscoveryGroupVariants({ variant }), className)}
    >
      {events.map((event, index) => (
        <ArcadeDiscoveryEvent
          key={`${event.name}-${event.timestamp}-${index}`}
          loading={loading}
          className={className}
          variant={variant}
          onClick={onClick}
          {...event}
        />
      ))}
    </div>
  );
};
