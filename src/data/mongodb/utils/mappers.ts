import ProjectEntity from "@/src/data/mongodb/entities/project-entity";
import Project from "@/src/models/project";
import SkillEntity from "@/src/data/mongodb/entities/skill-entity";
import Skill from "@/src/models/skill";

const mapProjectEntityToProject = (entity: ProjectEntity): Project => ({
  id: entity._id.toString(),
  slug: entity.slug,
  title: entity.title,
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
});

export { mapProjectEntityToProject, mapSkillEntityToSkill };
