"use client";

import { useEffect, useState } from "react";
import Project from "@/models/project";
import ProjectCard from "@/components/projects/ProjectCard";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
        setLoading(false);
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
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project}/>
      ))}
    </>
  );
};

export default ProjectList;
