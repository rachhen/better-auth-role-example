import { ProjectDataGrid } from "@/features/projects/components/project-data-grid";
import { getProjects } from "@/features/projects/server/get-projects";

async function Page() {
  const project = await getProjects();

  return (
    <div className="p-4">
      <ProjectDataGrid data={project} />
    </div>
  );
}

export default Page;
