import { Metadata } from "next";
import { fetchSkills } from "@/src/data/postgres/data";
import CreateProjectForm from "@/src/ui/components/admin/projects/CreateProjectForm";

export const metadata: Metadata = {
  title: "Create Project",
};

const CreateProjectPage = async () => {
  const skills = await fetchSkills();

  return (
    <main>
      <h1>Create Project</h1>
      <hr/>
      <CreateProjectForm skills={skills}/>
    </main>
  );
}
export default CreateProjectPage;
