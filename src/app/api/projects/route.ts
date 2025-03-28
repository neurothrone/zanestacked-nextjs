import { NextRequest } from "next/server";
import { connectToDatabase } from "@/src/data/mongodb/database";
import InputProjectBody from "@/src/app/api/projects/InputProjectBody";
import Project from "@/src/models/project";
import MongoProjectEntity from "@/src/data/mongodb/entities/mongo-project-entity";
import { mapProjectEntityToProject } from "@/src/data/mongodb/utils/mappers";
import slugify from "slugify";

const GET = async () => {
  const { db } = await connectToDatabase();
  const entities: MongoProjectEntity[] = await db
    .collection<MongoProjectEntity>("projects")
    .find({})
    .toArray();

  const projects: Project[] = entities.map(mapProjectEntityToProject);

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const POST = async (request: NextRequest) => {
  const { db } = await connectToDatabase();
  const body: InputProjectBody = await request.json();

  const createdDate = new Date().toISOString();
  const data = {
    ...body,
    slug: slugify(body.name, { lower: true }),
    createdDate
  };

  try {
    const result = await db
      .collection("projects")
      .insertOne(data);

    if (!result.acknowledged) {
      return new Response("Error creating project", { status: 500 });
    }

    const createdProject = {
      _id: result.insertedId,
      ...data,
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
