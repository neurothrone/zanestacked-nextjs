import { NextRequest } from "next/server";
import skills from "@/data/skills";

type Params = {
  id: number;
}

const GET = async (request: NextRequest, { params }: { params: Params }) => {
  const { id } = await params;
  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    return new Response("Skill not found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(skill), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export { GET };
