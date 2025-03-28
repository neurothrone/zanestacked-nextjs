import { fetchProjects } from "@/src/data/postgres/data";

const Projects = async () => {
  const projects = await fetchProjects();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <h3>{project.title}</h3>
        </li>
      ))}
    </ul>
  );
}

export default Projects;
