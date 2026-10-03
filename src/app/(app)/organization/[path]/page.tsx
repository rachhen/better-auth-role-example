import { notFound } from "next/navigation";

import { Organization } from "@/components/auth/organization/organization";
import { organizationPlugin } from "@/lib/auth/organization-plugin";

const validOrganizationPaths = Object.values(
  organizationPlugin().viewPaths.organization,
);

async function OrganizationPage({ params }: PageProps<"/organization/[path]">) {
  const { path } = await params;

  if (!validOrganizationPaths.includes(path)) {
    notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <Organization path={path} />
    </div>
  );
}

export default OrganizationPage;
