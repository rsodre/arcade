import { Header } from "@/components/header";
import { useMemo } from "react";
import pattern from "@/assets/cover-pattern.svg";

export const SceneLayout = ({ children }: { children: React.ReactNode }) => {
  const style = useMemo(() => {
    const bgColor = "var(--background-100)";
    return {
      background: `linear-gradient(to top, ${bgColor} 50%, transparent 100%)`,
    };
  }, []);

  return (
    <div
      className="h-screen overflow-clip"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundSize: "300px 300px",
        backgroundRepeat: "repeat",
        backgroundPosition: "90px 40px",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="flex flex-col items-center gap-y-px select-none h-full overflow-clip"
        style={style}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};
