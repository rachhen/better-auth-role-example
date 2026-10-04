import z from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const updateProjectSchema = projectSchema.extend({
  id: z.string(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
