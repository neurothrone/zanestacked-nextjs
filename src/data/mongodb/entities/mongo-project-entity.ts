import { ObjectId } from "bson";

interface MongoProjectEntity {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
}

export default MongoProjectEntity;
