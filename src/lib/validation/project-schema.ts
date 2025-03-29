import { z } from "zod";

// const optionalUrl = (message = "Must be a valid URL.") =>
//   z
//     .string()
//     .url({ message })
//     .optional()
//     .or(z.literal("").transform(() => undefined));

export const optionalUrl = (message = "Must be a valid URL.") =>
  z.preprocess(
    (value) => (value === "" ? null : value),
    z
      .string()
      .url({ message })
      .nullable()
  );

const ProjectFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(2, "Project title must be at least 2 characters.")
    .max(50, "Project title must be 50 characters or fewer."),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .max(50, "Slug must be 50 characters or fewer.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  imageUrl: optionalUrl("Must be a valid image URL."),
  githubUrl: optionalUrl("Must be a valid GitHub URL."),
  demoUrl: optionalUrl("Must be a valid Demo URL."),
});

export default ProjectFormSchema;
