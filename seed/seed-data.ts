import postgres from "postgres";
import { skills } from "@/seed/skills";
import { projects } from "@/seed/projects";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const seedSkills = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

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
          VALUES (${s.name}, ${s.yearsOfExperience}, ${s.proficiency})
          ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
}

const seedProjects = async () => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

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
          INSERT INTO projects (title, slug, description, image_url, github_url, demo_url)
          VALUES (${p.title}, ${p.slug}, ${p.description}, ${p.imageUrl ?? null}, ${p.githubUrl ?? null},
                  ${p.demoUrl ?? null})
          ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
}

const seedData = async () => {
  try {
    await sql.begin(() => [
      seedSkills(),
      seedProjects(),
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default seedData;
