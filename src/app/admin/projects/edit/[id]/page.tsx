import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProjectById, fetchSkills, fetchSkillsForProject } from "@/src/data/postgres/data";
import EditProjectForm from "@/src/ui/components/admin/projects/EditProjectForm";

export const metadata: Metadata = {
  title: "Edit Project",
};

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const [project, currentSkills, allSkills] = await Promise.all([
    fetchProjectById(id),
    fetchSkillsForProject(id),
    fetchSkills(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <h1>Edit Project</h1>
      <hr/>
      <EditProjectForm
        project={project}
        currentSkills={currentSkills}
        allSkills={allSkills}
      />
    </main>
  );
}
export default EditProjectPage;
