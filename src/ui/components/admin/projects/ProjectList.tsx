import { fetchProjects } from "@/src/data/postgres/data";
import { DeleteProjectButton, EditProjectButton } from "@/src/ui/components/admin/projects/buttons";

const ProjectList = async () => {
  const projects = await fetchProjects();

  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li key={project.id}>
          <div className="rounded-md bg-gray-900 text-white p-4 shadow-sm border border-gray-700">
            <div className="mb-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-400">
                {project.skillCount} skill{project.skillCount === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <EditProjectButton id={project.id}/>
              <DeleteProjectButton id={project.id}/>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
