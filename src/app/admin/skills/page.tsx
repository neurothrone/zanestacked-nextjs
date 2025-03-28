import { Suspense } from "react";
import { Metadata } from "next";
import SkillList from "@/src/ui/components/admin/skills/SkillList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage = async () => {
  return (
    <main>
      <h2>Skills Page</h2>
      <hr/>
      <Link href="/admin/skills/create" className="text-purple-400 hover:text-purple-500">Add Skill</Link>
      <Suspense fallback={<h3>Loading...</h3>}>
        <SkillList/>
      </Suspense>
    </main>
  );
}

export default SkillsPage;
