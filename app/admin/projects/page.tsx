import { Metadata, NextPage } from "next";
import ProjectList from "@/components/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects - ZaneStacked",
  description: "Projects page for ZaneStacked",
};

const ProjectsPage: NextPage = () => {
  return (
    <main>
      <h2>Admin Projects Page</h2>
      <hr/>
      <ProjectList/>
    </main>
  );
}

export default ProjectsPage;
