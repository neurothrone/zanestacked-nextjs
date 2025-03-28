import { Suspense } from "react";
import { Metadata } from "next";
import { CreateSkillButton } from "@/src/ui/components/admin/skills/buttons";
import SkillList from "@/src/ui/components/admin/skills/SkillList";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage = async () => {
  return (
    <main>
      <h2>Skills Page</h2>
      <hr/>
      <CreateSkillButton/>
      <Suspense fallback={<h3>Loading...</h3>}>
        <SkillList/>
      </Suspense>
    </main>
  );
}

export default SkillsPage;
