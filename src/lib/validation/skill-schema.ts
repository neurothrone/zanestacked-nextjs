import { z } from "zod";

const SkillSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(40, "Name must be 40 characters or fewer."),
  yearsOfExperience: z
    .coerce
    .number({
      invalid_type_error: "Years of experience must be a number."
    })
    .int("Must be an integer.")
    .min(1, "Please enter at least 1 year of experience.")
    .lte(50, "Too experienced... are you immortal?"),
  proficiency: z
    .string()
    .refine((val) => ["Beginner", "Intermediate", "Advanced", "Expert"].includes(val), {
      message: "Please select a proficiency level.",
    }),
});

export default SkillSchema;
