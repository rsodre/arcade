import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@cartridge/ui-next";
import {
  ArcadeDiscoveryEvent,
  ArcadeDiscoveryEventProps,
} from "./discovery-event";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

interface ArcadeDiscoveryGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof arcadeDiscoveryGroupVariants> {
  events: ArcadeDiscoveryEventProps[];
  loading?: boolean;
  rounded?: boolean;
  animated?: boolean;
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
  animated,
  variant,
  className,
  onClick,
}: ArcadeDiscoveryGroupProps) => {
  const [isAnimated, setIsAnimated] = useState(animated);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (animated) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsAnimated(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsAnimated(false);
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef, animated]);

  return (
    <div
      data-rounded={rounded}
      className={cn(arcadeDiscoveryGroupVariants({ variant }), className)}
    >
      <AnimatePresence initial={false}>
        {events.map((event) => (
          <motion.div
            className={cn(isAnimated ? "block" : "hidden")}
            key={event.identifier}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
        {events.map((event, index) => (
          <div className={cn(isAnimated ? "hidden" : "block")} key={index}>
            <ArcadeDiscoveryEvent
              loading={loading}
              className={className}
              variant={variant}
              onClick={onClick}
              {...event}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
