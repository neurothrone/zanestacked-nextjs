import { connectToDatabase } from "@/src/data/mongodb/database";
import { NextRequest } from "next/server";
import InputSkillBody from "@/src/app/api/skills/InputSkillBody";
import Skill from "@/src/models/skill";
import MongoSkillEntity from "@/src/data/mongodb/entities/mongo-skill-entity";
import { mapSkillEntityToSkill } from "@/src/data/mongodb/utils/mappers";

const GET = async () => {
  const { db } = await connectToDatabase();
  const entities: MongoSkillEntity[] = await db
    .collection<MongoSkillEntity>("skills")
    .find({})
    .toArray();

  const skills: Skill[] = entities.map(mapSkillEntityToSkill);

  return new Response(JSON.stringify(skills), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const POST = async (request: NextRequest) => {
  const { db } = await connectToDatabase();
  const body: InputSkillBody = await request.json();

  try {
    const createdDate = new Date().toISOString();
    const result = await db
      .collection("skills")
      .insertOne({
        ...body,
        createdDate
      });

    if (!result.acknowledged) {
      return new Response("Error creating skill", { status: 500 });
    }

    const createdSkill = {
      _id: result.insertedId,
      ...body,
      createdDate
    };

    return new Response(JSON.stringify(createdSkill), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error(error);
    return new Response("Error creating skill", { status: 500 });
  }
};

export { GET, POST };
