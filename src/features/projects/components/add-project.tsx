"use client";

import { PlusIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppForm } from "@/hooks/form";

import { createProject } from "../server/create-project";
import { ProjectFields, projectFormOpts } from "./project-form-fields";

export const AddProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { executeAsync } = useAction(createProject, {
    onSuccess: () => {
      toast.success("Project created successfully");
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.error.serverError?.message);
    },
  });
  const form = useAppForm({
    ...projectFormOpts,
    onSubmit: async ({ value, formApi }) => {
      await executeAsync({ name: value.name });
      formApi.reset();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Add Project
      </DialogTrigger>
      <DialogContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add new project</DialogDescription>
          </DialogHeader>
          <ProjectFields form={form} />
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <form.AppForm>
              <form.SubscribeButton>Save changes</form.SubscribeButton>
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
