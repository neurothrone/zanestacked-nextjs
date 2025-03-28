import postgres from "postgres";
import Skill from "@/src/models/skill";
import Project from "@/src/models/project";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchSkills() {
  try {
    return await sql<Skill[]>`
        SELECT
            *
        FROM skills
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills.");
  }
}

export async function fetchProjects() {
  try {
    return await sql<Project[]>`
        SELECT
            *
        FROM projects
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}
