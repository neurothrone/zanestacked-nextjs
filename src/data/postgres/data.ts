import postgres from "postgres";
import { PostgresSkillEntity } from "@/src/data/postgres/entities/postgres-skill-entity";
import { PostgresProjectEntity, ProjectWithSkillsEntity } from "@/src/data/postgres/entities/postgres-project-entity";
import { mapEntityToProject, mapEntityToProjectWithSkills, mapEntityToSkill } from "@/src/data/postgres/utils/mappers";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchSkills() {
  // await new Promise(resolve => setTimeout(resolve, 1000));
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
            p.*,
            COUNT(ps.skill_id) ::int AS skill_count
        FROM projects            p
        LEFT JOIN project_skills ps
                  ON ps.project_id = p.id
        GROUP BY
            p.id LIMIT 6
    `;
    return data.map(mapEntityToProject);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchProjectsWithSkills() {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  try {
    const data = await sql<ProjectWithSkillsEntity[]>`
        SELECT
            p.*,
            COUNT(ps.skill_id)::int AS skill_count, COALESCE(
                json_agg(
                        json_build_object(
                                'id', s.id,
                                'name', s.name,
                                'years_of_experience', s.years_of_experience,
                                'proficiency', s.proficiency,
                                'created_at', s.created_at
                        ) ORDER BY s.years_of_experience DESC
                ) FILTER(WHERE s.id IS NOT NULL),
                '[]'
                                                    ) AS skills
        FROM projects            p
        LEFT JOIN project_skills ps
                  ON ps.project_id = p.id
        LEFT JOIN skills         s
                  ON s.id = ps.skill_id
        GROUP BY
            p.id
        ORDER BY
            p.created_at DESC
    `;
    return data.map(mapEntityToProjectWithSkills);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects with skills.");
  }
}

export async function fetchProjectWithSkillsById(projectId: string) {
  try {
    const data = await sql<PostgresProjectEntity[]>`
        SELECT
            p.*,
            s.id   AS skill_id,
            s.name AS skill_name,
            s.years_of_experience
        FROM projects       p
        JOIN project_skills ps
             ON ps.project_id = p.id
        JOIN skills         s
             ON s.id = ps.skill_id
        WHERE
            p.id = ${projectId}
        ORDER BY
            s.years_of_experience DESC
    `;
    return data.length ? mapEntityToProject(data[0]) : null;
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

export async function fetchSkillsForProject(projectId: string) {
  try {
    const data = await sql<PostgresSkillEntity[]>`
        SELECT
            s.*
        FROM skills               s
        INNER JOIN project_skills ps
                   ON ps.skill_id = s.id
        WHERE
            ps.project_id = ${projectId};
    `;
    return data.map(mapEntityToSkill);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills for project.");
  }
}
