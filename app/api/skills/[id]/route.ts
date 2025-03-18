import { NextRequest } from "next/server";
import { ObjectId } from "bson";
import { connectToDatabase } from "@/data/mongo-database";
import InputSkillBody from "@/app/api/skills/InputSkillBody";

type Params = {
  id: string;
}

const GET = async (_: NextRequest, { params }: { params: Params }) => {
  const { id } = await params;
  const { db } = await connectToDatabase();

  const skill = await db
    .collection("skills")
    .findOne({ _id: new ObjectId(id) });

  if (!skill) {
    return new Response("Skill not found", { status: 404, });
  }

  return new Response(JSON.stringify(skill), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

const PUT = async (request: NextRequest, { params }: { params: Params }) => {
  const { db } = await connectToDatabase();
  const { id } = await params;
  const body: InputSkillBody = await request.json();

  const updatedSkill = await db
    .collection("skills")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { upsert: false, returnDocument: "after" }
    );

  if (!updatedSkill) {
    return new Response("Skill not found", { status: 404, });
  }

  return new Response(JSON.stringify(updatedSkill), {
    status: 202,
    headers: { "Content-Type": "application/json" }
  });
}

const DELETE = async (_: NextRequest, { params }: { params: Params }) => {
  const { db } = await connectToDatabase();
  const { id } = await params;

  const deletedSkill = await db
    .collection("skills")
    .deleteOne({ _id: new ObjectId(id) });

  if (deletedSkill.deletedCount < 1) {
    return new Response("Skill not found", { status: 404, });
  }

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" }
  });
}

export { GET, PUT, DELETE };
