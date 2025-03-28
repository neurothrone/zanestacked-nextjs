import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProjectById } from "@/src/data/postgres/data";

export const metadata: Metadata = {
  title: "Edit Project",
};

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;

  const project = await fetchProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <h1>Edit Project</h1>
      <hr/>
      <p>{project.title}</p>
    </main>
  );
}
export default EditProjectPage;
