import Project from "@/src/models/project";
import { PostgresSkillEntity } from "@/src/data/postgres/entities/postgres-skill-entity";

export type PostgresProjectEntity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  created_at: Date;
  skill_count: number;
};

export type ProjectWithSkillsEntity = Project & {
  skills: PostgresSkillEntity[]
};
