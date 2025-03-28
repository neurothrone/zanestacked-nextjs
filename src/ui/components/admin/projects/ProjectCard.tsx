import Image from "next/image";

import Project from "@/src/models/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div>
      <Image
        src={project.imageUrl ?? "https://picsum.photos/150"}
        alt={project.title}
        width={150}
        height={150}
        sizes={"100vw"}
        quality={100}
        style={{
          objectFit: "cover",
        }}
      />
      <h3>{project.title}</h3>
    </div>
  );
};

export default ProjectCard;
