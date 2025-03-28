import { PostgresSkillEntity } from "@/src/data/postgres/entities/postgres-skill-entity";
import { PostgresProjectEntity } from "@/src/data/postgres/entities/postgres-project-entity";
import Skill from "@/src/models/skill";
import Project from "@/src/models/project";

export function mapEntityToSkill(entity: PostgresSkillEntity): Skill {
  return {
    id: entity.id,
    name: entity.name,
    yearsOfExperience: entity.years_of_experience,
    proficiency: entity.proficiency,
    createdAt: entity.created_at,
  };
}

export function mapEntityToProject(entity: PostgresProjectEntity): Project {
  return {
    id: entity.id,
    title: entity.title,
    slug: entity.slug,
    description: entity.description,
    imageUrl: entity.image_url ?? undefined,
    githubUrl: entity.github_url ?? undefined,
    demoUrl: entity.demo_url ?? undefined,
    createdAt: entity.created_at,
  };
}
