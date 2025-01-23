import { createContext, useState, ReactNode, useMemo } from "react";

type ProjectContextType = {
  isReady: boolean;
  indexerUrl: string;
  setProject: (project: string) => void;
};

const initialState: ProjectContextType = {
  isReady: false,
  indexerUrl: "",
  setProject: () => {},
};

export const ProjectContext = createContext<ProjectContextType>(initialState);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<string>("arcade");

  const indexerUrl = useMemo(() => {
    if (!project) return "";
    return `${import.meta.env.VITE_CARTRIDGE_API_URL.replace("cartridge", project)}/torii`;
  }, [project]);

  const isReady = useMemo(() => {
    return !!indexerUrl;
  }, [indexerUrl]);

  return (
    <ProjectContext.Provider value={{ isReady, indexerUrl, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
