import { fetchProjects } from "@/src/data/postgres/data";
import { CodeBracketIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline";

const ProjectsGrid = async () => {
  const projects = await fetchProjects();

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold text-white mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="min-h-[26rem] rounded-lg bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-900 shadow-md border-l-4 border-violet-500 transition-opacity duration-700 opacity-100 overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 bg-gray-900 flex items-center justify-center">
              <span className="text-gray-500">Featured Image</span>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-violet-100 text-md mb-4 line-clamp-2">{project.description}</p>

              {/* Action Links */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-violet-950 text-violet-200 border border-violet-500 hover:bg-violet-900 transition"
                  >
                    <CodeBracketIcon className="h-4 w-4"/>
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-violet-950 text-violet-200 border border-violet-500 hover:bg-violet-900 transition"
                  >
                    <CursorArrowRaysIcon className="h-4 w-4"/>
                    Demo
                  </a>
                )}
              </div>

              {/* Skill Chips (Placeholder) */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-violet-950 text-violet-100 px-2 py-1 rounded-full">Skill A</span>
                <span className="text-xs bg-violet-950 text-violet-100 px-2 py-1 rounded-full">Skill B</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
