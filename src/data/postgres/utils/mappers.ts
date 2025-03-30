import { PostgresSkillEntity } from "@/src/data/postgres/entities/postgres-skill-entity";
import { PostgresProjectEntity, ProjectWithSkillsEntity } from "@/src/data/postgres/entities/postgres-project-entity";
import Project from "@/src/models/project";
import Skill from "@/src/models/skill";
import { ProjectWithSkills } from "@/src/models/project-with-skills";

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
    skillCount: entity.skill_count
  };
}

export function mapEntityToProjectWithSkills(entity: ProjectWithSkillsEntity): ProjectWithSkills {
  return {
    id: entity.id,
    title: entity.title,
    slug: entity.slug,
    description: entity.description,
    imageUrl: entity.imageUrl,
    githubUrl: entity.githubUrl,
    demoUrl: entity.demoUrl,
    createdAt: entity.createdAt,
    skillCount: entity.skillCount,
    skills: entity.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      yearsOfExperience: skill.years_of_experience,
      proficiency: skill.proficiency,
      createdAt: skill.created_at,
    })),
  };
}
