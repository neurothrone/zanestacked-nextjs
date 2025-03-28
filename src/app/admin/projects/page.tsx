import { Suspense } from "react";
import { Metadata, NextPage } from "next";
import Projects from "@/src/ui/components/admin/projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage: NextPage = () => {
  return (
    <main>
      <h2>Projects Page</h2>
      <hr/>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Projects/>
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
