"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { DiamondPlus } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PrioritySelectorCom from "./PrioritySelectorCom";
import StatusSelectorCom from "./StatusSelectorCom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { toast } from "sonner";
import LabelSelectorCom from "./LabelSelectorCom";
import { mutate } from "swr";

const AddTaskCom = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("low");
  const [label, setLabel] = useState("low");
  const [isOpen, setIsOpen] = useState(false); // Manage dialog state

  const createTask = async () => {
    const taskData = {
      user,
      title,
      description,
      status,
      priority,
      label,
    };
    console.log(taskData);

    try {
      const response = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json(); // ✅ Get the new task
        toast.success("Task created successfully!", newTask.title);
        setTitle("");
        setDescription("");
        setStatus("todo");
        setPriority("low");
        setLabel("bug");
        setIsOpen(false);
        mutate(`/api/v1/tasks/by-user/${user?._id}`); // Revalidate data
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Server error, please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" " onClick={() => setIsOpen(true)}>
          <DiamondPlus /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-7 py-2">
          <DialogTitle className="text-2xl">Create a new task</DialogTitle>
          <DialogDescription>
            Enter required information to create a new task.
          </DialogDescription>
        </DialogHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <StatusSelectorCom setStatus={setStatus} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <PrioritySelectorCom setPriority={setPriority} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Label</Label>
              <LabelSelectorCom setLabel={setLabel} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={createTask}>
            Create Task
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskCom;
