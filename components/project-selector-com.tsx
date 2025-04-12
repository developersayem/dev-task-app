import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthProvider";
import IProject from "@/interfaces/IProject";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import useSWR from "swr";

interface ProjectSelectorProps {
  setSelectedProject: React.Dispatch<React.SetStateAction<IProject | null>>;
}

const ProjectSelectorCom: React.FC<ProjectSelectorProps> = ({
  setSelectedProject,
}) => {
  const { user } = useAuth();
  const {
    data: projects = [],
    error,
    isLoading,
  } = useSWR<IProject[]>(
    user?._id ? `/api/v1/projects/by-user/${user?._id}` : null,
    fetcher
  );

  const handleSelectProject = (selectedId: string) => {
    const selectedProject = projects.find((p) => p._id === selectedId);
    if (selectedProject) {
      setSelectedProject(selectedProject);
    }
  };

  if (error) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        Error loading projects.
      </div>
    );
  }

  return (
    <Select onValueChange={handleSelectProject}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Project" className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin w-6 h-6 text-muted-foreground" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          projects.map((project) => (
            <SelectItem key={project.name} value={project._id as string}>
              {project.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default ProjectSelectorCom;
