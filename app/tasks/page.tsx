import { ThemeCom } from "@/components/theme-com/theme-com";
import { UserNav } from "./components/user-nav";
import { TaskTableCom } from "./components/task-table-com";
import { columns } from "./components/table-columns";

export default function TaskPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <ThemeCom />
          <UserNav />
        </div>
      </div>
      <TaskTableCom columns={columns} />
    </div>
  );
}
