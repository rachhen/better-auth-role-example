"use server";

import { db, schema } from "@/db";
import { can, organizationClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { updateProjectSchema } from "../validators/project";

export const updateProject = organizationClient
  .metadata({ actionName: "updateProject" })
  .inputSchema(updateProjectSchema)
  .use(can({ project: ["update"] }))
  .action(async ({ parsedInput, ctx }) => {
    await db
      .update(schema.projects)
      .set({ name: parsedInput.name })
      .where(
        and(
          eq(schema.projects.id, parsedInput.id),
          eq(schema.projects.organizationId, ctx.organization.id),
        ),
      );

    revalidatePath("/projects");
  });
