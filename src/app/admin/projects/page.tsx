import { Suspense } from "react";
import { Metadata } from "next";
import { CreateProjectButton } from "@/src/ui/components/admin/projects/buttons";
import ProjectList from "@/src/ui/components/admin/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage = () => {
  return (
    <main>
      <h2>Projects Page</h2>
      <hr/>
      <CreateProjectButton/>
      <Suspense fallback={<h3>Loading...</h3>}>
        <ProjectList/>
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
