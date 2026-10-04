"use server";

import { db, schema } from "@/db";
import { can, organizationClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export const deleteProject = organizationClient
  .metadata({ actionName: "deleteProject" })
  .inputSchema(z.object({ id: z.string() }))
  .use(can({ project: ["update"] }))
  .action(async ({ parsedInput, ctx }) => {
    await db
      .delete(schema.projects)
      .where(
        and(
          eq(schema.projects.id, parsedInput.id),
          eq(schema.projects.organizationId, ctx.organization.id),
        ),
      );

    revalidatePath("/projects");
  });
