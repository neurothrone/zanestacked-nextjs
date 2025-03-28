import { fetchProjects } from "@/src/data/postgres/data";
import Link from "next/link";

const ProjectList = async () => {
  const projects = await fetchProjects();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <h3>{project.title}</h3>
          <Link href={`/admin/projects/edit/${project.id}`} className="text-yellow-400 hover:text-yellow-500 me-2">Edit</Link>
          <Link href="/admin/projects/create" className="text-red-400 hover:text-red-500">Delete</Link>
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;
