import { Metadata, NextPage } from "next";
import SkillList from "@/src/components/admin/skills/SkillList";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage: NextPage = () => {
  return (
    <main>
      <h2>Skills Page</h2>
      <hr/>
      <SkillList/>
    </main>
  );
}

export default SkillsPage;
