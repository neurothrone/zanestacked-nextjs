import postgres from "postgres";
import { PostgresSkillEntity } from "@/src/data/postgres/entities/postgres-skill-entity";
import { PostgresProjectEntity } from "@/src/data/postgres/entities/postgres-project-entity";
import { mapEntityToProject, mapEntityToSkill } from "@/src/data/postgres/utils/mappers";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchSkills() {
  try {
    const data = await sql<PostgresSkillEntity[]>`
        SELECT
            *
        FROM skills
    `;
    return data.map(mapEntityToSkill);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills.");
  }
}

export async function fetchSkillById(id: string) {
  try {
    const data = await sql<PostgresSkillEntity[]>`
        SELECT
            *
        FROM skills
        WHERE
            id = ${id};
    `;
    return data.length ? mapEntityToSkill(data[0]) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skill.");
  }
}

export async function fetchProjects() {
  try {
    const data = await sql<PostgresProjectEntity[]>`
        SELECT
            *
        FROM projects
    `;
    return data.map(mapEntityToProject);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchProjectById(id: string) {
  try {
    const data = await sql<PostgresProjectEntity[]>`
        SELECT
            *
        FROM projects
        WHERE
            id = ${id};
    `;
    return data.length ? mapEntityToProject(data[0]) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project.");
  }
}
