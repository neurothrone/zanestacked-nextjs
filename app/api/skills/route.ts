import { connectToDatabase } from "@/data/mongo-database";
import { NextRequest } from "next/server";
import InputSkillBody from "@/app/api/skills/InputSkillBody";
import Skill from "@/models/skill";
import SkillEntity from "@/data/entities/skill-entity";
import { mapSkillEntityToSkill } from "@/data/utils/mappers";

const GET = async () => {
  const { db } = await connectToDatabase();
  const entities: SkillEntity[] = await db
    .collection<SkillEntity>("skills")
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
