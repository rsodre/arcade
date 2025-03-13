import { Header } from "@/components/header";
import banner from "@/assets/banner.svg";

export const SceneLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col items-center gap-y-px select-none h-screen overflow-clip"
      style={{ scrollbarWidth: "none" }}
    >
      <Header cover={banner} />
      {children}
    </div>
  );
};
