"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import slugify from "slugify";
import ProjectSchema from "@/src/lib/validation/project-schema";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const CreateProject = ProjectSchema.omit({ id: true, slug: true });
const UpdateProject = ProjectSchema.omit({ id: true, slug: true });

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

export async function createProject(
  prevState: ProjectFormState,
  formData: FormData
) {
  const validatedFields = CreateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    githubUrl: formData.get("githubUrl"),
    demoUrl: formData.get("demoUrl"),
  });

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create Project.",
    };
  }

  const { title, description, imageUrl, githubUrl, demoUrl } = validatedFields.data;
  const skillIds = formData.getAll("skills") as string[];

  try {
    const inserted = await sql`
        INSERT INTO
            projects (title, slug, description, image_url, github_url, demo_url)
        VALUES
            (${title}, ${slugify(title)}, ${description}, ${imageUrl ?? null}, ${githubUrl ?? null},
             ${demoUrl ?? null})
        RETURNING id
    `;

    if (!inserted.length) {
      return {
        message: "Database Error: Project was not created.",
      };
    }

    const projectId = inserted[0].id;

    for (const skillId of skillIds) {
      await sql`
          INSERT INTO
              project_skills (project_id, skill_id)
          VALUES
              (${projectId}, ${skillId})
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
  console.log("Redirecting to /admin/projects...");
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
      message: "Missing Fields. Failed to update Project.",
    };
  }

  const { title, description, imageUrl, githubUrl, demoUrl } = validatedFields.data;
  const skillIds = formData.getAll("skills") as string[];

  try {
    await sql`
        UPDATE projects
        SET
            title       = ${title},
            slug        = ${slugify(title)},
            description = ${description},
            image_url   = ${imageUrl ?? null},
            github_url  = ${githubUrl ?? null},
            demo_url    = ${demoUrl ?? null}
        WHERE
            id = ${id}
    `;

    await sql`DELETE
              FROM
                  project_skills
              WHERE
                  project_id = ${id}`;
    for (const skillId of skillIds) {
      await sql`
          INSERT INTO
              project_skills (project_id, skill_id)
          VALUES
              (${id}, ${skillId})
          ON CONFLICT DO NOTHING;
      `;
    }
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update Project." };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export const deleteProject = async (id: string) => {
  await sql`DELETE
            FROM
                projects
            WHERE
                id = ${id}`;
  revalidatePath("/admin/projects");
}
