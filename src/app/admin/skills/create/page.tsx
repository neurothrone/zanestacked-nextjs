import { Metadata } from "next";
import CreateSkillForm from "@/src/ui/components/admin/skills/CreateSkillForm";

export const metadata: Metadata = {
  title: "Create Skill",
};

const CreateSkillPage = async () => {
  return (
    <main>
      <h1>Create Skill</h1>
      <hr/>
      <CreateSkillForm/>
    </main>
  );
}
export default CreateSkillPage;
