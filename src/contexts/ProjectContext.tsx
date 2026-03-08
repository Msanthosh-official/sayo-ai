import { createContext, useContext, useState, ReactNode } from "react";

interface Project {
  id: string;
  name: string;
  prompt: string;
  html: string;
  pages: { name: string; html: string }[];
  publishedUrl: string | null;
  deployedUrl: string | null;
  createdAt: Date;
}

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (p: Project | null) => void;
  projects: Project[];
  addProject: (p: Project) => void;
}

const ProjectContext = createContext<ProjectContextType>({
  currentProject: null,
  setCurrentProject: () => {},
  projects: [],
  addProject: () => {},
});

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (p: Project) => {
    setProjects(prev => {
      const existing = prev.findIndex(x => x.id === p.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = p;
        return updated;
      }
      return [p, ...prev];
    });
  };

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject, projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
export type { Project };
