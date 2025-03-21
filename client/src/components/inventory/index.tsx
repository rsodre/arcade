import { GameModel } from "@bal7hazar/arcade-sdk";
import { Collections } from "./collections";
import { Tokens } from "./tokens";

export const Inventory = ({ game }: { game?: GameModel }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Tokens />
      <Collections game={game} />
    </div>
  );
};
