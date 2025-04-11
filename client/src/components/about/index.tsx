import Details from "./details";
import Media from "./media";
import Metrics from "./metrics";
import { GameModel } from "@bal7hazar/arcade-sdk";

export function About({ game }: { game: GameModel }) {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Media
        videos={game.socials.videos ?? []}
        images={game.socials.images ?? []}
      />
      <Details content={game.metadata.description || ""} />
      <Metrics />
    </div>
  );
}
