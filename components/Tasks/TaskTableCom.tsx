"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useAuth } from "@/contexts/AuthProvider";
import { Loader } from "lucide-react";
import AddTaskCom from "./AddTaskCom/AddTaskCom";
import Link from "next/link";
import ITask from "@/interfaces/ITask";
import { toast } from "sonner";

// handel delete task function
export const handleTaskDelete = async (taskId: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/v1/tasks/by-id/${taskId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Task deleted successfully!");
    } else {
      toast.error("Failed to delete task.");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Something went wrong!");
  }
};

// Handle updating Property like task status label etc

export async function updateTaskProperty(
  taskId: string,
  property: string,
  value: string
) {
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
    toast.success("Task updated successfully");

    console.log("Task updated successfully:", result);
    return result;
  } catch (error) {
    toast.error("Error updating task");
    console.error("Error updating task:", error);
  }
}

interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[];
}

export function TaskTableCom<TValue>({
  columns,
}: DataTableProps<ITask, TValue>) {
  //Data fetching .............................................................................................Start
  const auth = useAuth();
  const user = auth?.user ?? null;
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); // Added loading state

  React.useEffect(() => {
    if (!user?._id) return;

    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/tasks/by-user/${user?._id}`);
        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [user?._id]);

  //Data fetching .............................................................................................End

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 20, // Show 20 tasks by default
      },
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      {user ? (
        loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin w-6 h-6 text-muted-foreground" />
            <span className="ml-2">Loading tasks...</span>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="w-full h-full flex justify-between items-center">
                <DataTableToolbar table={table} />
                <AddTaskCom setTasks={setTasks} />
              </div>
              <div className="rounded-md border">
                <Table className="capitalize ">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <DataTablePagination table={table} />
            </div>
          </>
        )
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          Please log in to see your tasks.
          <Link href="/login" className="underline text-blue-500 px-1">
            Log in
          </Link>
        </div>
      )}
    </>
  );
}
