import { fetchProjects } from "@/src/data/postgres/data";
import { DeleteProjectButton, EditProjectButton } from "@/src/ui/components/admin/projects/buttons";

const ProjectList = async () => {
  const projects = await fetchProjects();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <h3>{project.title}</h3>
          <div className="flex justify-end gap-2">
            <EditProjectButton id={project.id}/>
            <DeleteProjectButton id={project.id}/>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
