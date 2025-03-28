export type PostgresProjectEntity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  created_at: Date;
};
