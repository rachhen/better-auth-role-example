import {
  lastLoginMethodClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { organizationAccess, organizationRoles } from "./organization-access";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac: organizationAccess,
      roles: organizationRoles,
      dynamicAccessControl: { enabled: true },
    }),
    lastLoginMethodClient(),
  ],
});
