import { Collections } from "./collections";
import { Tokens } from "./tokens";

export const Inventory = () => {
  return (
    <div className="w-full flex flex-col gap-4 py-4 rounded">
      <Tokens />
      <Collections />
    </div>
  );
};
