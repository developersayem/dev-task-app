"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleOff,
  PlusCircle,
  Timer,
  Loader,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import StatusSelectorCom from "./status-selector-com";
import useSWR, { mutate } from "swr";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";
import { fetcher } from "@/utils/fetcher";

interface IProject {
  _id: string;
  user: string;
  name: string;
  status: "todo" | "in progress" | "done" | "backlog" | "cancelled";
  description: string;
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

// status icons
const statusIcon = (selectedProject: IProject | undefined, size: number) => {
  switch (selectedProject?.status) {
    case "todo":
      return <Circle size={size} />;
    case "in progress":
      return <CircleCheckBig size={size} />;
    case "done":
      return <CircleHelp size={size} />;
    case "backlog":
      return <Timer size={size} />;
    case "cancelled":
      return <CircleOff size={size} />;
    default:
      return null;
  }
};

export default function ProjectSwitcher({ className }: ProjectSwitcherProps) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<IProject>();
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("todo");
  const [description, setDescription] = React.useState("");

  // Load selected project from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("project");
    if (stored) {
      try {
        setSelectedProject(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse project from localStorage", e);
      }
    }
  }, []);

  // ✅ Corrected endpoint
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR(
    user?._id ? `/api/v1/projects/by-user/${user?._id}` : null,
    fetcher
  );

  async function createProject() {
    const projectData = {
      user,
      name,
      status,
      description,
    };

    try {
      const response = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newProject = await response.json();
        toast.success("Project created successfully!", {
          description: newProject.name,
        });
        setName("");
        setDescription("");
        setStatus("todo");
        setShowNewProjectDialog(false);
        mutate(`/api/v1/projects/by-user/${user?._id}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Server error, please try again later.");
    }
  }

  if (error) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        Error loading projects.
      </div>
    );
  }

  return (
    <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="capitalize">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a project"
            className={cn("w-fit justify-between", className)}
          >
            {selectedProject?.name || "Select a project"}
            {selectedProject && (
              <Badge variant="outline" className="space-x-2 ml-2">
                <span className="text-muted-foreground">
                  {statusIcon(selectedProject, 10)}
                </span>
                <span>{selectedProject.status}</span>
              </Badge>
            )}
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Search project..." />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup heading="Projects">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader className="animate-spin w-6 h-6 text-muted-foreground" />
                    <span className="ml-2">Loading...</span>
                  </div>
                ) : (
                  projects?.map((project: IProject) => (
                    <CommandItem
                      key={project._id}
                      onSelect={() => {
                        setSelectedProject(project);
                        localStorage.setItem(
                          "project",
                          JSON.stringify(project)
                        );
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      {project.name}
                      <Badge variant="outline" className="space-x-2 ml-2">
                        <span className="text-muted-foreground">
                          {statusIcon(project, 10)}
                        </span>
                        <span>{project.status}</span>
                      </Badge>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedProject?.name === project.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewProjectDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Create Project Dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add a new project to manage your tasks and progress.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project name</Label>
            <Input
              id="name"
              placeholder="Awesome Project"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <StatusSelectorCom setStatus={setStatus} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Description</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your project"
              className="min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewProjectDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={createProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
