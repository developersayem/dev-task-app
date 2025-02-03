import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center items-center text-center">
        <h1>Dev Task</h1>
      </div>
    </>
  );
}
