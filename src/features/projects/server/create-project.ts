"use server";

import { db, schema } from "@/db";
import { can, organizationClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { projectSchema } from "../validators/project";

export const createProject = organizationClient
  .metadata({ actionName: "createProject" })
  .inputSchema(projectSchema)
  .use(can({ project: ["create"] }))
  .action(async ({ parsedInput, ctx }) => {
    await db.insert(schema.projects).values({
      organizationId: ctx.organization.id,
      name: parsedInput.name,
      createdBy: ctx.auth.user.id,
    });

    revalidatePath("/projects");
  });
