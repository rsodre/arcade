import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@cartridge/ui-next";
import {
  ArcadeDiscoveryEvent,
  ArcadeDiscoveryEventProps,
} from "./discovery-event";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, useEffect, useState } from "react";

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
  const [duration, setDuration] = useState(0.1);

  useEffect(() => {
    setDuration(0.1);
    setTimeout(() => {
      setDuration(0.3);
    }, 100);
  }, [events]);
    
  return (
    <div
      data-rounded={rounded}
      className={cn(arcadeDiscoveryGroupVariants({ variant }), className)}
    >
      <AnimatePresence initial={false}>
        {events.map((event) => (
          <motion.div
            key={event.identifier}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration }}
            layout
          >
            <ArcadeDiscoveryEvent
              loading={loading}
              className={className}
              variant={variant}
              onClick={onClick}
              {...event}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
