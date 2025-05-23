import { cn } from "@cartridge/ui-next";
import { HTMLAttributes, SVGProps } from "react";
import { SidebarToggle } from "../sidebar-toggle";
import { useMediaQuery } from "@cartridge/ui-next";

export interface ArcadeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ArcadeHeader = ({
  children,
  onClick,
  ...props
}: ArcadeHeaderProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      className={cn(
        "w-full flex items-center gap-x-px h-16 lg:h-14",
        "transition-transform duration-300 ease-in-out will-change-transform",
      )}
      {...props}
    >
      {isMobile ? (
        <div className="lg:hidden">
          <SidebarToggle />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center text-primary w-14",
            onClick && "cursor-pointer",
          )}
          onClick={onClick}
        >
          <ArcadeIcon className="w-8 h-8 transition-colors duration-300" />
        </div>
      )}
      <div className="grow flex justify-end items-center gap-2 lg:px-3 py-2 select-none">
        {children}
      </div>
    </div>
  );
};

export const ArcadeIcon = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg className={cn(className)} {...props} viewBox="0 0 32 32">
      <path
        d="M7.06539 4.17203L7.05745 4.172C6.89087 4.17133 6.52092 4.16985 6.13654 4.27165C5.62515 4.4071 5.21663 4.67668 4.87951 5.012L3.02479 6.84495L3.01875 6.85098C2.16931 7.69831 2.17119 8.66122 2.17192 9.03517L2.17197 9.06841V22.9425L2.17192 22.9757C2.17119 23.3497 2.16931 24.3126 3.01875 25.1599L3.024 25.1651L3.0248 25.1659L4.87682 26.9962L4.87824 26.9976L4.87959 26.999C5.21682 27.3346 5.62486 27.6037 6.13654 27.7393C6.52091 27.8411 6.89086 27.8396 7.05744 27.8389L7.06539 27.8389L7.09882 27.8388H13.2999L13.3008 25.4077H19.3216V27.8388H25.634L25.6674 27.8389L25.6754 27.8389C25.842 27.8396 26.2119 27.8411 26.5963 27.7393C27.1079 27.6037 27.5161 27.3344 27.8534 26.9989L27.8546 26.9976L27.856 26.9962L29.708 25.1659C30.564 24.32 30.5618 23.3479 30.5609 22.9775L30.5609 22.9425V9.06841L30.5609 9.03343C30.5618 8.66304 30.564 7.69089 29.708 6.84497L27.856 5.01467L27.8546 5.01327L27.8532 5.0119C27.516 4.67633 27.1079 4.40717 26.5963 4.27165C26.2119 4.16985 25.842 4.17133 25.6754 4.172L25.6674 4.17203L25.634 4.17212H7.09882L7.06539 4.17203Z"
        fill="black"
        fillOpacity="0.08"
      />
      <path
        d="M21.159 21.1381C21.159 20.8898 21.1565 18.6845 21.1565 18.7074H23.6321V21.1381H21.159Z"
        className="fill-current"
      />
      <path
        d="M11.4636 21.1381H8.99056C8.99056 20.8898 8.98812 18.6845 8.98812 18.7074H11.4636V21.1381Z"
        className="fill-current"
      />
      <path
        d="M11.5 12.2502H21.1978V14.6809H11.5024C11.5024 14.4326 11.5 12.2273 11.5 12.2502Z"
        className="fill-current"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.09352 6H25.6287C26.0147 6 26.248 6 26.5562 6.30743L28.414 8.1435C28.7222 8.44808 28.7222 8.75552 28.7222 9.06295V22.937C28.7222 23.2445 28.7222 23.5519 28.414 23.8565L26.5562 25.6926C26.248 26 26.0147 26 25.6287 26H21.1497V23.5689H11.4629L11.4619 26H7.09352C6.70755 26 6.47424 26 6.16604 25.6926L4.3082 23.8565C4 23.5491 4 23.2445 4 22.937V9.06295C4 8.75552 4 8.45093 4.3082 8.1435L6.16604 6.30743C6.47424 6 6.70755 6 7.09352 6ZM26.248 8.75552C26.248 8.75552 26.248 8.44808 25.9398 8.44808H6.78532C6.47712 8.44808 6.47712 8.75552 6.47712 8.75552V23.2445C6.47712 23.2445 6.47712 23.5519 6.78532 23.5519H11.4612C11.4615 23.3471 11.4636 21.3723 11.4636 21.1381H21.159V23.5519H25.9398C26.248 23.5519 26.248 23.2445 26.248 23.2445V8.75552Z"
        className="fill-current"
      />
    </svg>
  );
};

export default ArcadeHeader;
