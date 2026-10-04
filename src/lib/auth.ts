import { db } from "@/db";
import * as schema from "@/db/schema";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins/organization";
import { organizationAccess, organizationRoles } from "./organization-access";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    organization({
      ac: organizationAccess,
      roles: organizationRoles,
      dynamicAccessControl: { enabled: true },
    }),
  ],
});
