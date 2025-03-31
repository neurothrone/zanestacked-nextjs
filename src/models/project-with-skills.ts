import Skill from "@/src/models/skill";
import Project from "@/src/models/project";

type ProjectWithSkills = Project & {
  skills: Skill[];
};

export default ProjectWithSkills;
