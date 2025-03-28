import { Suspense } from "react";
import { Metadata } from "next";
import ProjectList from "@/src/ui/components/admin/projects/ProjectList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage = () => {
  return (
    <main>
      <h2>Projects Page</h2>
      <hr/>
      <Link href="/admin/projects/create" className="text-purple-400 hover:text-purple-500">Add Project</Link>
      <Suspense fallback={<h3>Loading...</h3>}>
        <ProjectList/>
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
