import postgres from "postgres";
import skills from "@/seed/seed-skills.json";
import projects from "@/seed/seed-projects.json";
import projectSkills from "@/seed/seed-project-skills.json";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const createUuidExtension = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
};

const seedSkills = async () => {
  await sql`
      CREATE TABLE IF NOT EXISTS skills (
          id                  UUID      DEFAULT uuid_generate_v4() PRIMARY KEY,
          name                VARCHAR(40) NOT NULL,
          years_of_experience INT         NOT NULL,
          proficiency         VARCHAR(15) NOT NULL,
          created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `;

  return await Promise.all(
    skills.map(
      (s) => sql`
          INSERT INTO skills (name, years_of_experience, proficiency)
          VALUES (${s.name},
                  ${s.yearsOfExperience},
                  ${s.proficiency})
          ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
}

const seedProjects = async () => {
  await sql`
      CREATE TABLE IF NOT EXISTS projects (
          id          UUID      DEFAULT uuid_generate_v4() PRIMARY KEY,
          title       VARCHAR(50)        NOT NULL,
          slug        VARCHAR(50) UNIQUE NOT NULL,
          description TEXT               NOT NULL,
          image_url   VARCHAR(255),
          github_url  VARCHAR(255),
          demo_url    VARCHAR(255),
          created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `;

  return await Promise.all(
    projects.map(
      (p) => sql`
          INSERT INTO
              projects (title, slug, description, image_url, github_url, demo_url)
          VALUES
              (${p.title},
               ${p.slug},
               ${p.description},
               ${p.imageUrl ?? null},
               ${p.githubUrl ?? null},
               ${p.demoUrl ?? null})
          ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
}

const seedProjectSkills = async () => {
  await sql`
      CREATE TABLE IF NOT EXISTS project_skills (
          project_id UUID REFERENCES projects (id) ON DELETE CASCADE,
          skill_id   UUID REFERENCES skills (id) ON DELETE CASCADE,
          PRIMARY KEY (project_id, skill_id)
      );
  `;

  for (const { slug, skillName } of projectSkills) {
    const [project] = await sql`SELECT
                                    id
                                FROM projects
                                WHERE
                                    slug = ${slug}`;
    const [skill] = await sql`SELECT
                                  id
                              FROM skills
                              WHERE
                                  name = ${skillName}`;

    if (project && skill) {
      await sql`
          INSERT INTO project_skills (project_id, skill_id)
          VALUES (${project.id}, ${skill.id})
          ON CONFLICT DO NOTHING;
      `;
    }
  }
};

const seedData = async () => {
  try {
    await sql.begin(async () => {
      await createUuidExtension();
      await seedSkills();
      await seedProjects();
      await seedProjectSkills();
    });
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

export default seedData;
