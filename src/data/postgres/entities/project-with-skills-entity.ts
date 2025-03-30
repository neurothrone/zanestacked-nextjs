import { SkillEntity } from "@/src/data/postgres/entities/skill-entity";
import { ProjectEntity } from "@/src/data/postgres/entities/project-entity";

export type ProjectWithSkillsEntity = ProjectEntity & {
  skills: SkillEntity[]
};
