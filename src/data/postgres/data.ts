import postgres from "postgres";
import { mapEntityToProject, mapEntityToProjectWithSkills, mapEntityToSkill } from "@/src/data/postgres/utils/mappers";
import { ProjectEntity } from "@/src/data/postgres/entities/project-entity";
import { ProjectWithSkillsEntity } from "@/src/data/postgres/entities/project-with-skills-entity";
import { SkillEntity } from "@/src/data/postgres/entities/skill-entity";
import Project from "@/src/models/project";
import ProjectWithSkills from "@/src/models/project-with-skills";
import Skill from "@/src/models/skill";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const data = await sql<SkillEntity[]>`
        SELECT
            *
        FROM
            skills
    `;
    return data.map(mapEntityToSkill);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills.");
  }
}

export async function fetchSkillById(id: string): Promise<Skill | null> {
  try {
    const data = await sql<SkillEntity[]>`
        SELECT
            *
        FROM
            skills
        WHERE
            id = ${id};
    `;
    return data.length ? mapEntityToSkill(data[0]) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skill.");
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {

    const data = await sql<ProjectEntity[]>`
        SELECT
            p.*,
            COUNT(ps.skill_id) ::int AS skill_count
        FROM
            projects                 p
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

export async function fetchProjectsWithSkills(): Promise<ProjectWithSkills[]> {
  try {
    const data = await sql<ProjectWithSkillsEntity[]>`
        SELECT
            p.*,
            COALESCE(
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
        FROM
            projects                 p
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

export async function fetchProjectWithSkillsById(projectId: string): Promise<ProjectWithSkills | null> {
  try {
    const data = await sql<ProjectWithSkillsEntity[]>`
        SELECT
            p.*,
            COALESCE(
                    json_agg(
                            json_build_object(
                                    'id', s.id,
                                    'name', s.name,
                                    'yearsOfExperience', s.years_of_experience,
                                    'proficiency', s.proficiency,
                                    'createdAt', s.created_at
                            ) ORDER BY s.years_of_experience DESC
                    ) FILTER(WHERE s.id IS NOT NULL),
                    '[]'
            ) AS skills
        FROM
            projects                 p
            LEFT JOIN project_skills ps
                      ON ps.project_id = p.id
            LEFT JOIN skills         s
                      ON s.id = ps.skill_id
        WHERE
            p.id = ${projectId}
        GROUP BY
            p.id;
    `;
    return data.length ? mapEntityToProjectWithSkills(data[0]) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const data = await sql<ProjectEntity[]>`
        SELECT
            *
        FROM
            projects
        WHERE
            id = ${id};
    `;
    return data.length ? mapEntityToProject(data[0]) : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch project.");
  }
}

export async function fetchSkillsForProject(projectId: string): Promise<Skill[]> {
  try {
    const data = await sql<SkillEntity[]>`
        SELECT
            s.*
        FROM
            skills                    s
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
