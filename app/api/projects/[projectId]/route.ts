import { NextRequest } from "next/server";
import { ObjectId } from "bson";
import { connectToDatabase } from "@/data/mongo-database";
import InputProjectBody from "@/app/api/projects/InputProjectBody";
import ProjectParams from "@/app/api/projects/ProjectParams";

const GET = async (_: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  // Next.js requires awaiting params, TypeScript can't infer this
  const { projectId } = await params;

  const project = await db
    .collection("projects")
    .findOne({ _id: new ObjectId(projectId) });

  if (!project) {
    return new Response("Project not found", { status: 404, });
  }

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

const PUT = async (request: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  const { projectId } = await params;
  const body: InputProjectBody = await request.json();

  const updatedProject = await db
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $set: body },
      { upsert: false, returnDocument: "after" }
    );

  if (!updatedProject) {
    return new Response("Project not found", { status: 404, });
  }

  return new Response(JSON.stringify(updatedProject), {
    status: 202,
    headers: { "Content-Type": "application/json" }
  });
}

const DELETE = async (_: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  const { projectId } = await params;

  const deletedProject = await db
    .collection("projects")
    .deleteOne({ _id: new ObjectId(projectId) });

  if (deletedProject.deletedCount < 1) {
    return new Response("Project not found", { status: 404, });
  }

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" }
  });
}

export { GET, PUT, DELETE };
