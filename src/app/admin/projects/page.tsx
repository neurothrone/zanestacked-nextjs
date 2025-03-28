import { Metadata, NextPage } from "next";
import ProjectList from "@/src/ui/components/admin/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage: NextPage = () => {
  return (
    <main>
      <h2>Projects Page</h2>
      <hr/>
      <ProjectList/>
    </main>
  );
}

export default ProjectsPage;
