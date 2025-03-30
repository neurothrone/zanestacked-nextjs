import Skill from "@/src/models/skill";
import Project from "@/src/models/project";

export type ProjectWithSkills = Project & {
  skills: Skill[];
};
