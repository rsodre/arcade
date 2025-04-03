import { ArcadeIcon, cn } from "@cartridge/ui-next";
import { HTMLAttributes } from "react";

export interface ArcadeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ArcadeHeader = ({
  children,
  onClick,
  ...props
}: ArcadeHeaderProps) => {
  return (
    <div className="w-full flex gap-x-px h-14" {...props}>
      <div
        className={cn(
          "flex items-center justify-center bg-background-100 text-primary w-14",
          onClick && "cursor-pointer",
        )}
        onClick={onClick}
      >
        <ArcadeIcon className="w-8 h-8" />
      </div>
      <div className="grow flex justify-end items-center gap-2 px-3 py-2 select-none">
        {children}
      </div>
    </div>
  );
};

export default ArcadeHeader;
