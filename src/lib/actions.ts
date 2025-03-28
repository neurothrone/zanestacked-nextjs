"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const deleteSkill = async (id: string) => {
  await sql`DELETE
            FROM skills
            WHERE
                id = ${id}`;
  revalidatePath("/admin/skills");
}

export const deleteProject = async (id: string) => {
  await sql`DELETE
            FROM projects
            WHERE
                id = ${id}`;
  revalidatePath("/admin/projects");
}
