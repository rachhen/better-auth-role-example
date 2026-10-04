import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteProject } from "../server/delete-project";
import { type GetProjectsResult } from "../server/get-projects";

type Props = {
  project: GetProjectsResult[number];
};
export const DeleteProjectButton = ({ project }: Props) => {
  const { execute } = useAction(deleteProject, {
    onSuccess: () => {
      toast.success("Project deleted successfully");
    },
    onError(args) {
      toast.error(args.error.serverError?.message);
    },
  });
  return (
    <Button
      size="icon-xs"
      onClick={() => confirm("Are you sure?") && execute({ id: project.id })}
    >
      <Trash2 />
      <span className="sr-only">Delete</span>
    </Button>
  );
};
