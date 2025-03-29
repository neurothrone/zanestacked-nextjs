type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: Date;
  skillCount: number;
};

export default Project;
