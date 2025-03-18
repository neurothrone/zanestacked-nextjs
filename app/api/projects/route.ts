import projects from "@/data/projects";

const GET = async () => {
  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
