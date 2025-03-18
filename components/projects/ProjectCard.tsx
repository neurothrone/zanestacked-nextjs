import React from "react";
import Image from "next/image";

import Project from "@/models/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div>
      <Image
        src={project.imageUrl}
        alt={project.name}
        width={150}
        height={150}
        sizes={"100vw"}
        quality={100}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ProjectCard;
