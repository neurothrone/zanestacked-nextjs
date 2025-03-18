import { NextRequest } from "next/server";
import { ObjectId } from "bson";
import { connectToDatabase } from "@/data/mongo-database";
import ProjectParams from "@/app/api/projects/ProjectParams";

const GET = async (_: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  const { projectId } = params;

  const projectWithSkills = await db
    .collection("projects")
    .aggregate([
      { $match: { _id: new ObjectId(projectId) } },
      {
        $lookup: {
          from: "skills",
          localField: "skills",
          foreignField: "_id",
          as: "skills"
        }
      },
      {
        $project: {
          skills: { $ifNull: ["$skills", []] }
        }
      }
    ])
    .toArray();

  if (projectWithSkills.length === 0) {
    return new Response("Project not found", { status: 404, });
  }

  const skills = projectWithSkills[0].skills;

  return new Response(JSON.stringify(skills), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

type ProjectSkillBody = {
  skillId: string;
}

const PUT = async (request: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  const { projectId } = await params;
  const body: ProjectSkillBody = await request.json();
  const skillId = body.skillId;

  const updatedProject = await db
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $addToSet: { skills: new ObjectId(skillId) } },
      { returnDocument: "after" }
    );

  if (!updatedProject) {
    return new Response("Project not found", { status: 404, });
  }

  return new Response(JSON.stringify(updatedProject), {
    status: 202,
    headers: { "Content-Type": "application/json" }
  });
}

const DELETE = async (request: NextRequest, { params }: { params: ProjectParams }) => {
  const { db } = await connectToDatabase();
  const { projectId } = params;
  const body: ProjectSkillBody = await request.json();
  const skillId = body.skillId;

  const updatedProject = await db
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      // @ts-expect-error - TypeScript does not recognize the $pull operator correctly
      { $pull: { skills: new ObjectId(skillId) } },
      { returnDocument: "after" }
    );

  if (!updatedProject) {
    return new Response("Project not found", { status: 404, });
  }

  return new Response(JSON.stringify(updatedProject), {
    status: 202,
    headers: { "Content-Type": "application/json" }
  });
}

export { GET, PUT, DELETE };
