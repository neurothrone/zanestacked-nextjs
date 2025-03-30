export type ProjectEntity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  created_at: Date;
};
