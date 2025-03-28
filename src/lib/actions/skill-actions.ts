"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import SkillSchema from "@/src/lib/validation/skill-schema";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateSkill = SkillSchema.omit({ id: true });
const UpdateSkill = SkillSchema.omit({ id: true });

export type SkillFormState = {
  errors?: {
    name?: string[];
    yearsOfExperience?: string[];
    proficiency?: string[];
  };
  message?: string | null;
};

export async function createSkill(prevState: SkillFormState, formData: FormData) {
  const validatedFields = CreateSkill.safeParse({
    name: formData.get("name"),
    yearsOfExperience: Number(formData.get("yearsOfExperience")),
    proficiency: formData.get("proficiency"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Skill.",
    };
  }

  const { name, yearsOfExperience, proficiency } = validatedFields.data;

  try {
    await sql`
        INSERT INTO skills (name, yearsOfExperience, proficiency)
        VALUES (${name}, ${yearsOfExperience}, ${proficiency})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(
  id: string,
  prevState: SkillFormState,
  formData: FormData,
) {
  const validatedFields = UpdateSkill.safeParse({
    name: formData.get("name"),
    yearsOfExperience: Number(formData.get("yearsOfExperience")),
    proficiency: formData.get("proficiency"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update Skill.",
    };
  }

  const { name, yearsOfExperience, proficiency } = validatedFields.data;

  try {
    await sql`
        UPDATE skills
        SET name              = ${name},
            yearsOfExperience = ${yearsOfExperience},
            proficiency       = ${proficiency}
        WHERE
            id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update Skill." };
  }

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export const deleteSkill = async (id: string) => {
  await sql`DELETE
            FROM skills
            WHERE
                id = ${id}`;
  revalidatePath("/admin/skills");
}
