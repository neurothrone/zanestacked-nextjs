import seedData from "@/seed/seed-data";

export async function GET() {
  try {
    await seedData();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
