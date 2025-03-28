import MongoProjectEntity from "@/src/data/mongodb/entities/mongo-project-entity";
import Project from "@/src/models/project";
import MongoSkillEntity from "@/src/data/mongodb/entities/mongo-skill-entity";
import Skill from "@/src/models/skill";

const mapProjectEntityToProject = (entity: MongoProjectEntity): Project => ({
  id: entity._id.toString(),
  slug: entity.slug,
  name: entity.name,
  description: entity.description,
  imageUrl: entity.imageUrl,
  githubUrl: entity.githubUrl,
  demoUrl: entity.demoUrl,
});

const mapSkillEntityToSkill = (entity: MongoSkillEntity): Skill => ({
  id: entity._id.toString(),
  name: entity.name,
  yearsOfExperience: entity.yearsOfExperience,
  proficiency: entity.proficiency,
  createdDate: entity.createdDate,
});

export { mapProjectEntityToProject, mapSkillEntityToSkill };
