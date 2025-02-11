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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  taskId: string;
  userId: string;
  handleTaskDelete: (taskId: string, userId: string) => Promise<void>;
  updateTaskProperty: (
    taskId: string,
    property: string,
    value: string,
    userId: string
  ) => Promise<void>;
}

export function DataTableRowActions<TData>({
  taskId,
  userId,
  row,
  handleTaskDelete,
  updateTaskProperty,
}: DataTableRowActionsProps<TData>) {
  const parsedTask = taskSchema.safeParse(row.original);

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
                  onClick={() =>
                    updateTaskProperty(taskId, userId, "label", label.value)
                  }
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
              value={parsedTask.success ? parsedTask.data.status : ""}
            >
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  onClick={() =>
                    updateTaskProperty(taskId, userId, "status", status.value)
                  }
                >
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priorities</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={parsedTask.success ? parsedTask.data.priority : ""}
            >
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                  onClick={() =>
                    updateTaskProperty(
                      taskId,
                      userId,
                      "priority",
                      priority.value
                    )
                  }
                >
                  {priority.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleTaskDelete(taskId, userId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
