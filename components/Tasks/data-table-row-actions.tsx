"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels, statuses, priorities } from "./data";
import { taskSchema } from "../../schemas/taskSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Updated import

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  taskId: string;
}

export function DataTableRowActions<TData>({
  taskId,
  row,
}: DataTableRowActionsProps<TData>) {
  const parsedTask = taskSchema.safeParse(row.original);

  const router = useRouter(); // ✅ Use router to refresh UI
  // const taskId = row.original._id; // ✅ Extract task ID

  const handleTaskDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    console.log("clicked");
    try {
      const res = await fetch(`/api/v1/tasks/by-id/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Task deleted successfully!");
        router.refresh(); // Refresh UI after deletion
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong!");
    }
  };

  //handle update Priority
  async function updatePriority(value: string) {
    const property = "priority";
    try {
      const response = await fetch(`/api/v1/tasks/by-id/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property, value }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Task Priority updated successfully");
      console.log("Task updated successfully:", result);
      return result;
    } catch (error) {
      toast.error("Error updating task");
      console.error("Error updating task:", error);
    }
  }
  //handle update Priority
  async function updateStatus(value: string) {
    const property = "status";
    try {
      const response = await fetch(`/api/v1/tasks/by-id/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property, value }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Task status updated successfully");
      console.log("Task updated successfully:", result);
      return result;
    } catch (error) {
      toast.error("Error updating task");
      console.error("Error updating task:", error);
    }
  }
  //handle update label
  async function updateLabel(value: string) {
    const property = "label";
    try {
      const response = await fetch(`/api/v1/tasks/by-id/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property, value }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Task label updated successfully");
      console.log("Task updated successfully:", result);
      return result;
    } catch (error) {
      toast.error("Error updating task");
      console.error("Error updating task:", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={parsedTask.success ? parsedTask.data.label : ""}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => updateLabel(label.value)}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Statuses</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={parsedTask.success ? parsedTask.data.label : ""}
            >
              {statuses.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => updateStatus(label.value)}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priorities</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={parsedTask.success ? parsedTask.data.label : ""}
            >
              {priorities.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => updatePriority(label.value)}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleTaskDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
