import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchSkillById } from "@/src/data/postgres/data";
import EditSkillForm from "@/src/ui/components/admin/skills/EditSkillForm";

export const metadata: Metadata = {
  title: "Edit Skill",
};

const EditSkillPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;

  const skill = await fetchSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <main>
      <h1>Edit Skill</h1>
      <hr/>
      <p>{skill.name}</p>
      <EditSkillForm skill={skill}/>
    </main>
  );
}
export default EditSkillPage;
