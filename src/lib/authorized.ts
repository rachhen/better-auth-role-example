import { headers } from "next/headers";
import { auth } from "./auth";
import { OrganizationStatements } from "./organization-access";

export const hasPermission = async (
  permissions: {
    [K in keyof OrganizationStatements]?: OrganizationStatements[K][number][];
  },
  organizationId?: string,
) => {
  const result = await auth.api.hasPermission({
    headers: await headers(),
    body: { organizationId, permissions },
  });

  return result.success;
};
