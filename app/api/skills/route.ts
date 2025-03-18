import skills from "@/data/skills";

const GET = async () => {
  return new Response(JSON.stringify(skills), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
