"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { labels, priorities, statuses } from "./data";
import ITask from "@/interfaces/ITask"; // Import the ITask interface
import { DataTableColumnHeader } from "./data-table-column-header";
import { CodeXml } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";
import { handleTaskDelete, updateTaskProperty } from "./task-table-com";

export const columns: ColumnDef<ITask>[] = [
  {
    id: "CodeXml",
    header: () => <CodeXml />,
    cell: () => <CodeXml />,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("_id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      return value.includes(row.getValue(_id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      return value.includes(row.getValue(_id));
    },
  },
  {
    id: "actions",
    header: () => "actions",
    cell: ({ row }) => {
      const taskId = row.original._id as string;
      const userId = row.original.user as unknown as string;
      return (
        <DataTableRowActions
          userId={userId}
          taskId={taskId}
          handleTaskDelete={handleTaskDelete}
          updateTaskProperty={updateTaskProperty}
          row={row}
        />
      );
    },
  },
];
