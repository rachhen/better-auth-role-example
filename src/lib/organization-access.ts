import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  memberAc,
  ownerAc,
} from "better-auth/plugins/organization/access";

export const organizationStatements = {
  ...defaultStatements,
  project: ["create", "read", "update", "delete"],
} as const;

export const organizationAccess = createAccessControl(organizationStatements);

export const organizationRoles = {
  admin: organizationAccess.newRole({
    ...adminAc.statements,
    project: ["create", "read", "update", "delete"],
  }),
  member: organizationAccess.newRole({
    ...memberAc.statements,
    project: ["read"],
  }),
  owner: organizationAccess.newRole({
    ...ownerAc.statements,
    project: ["create", "read", "update", "delete"],
  }),
};

export type OrganizationStatements = typeof organizationStatements;

export type OrganizationPermissionRegistry = {
  [Resource in keyof OrganizationStatements]?: {
    label: string;
    actions: {
      [Action in OrganizationStatements[Resource][number]]: string;
    };
  };
};

export const organizationPermissions = {
  project: {
    label: "Projects",
    actions: {
      create: "Create",
      read: "View",
      update: "Edit",
      delete: "Delete",
    },
  },
} satisfies OrganizationPermissionRegistry;
