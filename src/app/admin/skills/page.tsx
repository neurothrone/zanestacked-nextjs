import { Suspense } from "react";
import { Metadata } from "next";
import Skills from "@/src/ui/components/admin/skills/Skills";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage = async () => {
  return (
    <main>
      <h2>Skills Page</h2>
      <hr/>
      <Link href="/admin/skills/add" className="text-purple-400 hover:text-purple-500">Add Skill</Link>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Skills/>
      </Suspense>
    </main>
  );
}

export default SkillsPage;
