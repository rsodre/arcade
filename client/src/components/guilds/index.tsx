import { EmptyStateGuildIcon } from "@cartridge/ui-next";
import banner from "/public/banner.svg";
import { useEffect, useState } from "react";

export function Guilds() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = banner;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="select-none flex flex-col justify-center items-center gap-3 grow border border-spacer-100 rounded-lg overflow-hidden pt-[135px]">
      <EmptyStateGuildIcon className="h-1/2 w-1/5" />
      <p className="text-xl text-background-500">
        Guilds feature is coming soon
      </p>
      <img
        draggable={false}
        className={`opacity-0 transition-opacity ${isLoaded ? "opacity-50" : ""}`}
        style={{ transitionDuration: "1000ms" }}
        src={banner}
      />
    </div>
  );
}
