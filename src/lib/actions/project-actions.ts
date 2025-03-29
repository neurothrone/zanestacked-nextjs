"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import ProjectSchema from "@/src/lib/validation/project-schema";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateProject = ProjectSchema.omit({ id: true });
const UpdateProject = ProjectSchema.omit({ id: true });

export type ProjectFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    imageUrl?: string[];
    githubUrl?: string[];
    demoUrl?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: ProjectFormState, formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    githubUrl: formData.get("githubUrl"),
    demoUrl: formData.get("demoUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Project.",
    };
  }

  const { title, description, imageUrl, githubUrl, demoUrl } = validatedFields.data;
  const skillsRaw = formData.get("skills");
  const skillIds = typeof skillsRaw === "string" ? skillsRaw.split(",") : [];

  try {
    // await sql`
    //     INSERT INTO projects (title, description, image_url, github_url, demo_url)
    //     VALUES (${title},
    //             ${description},
    //             ${imageUrl ?? null},
    //             ${githubUrl ?? null},
    //             ${demoUrl ?? null})
    // `;
    const inserted = await sql`
        INSERT INTO projects (title, description, image_url, github_url, demo_url)
        VALUES (${title}, ${description}, ${imageUrl ?? null}, ${githubUrl ?? null}, ${demoUrl ?? null})
        RETURNING id
    `;
    const projectId = inserted[0].id;

    for (const skillId of skillIds) {
      await sql`
          INSERT INTO project_skills (project_id, skill_id)
          VALUES (${projectId}, ${skillId})
          ON CONFLICT DO NOTHING;
      `;
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Project.",
    };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  prevState: ProjectFormState,
  formData: FormData,
) {
  const validatedFields = UpdateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    githubUrl: formData.get("githubUrl"),
    demoUrl: formData.get("demoUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Project.",
    };
  }

  const { title, description, imageUrl, githubUrl, demoUrl } = validatedFields.data;

  try {
    await sql`
        UPDATE projects
        SET title       = ${title},
            description = ${description},
            image_url   = ${imageUrl ?? null},
            github_url  = ${githubUrl ?? null},
            demo_url    = ${demoUrl ?? null}
        WHERE
            id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update Project." };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export const deleteProject = async (id: string) => {
  await sql`DELETE
            FROM projects
            WHERE
                id = ${id}`;
  revalidatePath("/admin/projects");
}
