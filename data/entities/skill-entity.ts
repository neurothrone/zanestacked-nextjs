import { ObjectId } from "bson";

interface SkillEntity {
  _id: ObjectId;
  name: string;
  yearsOfExperience: number;
  proficiency: string;
  createdDate: string;
}

export default SkillEntity;
