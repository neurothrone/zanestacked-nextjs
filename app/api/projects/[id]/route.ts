import { NextRequest } from "next/server";
import projects from "@/data/projects";

type Params = {
  id: number;
}

const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = await params;
  const project = projects.find((s) => s.id === id);

  if (!project) {
    return new Response("Project not found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { GET };
