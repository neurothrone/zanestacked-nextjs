export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: Date;
  skillIds: string[];
};
