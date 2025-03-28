import { Metadata, NextPage } from "next";
import SkillList from "@/src/components/skills/SkillList";

export const metadata: Metadata = {
  title: "Skills - ZaneStacked",
  description: "Skills page for ZaneStacked",
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
