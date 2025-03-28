import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Must be a valid URL.")
  .optional()
  .or(z.literal("").transform(() => undefined));

const ProjectFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters.")
    .max(50, "Project name must be 50 characters or fewer."),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .max(50, "Slug must be 50 characters or fewer.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  imageUrl: optionalUrl,
  githubUrl: optionalUrl,
  demoUrl: optionalUrl,
});

export default ProjectFormSchema;
