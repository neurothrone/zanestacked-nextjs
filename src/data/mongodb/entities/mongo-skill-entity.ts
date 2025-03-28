import { ObjectId } from "bson";

interface MongoSkillEntity {
  _id: ObjectId;
  name: string;
  yearsOfExperience: number;
  proficiency: string;
}

export default MongoSkillEntity;
