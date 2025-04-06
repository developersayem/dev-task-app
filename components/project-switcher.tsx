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
import { useAuth } from "@/contexts/AuthProvider";
import { mutate } from "swr";
import { toast } from "sonner";

interface IProject {
  _id: string;
  user: string;
  name: string;
  status: "todo" | "in progress" | "done" | "backlog" | "cancelled";
  description: string;
}

const projects: IProject[] = [
  {
    _id: "1",
    user: "1",
    name: "Dev task project",
    status: "todo",
    description: "Description 1",
  },
  {
    _id: "2",
    user: "1",
    name: "Portfolio project",
    status: "in progress",
    description: "Description 2",
  },
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

// status icons
const statusIcon = (selectedProject: IProject, size: number) => {
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
  }
};
export default function ProjectSwitcher({ className }: ProjectSwitcherProps) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<IProject>(
    projects[0]
  );
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("todo");
  const [description, setDescription] = React.useState("");
  const createProject = async () => {
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
        const newTask = await response.json(); // ✅ Get the new task
        toast.success("Task created successfully!", newTask.title);
        setName("");
        setDescription("");
        setStatus("todo");
        mutate(`/api/v1/projects/by-user/${user?._id}`); // Revalidate data
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Server error, please try again later.");
    }
  };
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
            {selectedProject?.name}
            <Badge variant="outline" className="space-x-2">
              <span className="text-muted-foreground">
                {statusIcon(selectedProject, 10)}
              </span>
              <span>{selectedProject?.status}</span>
            </Badge>
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Search project..." />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem
                    key={project._id}
                    onSelect={() => {
                      setSelectedProject(project);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {project.name}
                    <Badge variant="outline" className="space-x-2">
                      <span className="text-muted-foreground">
                        {statusIcon(project, 10)}
                      </span>
                      <span>{project?.status}</span>
                    </Badge>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedProject._id === project._id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
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
          <Button type="submit" onClick={createProject}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
