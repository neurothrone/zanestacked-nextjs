import { NextRequest } from "next/server";
import { connectToDatabase } from "@/data/mongo-database";
import InputProjectBody from "@/app/api/projects/InputProjectBody";

const GET = async () => {
  const { db } = await connectToDatabase();
  const projects = await db
    .collection("projects")
    .find({})
    .toArray();

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const POST = async (request: NextRequest) => {
  const { db } = await connectToDatabase();
  const body: InputProjectBody = await request.json();

  try {
    const createdDate = new Date().toISOString();
    const result = await db
      .collection("projects")
      .insertOne({
        ...body,
        createdDate
      });

    if (!result.acknowledged) {
      return new Response("Error creating project", { status: 500 });
    }

    const createdProject = {
      _id: result.insertedId,
      ...body,
      createdDate
    };

    return new Response(JSON.stringify(createdProject), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response("Error creating project", { status: 500 });
  }
}

export { GET, POST };
