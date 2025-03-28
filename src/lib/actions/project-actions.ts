"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import ProjectSchema from "@/src/lib/validation/project-schema";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateProject = ProjectSchema.omit({ id: true });
const UpdateProject = ProjectSchema.omit({ id: true });

export const deleteProject = async (id: string) => {
  await sql`DELETE
            FROM projects
            WHERE
                id = ${id}`;
  revalidatePath("/admin/projects");
}
