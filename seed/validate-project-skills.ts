import postgres from "postgres";
import projectSkills from "./seed-project-skills.json";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const validateProjectSkills = async () => {
  const errors: string[] = [];

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

    if (!project) {
      errors.push(`❌ Project slug not found: "${slug}"`);
    }
    if (!skill) {
      errors.push(`❌ Skill name not found: "${skillName}"`);
    }
  }

  if (errors.length) {
    console.error("\n⚠️  Validation Errors:\n");
    errors.forEach((e) => console.error(e));
    console.error("\nAborting project_skills seeding.\n");
    process.exit(1);
  } else {
    console.log("✅ All project-skill references are valid.");
  }
};

validateProjectSkills();
