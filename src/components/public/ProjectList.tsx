"use client";

import { useEffect, useState } from "react";
import Project from "@/src/models/project";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div>
        No projects found.
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-900">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Projects</h2>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {projects.map(project => (
          <div
            key={project.id}
            className="p-6 bg-gray-800 text-white rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
            <p className="mb-4 text-gray-300">{project.description}</p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectList;
