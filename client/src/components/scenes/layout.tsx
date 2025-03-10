import { Header } from "@/components/header";
const PLACEHOLDER =
  "https://static.cartridge.gg/presets/cartridge/cover-dark.png";

export const SceneLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col items-center gap-y-px select-none h-screen overflow-clip"
      style={{ scrollbarWidth: "none" }}
    >
      <Header cover={PLACEHOLDER} />
      {children}
    </div>
  );
};
