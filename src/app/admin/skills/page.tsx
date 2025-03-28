import { Suspense } from "react";
import { Metadata, NextPage } from "next";
import Skills from "@/src/ui/components/admin/skills/Skills";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage: NextPage = async () => {
  return (
    <main>
      <h2>Skills Page</h2>
      <hr/>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Skills/>
      </Suspense>
    </main>
  );
}

export default SkillsPage;
