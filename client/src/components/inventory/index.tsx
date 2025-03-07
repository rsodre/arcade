import { Collections } from "./collections";
import { Tokens } from "./tokens";

export const Inventory = () => {
  return (
    <div className="w-full">
      <Tokens />
      <Collections />
    </div>
  );
};
