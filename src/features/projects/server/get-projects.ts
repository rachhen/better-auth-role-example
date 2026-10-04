"use server";

import { db } from "@/db";
import { hasPermission } from "@/lib/authorized";
import { getOrganizationOrRedirect } from "@/server/session";
import { unauthorized } from "next/navigation";

export async function getProjects() {
  const organization = await getOrganizationOrRedirect();

  const can = await hasPermission({ project: ["read"] }, organization.id);
  if (!can) {
    unauthorized();
  }

  const projects = await db.query.projects.findMany({
    where: { organizationId: organization.id },
    with: {
      organization: true,
    },
  });

  return projects;
}

export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;
