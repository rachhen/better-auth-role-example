"use client";

import { Edit } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppForm } from "@/hooks/form";

import { type GetProjectsResult } from "../server/get-projects";
import { updateProject } from "../server/update-project";
import { ProjectFields, projectFormOpts } from "./project-form-fields";

type Props = {
  project: GetProjectsResult[number];
};
export const EditProject = ({ project }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { executeAsync } = useAction(updateProject, {
    onSuccess: () => {
      toast.success("Project updated successfully");
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.error.serverError?.message);
    },
  });
  const form = useAppForm({
    ...projectFormOpts,
    defaultValues: { name: project.name },
    onSubmit: async ({ value, formApi }) => {
      await executeAsync({ id: project.id, name: value.name });
      formApi.reset();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button size="icon-xs" variant="outline" />}>
        <Edit />
        <span className="sr-only">Edit</span>
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
            <DialogTitle>Update Project</DialogTitle>
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
