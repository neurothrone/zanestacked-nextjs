import { Suspense } from "react";
import { Metadata } from "next";
import Projects from "@/src/ui/components/admin/projects/Projects";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage = () => {
  return (
    <main>
      <h2>Projects Page</h2>
      <hr/>
      <Link href="/admin/projects/add" className="text-purple-400 hover:text-purple-500">Add Project</Link>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Projects/>
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
