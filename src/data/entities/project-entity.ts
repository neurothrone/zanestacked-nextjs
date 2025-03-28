import { ObjectId } from "bson";

interface ProjectEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
}

export default ProjectEntity;
