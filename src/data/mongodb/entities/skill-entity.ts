import { ObjectId } from "bson";

interface SkillEntity {
  _id: ObjectId;
  name: string;
  yearsOfExperience: number;
  proficiency: string;
}

export default SkillEntity;
