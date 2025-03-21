import ProjectEntity from "@/data/entities/project-entity";
import Project from "@/models/project";
import SkillEntity from "@/data/entities/skill-entity";
import Skill from "@/models/skill";

const mapProjectEntityToProject = (entity: ProjectEntity): Project => ({
  id: entity._id.toString(),
  slug: entity.slug,
  name: entity.name,
  description: entity.description,
  imageUrl: entity.imageUrl,
  githubUrl: entity.githubUrl,
  demoUrl: entity.demoUrl,
});

const mapSkillEntityToSkill = (entity: SkillEntity): Skill => ({
  id: entity._id.toString(),
  name: entity.name,
  yearsOfExperience: entity.yearsOfExperience,
  proficiency: entity.proficiency,
  createdDate: entity.createdDate,
});

export { mapProjectEntityToProject, mapSkillEntityToSkill };
